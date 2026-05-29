import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { create } from 'tar';
import { CliManager } from '../../src/cli/cli-manager.js';
import { executeMcpTool, getMcpToolsCatalog } from '../../src/mcp/tools.js';

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'papyrus-cli-manager-'));
}

function makeJsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    status: init?.status ?? 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function makeFileFetch(tarballPath: string): typeof fetch {
  return async (input: string | URL | Request) => {
    const url = String(input);
    if (url.includes('/%40papyrus/cli/latest')) {
      return makeJsonResponse({
        version: '0.1.0',
        dist: { tarball: 'https://registry.npmjs.org/@papyrus/cli/-/cli-0.1.0.tgz' },
        bin: { papyrus: 'bin/papyrus.js' },
      });
    }
    if (url.endsWith('cli-0.1.0.tgz')) {
      return new Response(fs.readFileSync(tarballPath), { status: 200 });
    }
    return new Response('not found', { status: 404 });
  };
}

async function createCliTarball(workDir: string, scriptBody: string): Promise<string> {
  const packageDir = path.join(workDir, 'package');
  const binDir = path.join(packageDir, 'bin');
  fs.mkdirSync(binDir, { recursive: true });
  fs.writeFileSync(
    path.join(packageDir, 'package.json'),
    JSON.stringify({ name: '@papyrus/cli', version: '0.1.0', bin: { papyrus: 'bin/papyrus.js' } }),
    'utf8',
  );
  fs.writeFileSync(path.join(binDir, 'papyrus.js'), scriptBody, 'utf8');
  const tarballPath = path.join(workDir, 'cli-0.1.0.tgz');
  await create({ file: tarballPath, cwd: workDir, gzip: true }, ['package']);
  return tarballPath;
}

describe('CliManager', () => {
  it('installs a real npm-style tgz, writes manifest, and runs the managed CLI with Desktop env', async () => {
    const tempDir = makeTempDir();
    const script = `#!/usr/bin/env node\nconsole.log(JSON.stringify({ args: process.argv.slice(2), api: process.env.PAPYRUS_API_URL, mcp: process.env.PAPYRUS_MCP_URL, token: process.env.PAPYRUS_AUTH_TOKEN }));\n`;
    const tarballPath = await createCliTarball(tempDir, script);
    const cliRoot = path.join(tempDir, 'managed-cli');
    const manager = new CliManager({ rootDir: cliRoot, fetchImpl: makeFileFetch(tarballPath) });

    const beforeInstall = await manager.getStatus();
    expect(beforeInstall.installed).toBe(false);
    expect(beforeInstall.latestVersion).toBe('0.1.0');

    const installResult = await manager.install();
    expect(installResult.success).toBe(true);
    expect(installResult.version).toBe('0.1.0');
    expect(fs.existsSync(installResult.path)).toBe(true);

    const manifest = manager.readManifest();
    expect(manifest?.currentVersion).toBe('0.1.0');
    expect(manifest?.executablePath).toBe(installResult.path);

    const status = await manager.getStatus();
    expect(status.installed).toBe(true);
    expect(status.path).toBe(installResult.path);

    const runResult = await manager.run(['status', '--json'], {
      PAPYRUS_API_URL: 'http://127.0.0.1:18000',
      PAPYRUS_MCP_URL: 'http://127.0.0.1:19200',
      PAPYRUS_AUTH_TOKEN: 'test-token',
    });
    expect(runResult.success).toBe(true);
    const parsedStdout = JSON.parse(runResult.stdout) as { args: string[]; api: string; mcp: string; token: string };
    expect(parsedStdout.args).toEqual(['status', '--json']);
    expect(parsedStdout.api).toBe('http://127.0.0.1:18000');
    expect(parsedStdout.mcp).toBe('http://127.0.0.1:19200');
    expect(parsedStdout.token).toBe('test-token');
  });

  it('rejects run before install', async () => {
    const manager = new CliManager({
      rootDir: makeTempDir(),
      fetchImpl: async () => makeJsonResponse({ version: '0.1.0', dist: { tarball: 'unused' } }),
    });

    await expect(manager.run(['status', '--json'])).rejects.toThrow('CLI 未安装');
  });

  it('exposes CLI tools through MCP catalog and executes cli_status', async () => {
    const manager = new CliManager({
      rootDir: makeTempDir(),
      fetchImpl: async () => makeJsonResponse({ version: '0.2.0', dist: { tarball: 'unused' } }),
    });

    const catalog = getMcpToolsCatalog();
    expect(catalog.categories.cli).toEqual(['cli_status', 'cli_install', 'cli_run']);

    const status = await executeMcpTool('cli_status', {}, undefined, manager);
    expect(status.success).toBe(true);
    expect(status.installed).toBe(false);
    expect(status.latestVersion).toBe('0.2.0');
  });
});

