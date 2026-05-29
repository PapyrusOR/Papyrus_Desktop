import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { describe, expect, it, beforeEach, afterEach } from '@jest/globals';
import { AIConfig } from '../../src/ai/config.js';

describe('ai-db-sync', () => {
  let tempDir: string;
  const originalEnv = process.env.PAPYRUS_DATA_DIR;
  let syncDBToAIConfig: typeof import('../../src/ai/db-sync.js').syncDBToAIConfig;
  let syncAIConfigToDB: typeof import('../../src/ai/db-sync.js').syncAIConfigToDB;
  let getProviderConfigFromDB: typeof import('../../src/ai/db-sync.js').getProviderConfigFromDB;
  let getProviderApiKeyFromDB: typeof import('../../src/ai/db-sync.js').getProviderApiKeyFromDB;
  let closeDb: typeof import('../../src/db/database.js').closeDb;
  let getDb: typeof import('../../src/db/database.js').getDb;
  let saveProvider: typeof import('../../src/db/database.js').saveProvider;
  let saveApiKey: typeof import('../../src/db/database.js').saveApiKey;
  let saveModel: typeof import('../../src/db/database.js').saveModel;

  beforeEach(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'papyrus-ai-db-sync-test-'));
    process.env.PAPYRUS_DATA_DIR = tempDir;
    const mod = await import('../../src/ai/db-sync.js');
    syncDBToAIConfig = mod.syncDBToAIConfig;
    syncAIConfigToDB = mod.syncAIConfigToDB;
    getProviderConfigFromDB = mod.getProviderConfigFromDB;
    getProviderApiKeyFromDB = mod.getProviderApiKeyFromDB;
    const dbMod = await import('../../src/db/database.js');
    closeDb = dbMod.closeDb;
    getDb = dbMod.getDb;
    saveProvider = dbMod.saveProvider;
    saveApiKey = dbMod.saveApiKey;
    saveModel = dbMod.saveModel;
    getDb();
  });

  afterEach(() => {
    closeDb();
    if (originalEnv !== undefined) process.env.PAPYRUS_DATA_DIR = originalEnv;
    else delete process.env.PAPYRUS_DATA_DIR;
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch { /* ignore */ }
  });

  it('syncDBToAIConfig does nothing when DB has no providers', () => {
    const cfg = new AIConfig(tempDir);
    cfg.config.current_provider = 'custom';
    syncDBToAIConfig(cfg);
    expect(cfg.config.current_provider).toBe('liyuan-deepseek');
  });

  it('syncDBToAIConfig leaves current_provider unchanged when valid and force=false', () => {
    const cfg = new AIConfig(tempDir);
    saveProvider({ id: 'p1', type: 'openai', name: 'OpenAI', baseUrl: 'https://api.openai.com', enabled: true, isDefault: false, models: [] });
    saveApiKey('p1', { id: 'k1', name: 'default', key: 'sk-test' });
    saveModel('p1', { id: 'm1', modelId: 'gpt-4', name: 'GPT-4', enabled: true });

    cfg.config.current_provider = 'openai';
    syncDBToAIConfig(cfg, false);
    expect(cfg.config.current_provider).toBe('openai');
  });

  it('syncDBToAIConfig falls back to default provider when current is invalid', () => {
    const cfg = new AIConfig(tempDir);
    saveProvider({ id: 'p2', type: 'deepseek', name: 'DeepSeek', baseUrl: 'https://api.deepseek.com', enabled: true, isDefault: true, models: [] });
    saveApiKey('p2', { id: 'k2', name: 'default', key: 'sk-test' });
    saveModel('p2', { id: 'm2', modelId: 'deepseek-chat', name: 'DS', enabled: true });

    cfg.config.current_provider = 'nonexistent';
    syncDBToAIConfig(cfg);
    expect(cfg.config.current_provider).toBe('deepseek');
  });

  it('syncDBToAIConfig forces sync when forceSyncDefault=true', () => {
    const cfg = new AIConfig(tempDir);
    saveProvider({ id: 'p3', type: 'anthropic', name: 'Anthropic', baseUrl: 'https://api.anthropic.com', enabled: true, isDefault: true, models: [] });
    saveApiKey('p3', { id: 'k3', name: 'default', key: 'sk-test' });
    saveModel('p3', { id: 'm3', modelId: 'claude-3', name: 'Claude', enabled: true });

    cfg.config.current_provider = 'openai'; // currently invalid in DB
    syncDBToAIConfig(cfg, true);
    expect(cfg.config.current_provider).toBe('anthropic');
  });

  it('syncAIConfigToDB does not throw with empty providers', () => {
    const cfg = new AIConfig(tempDir);
    cfg.config.providers = {};
    expect(() => syncAIConfigToDB(cfg)).not.toThrow();
  });

  it('getProviderConfigFromDB returns null for non-existent provider', () => {
    const result = getProviderConfigFromDB('nonexistent');
    expect(result).toBeNull();
  });

  it('getProviderConfigFromDB returns config with empty api_key when no keys', () => {
    saveProvider({ id: 'p4', type: 'ollama', name: 'Ollama', baseUrl: 'http://localhost:11434', enabled: true, isDefault: false, models: [] });
    const result = getProviderConfigFromDB('ollama');
    expect(result).not.toBeNull();
    expect(result!.api_key).toBe('');
    expect(result!.base_url).toBe('http://localhost:11434');
  });

  it('getProviderApiKeyFromDB returns null for non-existent provider', () => {
    expect(getProviderApiKeyFromDB('nonexistent')).toBeNull();
  });

  it('getProviderApiKeyFromDB returns first non-empty key', () => {
    saveProvider({ id: 'p5', type: 'openai', name: 'OpenAI', baseUrl: 'https://api.openai.com', enabled: true, isDefault: false, models: [] });
    saveApiKey('p5', { id: 'k5', name: 'default', key: 'sk-real' });
    expect(getProviderApiKeyFromDB('openai')).toBe('sk-real');
  });

  it('getProviderApiKeyFromDB returns null when all keys are empty', () => {
    saveProvider({ id: 'p6', type: 'openai', name: 'OpenAI', baseUrl: 'https://api.openai.com', enabled: true, isDefault: false, models: [] });
    saveApiKey('p6', { id: 'k6', name: 'default', key: '   ' });
    expect(getProviderApiKeyFromDB('openai')).toBeNull();
  });
});
