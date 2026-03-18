import { useState } from 'react';
import { Dropdown, Menu } from '@arco-design/web-react';
import { IconArrowUp, IconAt, IconImage, IconBranch, IconMessage, IconDown, IconBulb } from '@arco-design/web-react/icon';
import './ChatPanel.css';

const models = [
  { key: 'claude-sonnet-4', label: 'Claude Sonnet 4' },
  { key: 'claude-opus-4', label: 'Claude Opus 4' },
  { key: 'gpt-4o', label: 'GPT-4o' },
  { key: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
];

interface ChatPanelProps {
  open: boolean;
}

const modes = [
  { key: 'agent', icon: <IconBranch />, label: 'Agent 模式' },
  { key: 'chat', icon: <IconMessage />, label: 'Chat 模式' },
];

const ChatPanel = ({ open }: ChatPanelProps) => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('agent');
  const [model, setModel] = useState('claude-sonnet-4');
  const [reasoning, setReasoning] = useState(false);

  if (!open) return null;

  const currentMode = modes.find((m) => m.key === mode)!;

  return (
    <div className="chat-panel">
      <div className="chat-panel-body">
        <div className="chat-model-select">
          <div className="chat-model-row">
            <Dropdown
              trigger="click"
              droplist={
                <Menu onClickMenuItem={(key) => setModel(key)}>
                  {models.map((m) => (
                    <Menu.Item key={m.key}>{m.label}</Menu.Item>
                  ))}
                </Menu>
              }
            >
              <button className="chat-model-btn">
                <span>{models.find((m) => m.key === model)!.label}</span>
                <IconDown style={{ fontSize: 12 }} />
              </button>
            </Dropdown>
            {reasoning && (
              <span className="chat-reasoning-badge">
                <IconBulb />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="chat-input-area">
        <textarea
          className="chat-textarea"
          placeholder="发送消息..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
        <div className="chat-toolbar">
          <div className="chat-toolbar-left">
            <Dropdown
              trigger="click"
              droplist={
                <Menu onClickMenuItem={(key) => setMode(key)}>
                  {modes.map((m) => (
                    <Menu.Item key={m.key}>
                      <span className="chat-mode-menu-item">
                        {m.icon}
                        <span>{m.label}</span>
                      </span>
                    </Menu.Item>
                  ))}
                </Menu>
              }
            >
              <button className="chat-mode-btn">
                {currentMode.icon}
                <span>{currentMode.label}</span>
              </button>
            </Dropdown>
            <button className="chat-toolbar-btn"><IconImage /></button>
            <button className="chat-toolbar-btn"><IconAt /></button>
          </div>
          <div className="chat-toolbar-right">
            <button
              className={`chat-toolbar-btn${reasoning ? ' chat-toolbar-btn-active' : ''}`}
              onClick={() => setReasoning(!reasoning)}
              title="推理模式"
            >
              <IconBulb />
            </button>
            <button className="chat-send-btn">
              <IconArrowUp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;