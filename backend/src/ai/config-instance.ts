import fs from 'node:fs';
import { AIConfig } from './config.js';
import { paths } from '../utils/paths.js';
import { migrateJsonProvidersToDb, loadAIConfigFromDb } from './db-sync.js';
import { loadAllProviders } from '../db/database.js';

export let aiConfig = new AIConfig(paths.dataDir);

export function resetAIConfig(dataDir?: string): void {
  aiConfig = new AIConfig(dataDir ?? paths.dataDir);
}

/**
 * 初始化 AI 配置。
 * - 若 DB providers 为空且 ai_config.json 存在：一次性迁移 JSON→DB，验证后删除 JSON
 * - 之后始终从 DB 加载配置
 */
export function initAIConfig(): void {
  try {
    const dbProviders = loadAllProviders();

    if (dbProviders.length === 0 && fs.existsSync(aiConfig.configFile)) {
      console.log('[initAIConfig] 检测到 ai_config.json，开始一次性迁移...');

      // 1. 迁移 providers
      migrateJsonProvidersToDb(aiConfig);

      // 2. 验证迁移完整性
      const after = loadAllProviders();
      const jsonProviderCount = Object.keys(aiConfig.config.providers).length;
      if (after.length < jsonProviderCount) {
        console.error(
          `[initAIConfig] 迁移不完整：JSON 有 ${jsonProviderCount} 个 provider，DB 只入了 ${after.length} 个，保留 JSON 文件`
        );
        // 不删除 JSON，让用户下次启动重试
      } else {
        // 3. 写入非 provider 配置到 DB
        aiConfig.saveConfig();

        // 4. 二次验证：读回确认落盘
        const verifyCurrentProvider = aiConfig.config.current_provider;
        if (verifyCurrentProvider) {
          // 5. 验证通过，删除 JSON
          fs.unlinkSync(aiConfig.configFile);
          console.log('[initAIConfig] 迁移完成，ai_config.json 已删除');
        } else {
          console.error('[initAIConfig] 二次验证失败，保留 JSON 文件');
        }
      }
    }

    // 从 DB 加载最新配置到内存
    loadAIConfigFromDb(aiConfig);
  } catch (e) {
    console.warn('初始化 AI 配置失败:', e instanceof Error ? e.message : String(e));
  }
}
