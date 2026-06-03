import type { FastifyInstance } from 'fastify';
import { createRequire } from 'node:module';
import { fetchWithProxy } from '../../utils/proxy.js';

const require = createRequire(import.meta.url);
const pkg = require('../../../package.json');
const CURRENT_VERSION: string = pkg.version;
const REPO = 'PapyrusOR/Papyrus_Desktop';

interface GitHubRelease {
  tag_name: string;
  html_url: string;
  body: string | null;
  published_at: string | null;
  assets: Array<{ browser_download_url: string }>;
}

interface UpdateCheckResponse {
  success: boolean;
  data: {
    current_version: string;
    latest_version: string;
    has_update: boolean;
    release_url: string;
    download_url: string;
    release_notes: string | null;
    published_at: string | null;
  } | null;
  message: string;
}

function isGitHubRelease(value: unknown): value is GitHubRelease {
  return (
    typeof value === 'object' &&
    value !== null &&
    'tag_name' in value &&
    typeof (value as Record<string, unknown>).tag_name === 'string'
  );
}

/** GitHub API 镜像源，按优先级排列 */
const GITHUB_API_ENDPOINTS = [
  `https://api.github.com/repos/${REPO}/releases/latest`,
  `https://gh.api.99988866.xyz/repos/${REPO}/releases/latest`,
  `https://api.mgithub.com/repos/${REPO}/releases/latest`,
];

const FETCH_TIMEOUT_MS = 10000;

async function fetchReleaseFromEndpoint(url: string): Promise<GitHubRelease> {
  const res = await fetchWithProxy(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    headers: {
      'Accept': 'application/vnd.github+json',
      'User-Agent': `Papyrus-Desktop/${CURRENT_VERSION}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const rawData: unknown = await res.json();
  if (!isGitHubRelease(rawData)) {
    throw new Error('Invalid response format');
  }
  return rawData;
}

async function fetchReleaseWithFallback(): Promise<GitHubRelease> {
  let lastError: Error | undefined;

  for (const url of GITHUB_API_ENDPOINTS) {
    try {
      const release = await fetchReleaseFromEndpoint(url);
      return release;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`[Update] Failed to fetch from ${url}: ${lastError.message}`);
    }
  }

  throw lastError ?? new Error('All GitHub API endpoints failed');
}

export default async function updateRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/check', async (_request, reply) => {
    try {
      const rawData = await fetchReleaseWithFallback();

      const latest = rawData.tag_name;
      const hasUpdate = latest !== CURRENT_VERSION;

      reply.send({
        success: true,
        data: {
          current_version: CURRENT_VERSION,
          latest_version: latest,
          has_update: hasUpdate,
          release_url: rawData.html_url,
          download_url: rawData.assets[0]?.browser_download_url ?? rawData.html_url,
          release_notes: rawData.body,
          published_at: rawData.published_at,
        },
        message: hasUpdate ? 'Update available' : 'You are up to date',
      } satisfies UpdateCheckResponse);
    } catch (error) {
      const isTimeout = error instanceof Error && (
        error.name === 'TimeoutError' || error.message.includes('timeout')
      );
      const isRestricted = error instanceof Error && error.message.includes('403');

      let errorMessage: string;
      if (isTimeout) {
        errorMessage = '连接 GitHub 超时，请检查网络或代理设置';
      } else if (isRestricted) {
        errorMessage = 'GitHub API 访问受限，请检查网络连接';
      } else {
        errorMessage = '无法连接到 GitHub，请检查网络连接';
      }

      reply.send({ success: false, data: null, message: errorMessage } satisfies UpdateCheckResponse);
    }
  });

  fastify.get('/version', async (_request, reply) => {
    reply.send({ version: CURRENT_VERSION, repository: REPO });
  });
}
