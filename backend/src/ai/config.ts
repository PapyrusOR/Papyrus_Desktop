import path from 'node:path';
import { paths } from '../utils/paths.js';
import { readUiSetting, writeUiSetting } from '../db/database.js';
import { getProviderConfigFromDB } from './db-sync.js';

export interface ProviderConfig {
  api_key: string;
  base_url: string;
  models: string[];
}

export interface ParametersConfig {
  temperature: number;
  top_p: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
}

export interface FeaturesConfig {
  auto_hint: boolean;
  auto_explain: boolean;
  context_length: number;
  agent_enabled: boolean;
  cache_enabled: boolean;
}

export interface LogConfig {
  log_dir: string;
  log_level: string;
  max_log_files: number;
  log_rotation: boolean;
}

export interface AIConfigData {
  providers: Record<string, ProviderConfig>;
  current_provider: string;
  current_model: string;
  parameters: ParametersConfig;
  features: FeaturesConfig;
  log: LogConfig;
}

function toStr(value: unknown, defaultValue = ''): string {
  if (value === null || value === undefined) return defaultValue;
  return String(value);
}

function toInt(value: unknown, defaultValue: number): number {
  if (typeof value === 'number' && Number.isInteger(value)) return value;
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return defaultValue;
}

/**
 * 检测 URL 是否指向私有/内网地址。
 * 保留用于外部调用（provider.ts、ai-completion.ts、ai-config.ts）。
 */
export function isPrivateUrl(urlStr: string): boolean {
  if (!urlStr) return false;
  try {
    const parsed = new URL(urlStr);
    const hostname = parsed.hostname.toLowerCase();

    if (['localhost', '127.0.0.1', '0.0.0.0', '::1', '[::1]', '[::ffff:127.0.0.1]'].includes(hostname)) {
      return true;
    }
    if (/^127(\.\d+){1,3}$/.test(hostname)) {
      return true;
    }
    if (/^\d+$/.test(hostname)) {
      return true;
    }
    if (/^0x[0-9a-f]+$/i.test(hostname)) {
      return true;
    }
    const ipv4Segments = hostname.split('.');
    if (ipv4Segments.length >= 2 && ipv4Segments.length <= 4) {
      const hasNonDecimalSeg = ipv4Segments.some((seg) => /^0x[0-9a-f]+$/i.test(seg) || /^0\d+$/.test(seg));
    if (hasNonDecimalSeg) return true;
    }
    // Reject private IPv4 ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x, 169.254.x.x, 0.x.x.x
    if (/^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|169\.254\.|0\.)/.test(hostname)) {
      return true;
    }
    if (/^\[?::1\]?$/.test(hostname) || /^\[?fe80:/i.test(hostname)) {
      return true;
    }
  } catch {
    // ignore invalid URLs
  }
  return false;
}

export class AIConfig {
  configFile: string;
  config: AIConfigData;

  constructor(dataDir: string = paths.dataDir) {
    this.configFile = path.join(dataDir, 'ai_config.json');
    this.config = this.buildDefaultConfig();
    this.loadConfig();
  }

  private buildDefaultConfig(): AIConfigData {
    const defaultLogDir = path.join(paths.dataDir, 'logs');
    return {
      providers: {},
      current_provider: '',
      current_model: '',
      parameters: {
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 2000,
        presence_penalty: 0.0,
        frequency_penalty: 0.0,
      },
      features: {
        auto_hint: false,
        auto_explain: false,
        context_length: 10,
        agent_enabled: false,
        cache_enabled: false,
      },
      log: {
        log_dir: defaultLogDir,
        log_level: 'DEBUG',
        max_log_files: 10,
        log_rotation: false,
      },
    };
  }

  private normalizeLogConfig(raw: unknown, fallback: LogConfig): LogConfig {
    if (raw === null || typeof raw !== 'object') return { ...fallback };
    const dict = raw as Record<string, unknown>;
    return {
      log_dir: dict.log_dir !== undefined ? toStr(dict.log_dir, fallback.log_dir) : fallback.log_dir,
      log_level: dict.log_level !== undefined ? toStr(dict.log_level, fallback.log_level) : fallback.log_level,
      max_log_files: toInt(dict.max_log_files ?? fallback.max_log_files, fallback.max_log_files),
      log_rotation: Boolean(dict.log_rotation ?? fallback.log_rotation),
    };
  }

  loadConfig(): void {
    const defaultConfig = this.buildDefaultConfig();

    try {
      const dbCurrentProvider = readUiSetting('ai.current_provider');
      const dbCurrentModel = readUiSetting('ai.current_model');
      const dbParameters = readUiSetting('ai.parameters');
      const dbFeatures = readUiSetting('ai.features');
      const dbLog = readUiSetting('ai.log');

      if (!dbCurrentProvider && !dbCurrentModel && !dbParameters && !dbFeatures && !dbLog) {
        this.config = defaultConfig;
        return;
      }

      this.config = {
        providers: {},
        current_provider: dbCurrentProvider ?? defaultConfig.current_provider,
        current_model: dbCurrentModel ?? defaultConfig.current_model,
        parameters: dbParameters
          ? { ...defaultConfig.parameters, ...JSON.parse(dbParameters) }
          : defaultConfig.parameters,
        features: dbFeatures
          ? { ...defaultConfig.features, ...JSON.parse(dbFeatures) }
          : defaultConfig.features,
        log: dbLog
          ? this.normalizeLogConfig(JSON.parse(dbLog), defaultConfig.log)
          : defaultConfig.log,
      };
    } catch (e) {
      console.error('从数据库加载 AI 配置失败，使用默认配置:', e instanceof Error ? e.message : String(e));
      this.config = defaultConfig;
    }
  }

  saveConfig(): void {
    try {
      writeUiSetting('ai.current_provider', this.config.current_provider);
      writeUiSetting('ai.current_model', this.config.current_model);
      writeUiSetting('ai.parameters', JSON.stringify(this.config.parameters));
      writeUiSetting('ai.features', JSON.stringify(this.config.features));
      writeUiSetting('ai.log', JSON.stringify(this.config.log));
    } catch (e) {
      console.error('保存 AI 配置到数据库失败:', e instanceof Error ? e.message : String(e));
    }
  }

  getMaskedConfig(): AIConfigData {
    const cfg: AIConfigData = JSON.parse(JSON.stringify(this.config));
    cfg.providers = {};
    return cfg;
  }

  getProviderConfig(): ProviderConfig {
    const providerName = this.config.current_provider;
    const dbConfig = getProviderConfigFromDB(providerName);
    if (!dbConfig) {
      throw new Error(`未知 provider: ${providerName}`);
    }
    return dbConfig;
  }

  getCurrentModel(): string {
    return this.config.current_model;
  }

  getParameters(): ParametersConfig {
    return this.config.parameters;
  }

  getLogConfig(): LogConfig {
    return this.config.log;
  }

  setLogConfig(config: LogConfig): void {
    this.config.log = this.normalizeLogConfig(config, this.buildDefaultConfig().log);
    this.saveConfig();
  }
}
