import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { extract } from 'tar';

export interface CliManagerManifest {
  currentVersion: string;
  executablePath: string;
  packageName: string;
  installedAt: string;
}

export interface CliStatus {
  success: true;
  installed: boolean;
  version: string | null;
  path: string | null;
  latestVersion: string | null;
  updateAvailable: boolean;
  packageName: string;
}

export interface CliInstallResult {
  success: true;
  version: string;
  path: string;
  packageName: string;
}

export interface CliRunResult {
  success: boolean;
  exitCode: number | null;
  stdout: string;
  stderr: string;
}

interface NpmPackageMetadata {
  version: string;
  dist: {
    tarball: string;
  };
  bin?: string | Record<string, string>;
}

interface CliManagerOptions {
  rootDir?: string;
  packageName?: string;
  fetchImpl?: typeof fetch;
}

const DEFAULT_PACKAGE = '@papyrus/cli';
const MANIFEST_FILE = 'manifest.json';
const REGISTRY_BASE = 'https://registry.npmjs.org';

function ensureDir(dirPath: string): string {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
}

function getDefaultRootDir(): string {
  if (process.env.PAPYRUS_CLI_DIR) {
    return path.resolve(process.env.PAPYRUS_CLI_DIR);
  }
  if (process.platform === 'win32' && process.env.LOCALAPPDATA) {
    return path.join(process.env.LOCALAPPDATA, 'Papyrus', 'cli');
  }
  return path.join(os.homedir(), '.papyrus', 'cli');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNpmPackageMetadata(value: unknown): value is NpmPackageMetadata {
  if (!isRecord(value)) return false;
  const dist = value.dist;
  return (
    typeof value.version === 'string' &&
    isRecord(dist) &&
    typeof dist.tarball === 'string'
  );
}

function isManifest(value: unknown): value is CliManagerManifest {
  if (!isRecord(value)) return false;
  return (
    typeof value.currentVersion === 'string' &&
    typeof value.executablePath === 'string' &&
    typeof value.packageName === 'string' &&
    typeof value.installedAt === 'string'
  );
}

function normalizeBinPath(bin: string): string {
  return bin.replace(/^\.\//, '').replace(/\\/g, '/');
}

function findExecutable(versionDir: string, metadata: NpmPackageMetadata): string | null {
  const candidates: string[] = [];
  const addCandidate = (relativePath: string) => {
    const normalized = normalizeBinPath(relativePath);
    candidates.push(path.join(versionDir, normalized));
    candidates.push(path.join(versionDir, 'package', normalized));
  };

  if (typeof metadata.bin === 'string') {
    addCandidate(metadata.bin);
  } else if (isRecord(metadata.bin)) {
    for (const value of Object.values(metadata.bin)) {
      if (typeof value === 'string') addCandidate(value);
    }
  }

  candidates.push(
    path.join(versionDir, process.platform === 'win32' ? 'papyrus-cli.exe' : 'papyrus-cli'),
    path.join(versionDir, process.platform === 'win32' ? 'papyrus.exe' : 'papyrus'),
    path.join(versionDir, 'package', process.platform === 'win32' ? 'papyrus-cli.exe' : 'papyrus-cli'),
    path.join(versionDir, 'package', 'bin', process.platform === 'win32' ? 'papyrus-cli.exe' : 'papyrus-cli'),
    path.join(versionDir, 'package', 'bin', 'papyrus.js'),
  );

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

async function writeResponseToFile(response: Response, filePath: string): Promise<void> {
  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
}

function isNewerVersion(latestVersion: string | null, currentVersion: string | null): boolean {
  return Boolean(latestVersion && currentVersion && latestVersion !== currentVersion);
}

export class CliManager {
  private readonly rootDir: string;
  private readonly packageName: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: CliManagerOptions = {}) {
    this.rootDir = options.rootDir ?? getDefaultRootDir();
    this.packageName = options.packageName ?? process.env.PAPYRUS_CLI_PACKAGE ?? DEFAULT_PACKAGE;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  getManifestPath(): string {
    return path.join(this.rootDir, MANIFEST_FILE);
  }

  getVersionsDir(): string {
    return path.join(this.rootDir, 'versions');
  }

  readManifest(): CliManagerManifest | null {
    const manifestPath = this.getManifestPath();
    if (!fs.existsSync(manifestPath)) return null;
    const parsedJson: unknown = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return isManifest(parsedJson) ? parsedJson : null;
  }

  writeManifest(manifest: CliManagerManifest): void {
    ensureDir(this.rootDir);
    fs.writeFileSync(this.getManifestPath(), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  }

  async fetchLatestMetadata(): Promise<NpmPackageMetadata> {
    const packagePath = this.packageName.split('/').map(segment => encodeURIComponent(segment)).join('/');
    const response = await this.fetchImpl(`${REGISTRY_BASE}/${packagePath}/latest`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      throw new Error(`npm registry 返回错误: ${response.status}`);
    }
    const metadata: unknown = await response.json();
    if (!isNpmPackageMetadata(metadata)) {
      throw new Error('npm registry 返回的 CLI 包信息格式异常');
    }
    return metadata;
  }

  async getStatus(): Promise<CliStatus> {
    const manifest = this.readManifest();
    const executableExists = manifest ? fs.existsSync(manifest.executablePath) : false;
    let latestVersion: string | null = null;
    try {
      latestVersion = (await this.fetchLatestMetadata()).version;
    } catch {
      latestVersion = null;
    }
    const version = executableExists && manifest ? manifest.currentVersion : null;
    return {
      success: true,
      installed: Boolean(executableExists),
      version,
      path: executableExists && manifest ? manifest.executablePath : null,
      latestVersion,
      updateAvailable: isNewerVersion(latestVersion, version),
      packageName: this.packageName,
    };
  }

  async install(): Promise<CliInstallResult> {
    const metadata = await this.fetchLatestMetadata();
    const versionDir = path.join(this.getVersionsDir(), metadata.version);
    ensureDir(versionDir);
    const archivePath = path.join(versionDir, `${metadata.version}.tgz`);

    const response = await this.fetchImpl(metadata.dist.tarball, {
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) {
      throw new Error(`CLI 下载失败: ${response.status}`);
    }

    await writeResponseToFile(response, archivePath);
    await extract({ file: archivePath, cwd: versionDir, strict: true });

    const executablePath = findExecutable(versionDir, metadata);
    if (!executablePath) {
      throw new Error('CLI 包中未找到可执行入口');
    }

    const manifest: CliManagerManifest = {
      currentVersion: metadata.version,
      executablePath,
      packageName: this.packageName,
      installedAt: new Date().toISOString(),
    };
    this.writeManifest(manifest);

    return {
      success: true,
      version: manifest.currentVersion,
      path: manifest.executablePath,
      packageName: manifest.packageName,
    };
  }

  async update(): Promise<CliInstallResult> {
    return this.install();
  }

  async run(args: string[], env: NodeJS.ProcessEnv = {}): Promise<CliRunResult> {
    const manifest = this.readManifest();
    if (!manifest || !fs.existsSync(manifest.executablePath)) {
      throw new Error('CLI 未安装');
    }

    const runEnv: NodeJS.ProcessEnv = {
      ...process.env,
      ...env,
      PAPYRUS_API_URL: env.PAPYRUS_API_URL ?? process.env.PAPYRUS_API_URL ?? `http://127.0.0.1:${process.env.PAPYRUS_PORT ?? '8000'}`,
      PAPYRUS_MCP_URL: env.PAPYRUS_MCP_URL ?? process.env.PAPYRUS_MCP_URL ?? 'http://127.0.0.1:9200',
      PAPYRUS_AUTH_TOKEN: env.PAPYRUS_AUTH_TOKEN ?? process.env.PAPYRUS_AUTH_TOKEN,
    };

    return await new Promise((resolve, reject) => {
      const isJavaScriptEntry = manifest.executablePath.endsWith('.js') || manifest.executablePath.endsWith('.mjs') || manifest.executablePath.endsWith('.cjs');
      const command = isJavaScriptEntry ? process.execPath : manifest.executablePath;
      const finalArgs = isJavaScriptEntry ? [manifest.executablePath, ...args] : args;
      const child = spawn(command, finalArgs, {
        env: runEnv,
        windowsHide: true,
      });
      let stdout = '';
      let stderr = '';

      child.stdout.on('data', chunk => { stdout += String(chunk); });
      child.stderr.on('data', chunk => { stderr += String(chunk); });
      child.on('error', reject);
      child.on('close', exitCode => {
        resolve({
          success: exitCode === 0,
          exitCode,
          stdout,
          stderr,
        });
      });
    });
  }
}

export const defaultCliManager = new CliManager();


