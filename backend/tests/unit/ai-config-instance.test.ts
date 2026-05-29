import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { describe, expect, it, beforeEach, afterEach } from '@jest/globals';

describe('ai-config-instance', () => {
  let tempDir: string;
  const originalEnv = process.env.PAPYRUS_DATA_DIR;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'papyrus-ai-ci-test-'));
    process.env.PAPYRUS_DATA_DIR = tempDir;
  });

  afterEach(() => {
    if (originalEnv !== undefined) process.env.PAPYRUS_DATA_DIR = originalEnv;
    else delete process.env.PAPYRUS_DATA_DIR;
    try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch { /* ignore */ }
  });

  it('resetAIConfig runs without throwing', async () => {
    const { resetAIConfig } = await import('../../src/ai/config-instance.js');
    expect(() => resetAIConfig(tempDir)).not.toThrow();
  });

  it('initAIConfig runs without throwing', async () => {
    const { initAIConfig } = await import('../../src/ai/config-instance.js');
    expect(() => initAIConfig()).not.toThrow();
  });
});
