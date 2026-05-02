import type { FastifyInstance } from 'fastify';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pkg = require('../../../package.json');
const CURRENT_VERSION = pkg.version as string;
const REPO = 'PapyrusOR/Papyrus_Desktop';

export default async function updateRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/check', async (_request, reply) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) {
        if (res.status === 403) {
          reply.send({ success: false, error: 'GitHub API 访问受限，请检查网络连接' });
          return;
        }
        reply.send({ success: false, error: `GitHub API 返回错误: ${res.status}` });
        return;
      }
      const data = await res.json() as { tag_name: string; html_url: string; assets: Array<{ browser_download_url: string }> };
      const latest = data.tag_name;

      reply.send({
        success: true,
        data: {
          version: latest,
          current: CURRENT_VERSION,
          has_update: latest !== CURRENT_VERSION,
          download_url: data.assets[0]?.browser_download_url ?? data.html_url,
        },
        message: latest !== CURRENT_VERSION ? 'Update available' : 'You are up to date',
      });
    } catch (error) {
      const message = error instanceof Error && error.name === 'TimeoutError'
        ? '连接 GitHub 超时，请检查网络连接'
        : '无法连接到 GitHub，请检查网络连接';
      reply.send({ success: false, error: message });
    }
  });

  fastify.get('/version', async (_request, reply) => {
    reply.send({ version: CURRENT_VERSION, repository: REPO });
  });
}
