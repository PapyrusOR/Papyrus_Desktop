import { useState, useEffect, useCallback } from 'react';
import { Drawer, List, Input, Button, Tooltip, Popconfirm, Message as ArcoMessage, Empty } from '@arco-design/web-react';
import { IconPlus, IconEdit, IconDelete, IconHistory } from '@arco-design/web-react/icon';
import { api, ChatSession } from '../api';
import './ChatHistory.css';

interface ChatHistoryProps {
  visible: boolean;
  onClose: () => void;
  currentSessionId?: string;
  onSwitchSession: (sessionId: string) => void;
  onCreateSession: () => void;
}

export const ChatHistory = ({
  visible,
  onClose,
  currentSessionId,
  onSwitchSession,
  onCreateSession,
}: ChatHistoryProps) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // 加载会话列表
  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.listChatSessions();
      if (res.success) {
        setSessions(res.sessions);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
      ArcoMessage.error('加载会话列表失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 可见时加载数据
  useEffect(() => {
    if (visible) {
      loadSessions();
    }
  }, [visible, loadSessions]);

  // 创建新会话
  const handleCreateSession = async () => {
    try {
      const res = await api.createChatSession();
      if (res.success) {
        ArcoMessage.success('创建会话成功');
        await loadSessions();
        onCreateSession();
        onClose();
      }
    } catch (error) {
      console.error('Failed to create session:', error);
      ArcoMessage.error('创建会话失败');
    }
  };

  // 切换会话
  const handleSwitchSession = async (sessionId: string) => {
    if (sessionId === currentSessionId) {
      onClose();
      return;
    }
    try {
      const res = await api.switchChatSession(sessionId);
      if (res.success) {
        onSwitchSession(sessionId);
        onClose();
      }
    } catch (error) {
      console.error('Failed to switch session:', error);
      ArcoMessage.error('切换会话失败');
    }
  };

  // 开始编辑会话标题
  const startEditing = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditingTitle(session.title);
  };

  // 保存会话标题
  const saveSessionTitle = async (sessionId: string) => {
    const trimmedTitle = editingTitle.trim();
    if (!trimmedTitle) {
      setEditingId(null);
      return;
    }
    try {
      const res = await api.renameChatSession(sessionId, trimmedTitle);
      if (res.success) {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === sessionId ? { ...s, title: trimmedTitle } : s
          )
        );
        ArcoMessage.success('重命名成功');
      }
    } catch (error) {
      console.error('Failed to rename session:', error);
      ArcoMessage.error('重命名失败');
    } finally {
      setEditingId(null);
    }
  };

  // 删除会话
  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await api.deleteChatSession(sessionId);
      if (res.success) {
        ArcoMessage.success('删除会话成功');
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        // 如果删除的是当前会话，通知父组件
        if (sessionId === currentSessionId && sessions.length > 1) {
          const remainingSessions = sessions.filter((s) => s.id !== sessionId);
          if (remainingSessions.length > 0) {
            onSwitchSession(remainingSessions[0].id);
          }
        }
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
      ArcoMessage.error('删除会话失败');
    }
  };

  // 格式化时间
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const day = 24 * 60 * 60 * 1000;

    if (diff < day && date.getDate() === now.getDate()) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (diff < 2 * day) {
      return '昨天';
    } else if (diff < 7 * day) {
      const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      return days[date.getDay()];
    } else {
      return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent, sessionId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveSessionTitle(sessionId);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <Drawer
      title={null}
      visible={visible}
      onCancel={onClose}
      placement="left"
      width={320}
      closable={false}
      maskClosable={true}
      className="chat-history-drawer"
      footer={null}
    >
      <div className="chat-history-header">
        <div className="chat-history-title">
          <IconHistory className="chat-history-title-icon" />
          <span>会话历史</span>
        </div>
        <Tooltip content="新建会话" mini>
          <button
            className="chat-history-new-btn"
            onClick={handleCreateSession}
            aria-label="新建会话"
          >
            <IconPlus />
          </button>
        </Tooltip>
      </div>

      <div className="chat-history-body">
        {sessions.length === 0 && !loading ? (
          <div className="chat-history-empty">
            <Empty description="暂无会话记录" />
          </div>
        ) : (
          <List
            dataSource={sessions}
            loading={loading}
            render={(session) => (
              <div
                className={`chat-history-item ${
                  session.id === currentSessionId ? 'chat-history-item-active' : ''
                }`}
                onClick={() => handleSwitchSession(session.id)}
              >
                <div className="chat-history-item-content">
                  {editingId === session.id ? (
                    <Input
                      size="small"
                      autoFocus
                      value={editingTitle}
                      onChange={setEditingTitle}
                      onBlur={() => saveSessionTitle(session.id)}
                      onKeyDown={(e) => handleKeyDown(e, session.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="chat-history-item-input"
                      maxLength={50}
                    />
                  ) : (
                    <>
                      <div className="chat-history-item-title">{session.title}</div>
                      <div className="chat-history-item-meta">
                        <span>{formatTime(session.updated_at)}</span>
                        <span className="chat-history-item-dot">·</span>
                        <span>{session.message_count} 条消息</span>
                      </div>
                    </>
                  )}
                </div>

                {editingId !== session.id && (
                  <div className="chat-history-item-actions">
                    <Tooltip content="重命名" mini>
                      <button
                        className="chat-history-action-btn"
                        onClick={(e) => startEditing(session, e)}
                        aria-label="重命名会话"
                      >
                        <IconEdit />
                      </button>
                    </Tooltip>
                    <Popconfirm
                      title="确认删除"
                      content="确定要删除这个会话吗？此操作不可恢复。"
                      onOk={(e) => handleDeleteSession(session.id, e as React.MouseEvent)}
                      onCancel={(e) => e?.stopPropagation()}
                      position="bottom"
                    >
                      <Tooltip content="删除" mini>
                        <button
                          className="chat-history-action-btn chat-history-action-btn-danger"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="删除会话"
                        >
                          <IconDelete />
                        </button>
                      </Tooltip>
                    </Popconfirm>
                  </div>
                )}
              </div>
            )}
          />
        )}
      </div>
    </Drawer>
  );
};

export default ChatHistory;
