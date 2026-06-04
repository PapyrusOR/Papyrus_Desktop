import type { FastifyInstance } from 'fastify';
import {
  getSidebarSettings,
  saveSidebarSettings,
  type ChatPanelSide,
} from '../../db/database.js';

interface SidebarSettingsPayload {
  chatPanelSide?: unknown;
}

function isChatPanelSide(value: unknown): value is ChatPanelSide {
  return value === 'left' || value === 'right';
}

/**
 * 注册 UI 设置路由，当前只暴露侧边栏聊天面板方向。
 * 原因：前端偏好需要走 SQLite 持久化，同时保持接口范围足够窄。
 * 未合并到 AI/日志设置：这是通用界面状态，放入独立路由可避免配置职责混杂。
 */
export default async function uiSettingsRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/sidebar', async (_request, reply) => {
    reply.send({ success: true, settings: getSidebarSettings() });
  });

  fastify.post('/sidebar', async (request, reply) => {
    const body = request.body as SidebarSettingsPayload;
    if (!isChatPanelSide(body.chatPanelSide)) {
      reply.status(400).send({ success: false, error: 'Invalid chatPanelSide' });
      return;
    }

    const settings = saveSidebarSettings({ chatPanelSide: body.chatPanelSide });
    reply.send({ success: true, settings });
  });
}
