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

  it('syncDBToAIConfig ignores disabled providers when checking current provider validity', () => {
    const cfg = new AIConfig(tempDir);
    saveProvider({ id: 'p-disabled', type: 'openai', name: 'OpenAI Disabled', baseUrl: 'https://api.openai.com', enabled: false, isDefault: false, models: [] });
    saveProvider({ id: 'p-default', type: 'deepseek', name: 'DeepSeek', baseUrl: 'https://api.deepseek.com', enabled: true, isDefault: true, models: [] });
    saveModel('p-default', { id: 'm-default', modelId: 'deepseek-chat', name: 'DeepSeek Chat', enabled: true });

    cfg.config.current_provider = 'openai';
    cfg.config.current_model = 'stale-model';
    syncDBToAIConfig(cfg, false);

    expect(cfg.config.current_provider).toBe('deepseek');
    expect(cfg.config.current_model).toBe('deepseek-chat');
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

  it('syncAIConfigToDB preserves existing API key when config contains a masked key', () => {
    const cfg = new AIConfig(tempDir);
    saveProvider({ id: 'p-mask', type: 'openai', name: 'OpenAI', baseUrl: 'https://old.example.com', enabled: true, isDefault: false, models: [] });
    saveApiKey('p-mask', { id: 'k-mask', name: 'default', key: 'sk-real-secret' });
    cfg.config.current_provider = 'openai';
    cfg.config.providers = {
      openai: {
        api_key: '********cret',
        base_url: 'https://api.openai.com/v1',
        models: ['gpt-4o'],
      },
    };

    syncAIConfigToDB(cfg);

    expect(getProviderApiKeyFromDB('openai')).toBe('sk-real-secret');
    const synced = getProviderConfigFromDB('openai');
    expect(synced?.base_url).toBe('https://api.openai.com/v1');
    expect(synced?.models).toContain('gpt-4o');
  });

  it('syncAIConfigToDB keeps syncing other providers when one provider fails', () => {
    const cfg = new AIConfig(tempDir);
    saveProvider({ id: 'p-existing-ok', type: 'deepseek', name: 'DeepSeek', baseUrl: 'https://old.deepseek.com', enabled: true, isDefault: false, models: [] });
    cfg.config.current_provider = 'deepseek';
    cfg.config.providers = {
      broken: {
        api_key: 'sk-broken',
        base_url: 'https://broken.example.com',
        models: ['bad/model'],
      },
      deepseek: {
        api_key: 'sk-deepseek',
        base_url: 'https://api.deepseek.com',
        models: ['deepseek-chat'],
      },
    };

    expect(() => syncAIConfigToDB(cfg)).not.toThrow();

    const synced = getProviderConfigFromDB('deepseek');
    expect(synced?.base_url).toBe('https://api.deepseek.com');
    expect(synced?.api_key).toBe('sk-deepseek');
    expect(synced?.models).toContain('deepseek-chat');
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
