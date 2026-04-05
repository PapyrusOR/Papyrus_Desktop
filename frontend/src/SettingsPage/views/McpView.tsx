import { useState } from 'react';
import {
  Switch,
  Button,
  Typography,
  Card,
  Tooltip,
} from '@arco-design/web-react';
import {
  IconArrowLeft,
  IconTool,
  IconPlus,
  IconDelete,
  IconEdit,
  IconSettings,
  IconStorage,
} from '@arco-design/web-react/icon';
import { SettingItem } from '../components';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';

const { Title, Text, Paragraph } = Typography;

interface McpServer {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

interface McpViewProps {
  onBack: () => void;
}

const NAV_ITEMS = [
  { key: 'servers-section', label: '服务列表', icon: IconStorage },
  { key: 'settings-section', label: '高级设置', icon: IconSettings },
];

const McpView = ({ onBack }: McpViewProps) => {
  const { contentRef, activeSection, scrollToSection } = useScrollNavigation(NAV_ITEMS);
  const [mcpEnabled, setMcpEnabled] = useState(false);
  const [mcpServers, setMcpServers] = useState<McpServer[]>([
    { id: '1', name: '文件系统', url: 'http://localhost:3001', enabled: true },
    { id: '2', name: '网页搜索', url: 'http://localhost:3002', enabled: false },
  ]);

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--color-bg-1)',
      height: '100%',
    }}>
      <div style={{
        width: 200,
        height: '100%',
        borderRight: '1px solid var(--color-border-2)',
        background: 'var(--color-bg-1)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div style={{
          padding: 16,
          borderBottom: '1px solid var(--color-border-2)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <Button
            type="text"
            icon={<IconArrowLeft />}
            onClick={onBack}
            style={{ padding: 0, fontSize: 14 }}
          />
          <Text style={{ fontSize: '14px', fontWeight: 500 }}>MCP 服务</Text>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = activeSection === key;
            return (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 12px',
                  cursor: 'pointer',
                  borderRadius: 8,
                  marginBottom: 4,
                  background: isActive ? 'var(--color-primary-light)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-1)',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  userSelect: 'none',
                }}
              >
                <Icon style={{ fontSize: 16 }} />
                <Text style={{ 
                  fontSize: 13, 
                  color: isActive ? 'var(--color-primary)' : 'inherit',
                  fontWeight: isActive ? 500 : 400,
                }}>{label}</Text>
              </button>
            );
          })}
        </div>
      </div>

      <div 
        ref={contentRef}
        onWheel={(e) => e.stopPropagation()}
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '32px 48px',
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <IconTool style={{ fontSize: 32, color: 'var(--color-primary)' }} />
            <Title heading={2} style={{ margin: 0, fontWeight: 400, fontSize: '28px' }}>
              MCP 服务
            </Title>
          </div>
          <Paragraph type="secondary">
            管理模型上下文协议服务，扩展 AI 能力
          </Paragraph>
        </div>

        <div id="servers-section" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Title heading={4} style={{ margin: 0, fontSize: 20 }}>服务列表</Title>
          </div>

          <div className="settings-section" style={{ 
            background: 'var(--color-bg-2)', 
            borderRadius: 8, 
            padding: '16px 20px',
            marginBottom: 24,
          }}>
            <SettingItem title="启用 MCP 服务" desc="允许 AI 通过 MCP 协议调用外部工具" divider={false}>
              <Switch checked={mcpEnabled} onChange={setMcpEnabled} />
            </SettingItem>
          </div>

          {mcpEnabled && (
            <div style={{ marginBottom: 24 }}>
              <Title heading={5} style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--color-text-2)' }}>已配置的服务</Title>
              
              <div className="settings-section" style={{ 
                background: 'var(--color-bg-2)', 
                borderRadius: 8, 
                padding: '16px 20px',
                marginBottom: 16,
              }}>
                {mcpServers.map((server, index) => (
                  <SettingItem 
                    key={server.id} 
                    title={server.name} 
                    desc={server.url}
                    divider={index !== mcpServers.length - 1}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Switch 
                        size="small" 
                        checked={server.enabled}
                        onChange={(checked) => {
                          setMcpServers(mcpServers.map(s => 
                            s.id === server.id ? { ...s, enabled: checked } : s
                          ));
                        }}
                      />
                      <Tooltip content="编辑">
                        <Button type="text" size="mini" icon={<IconEdit />} aria-label="编辑服务" />
                      </Tooltip>
                      <Tooltip content="删除">
                        <Button 
                          type="text" 
                          size="mini" 
                          icon={<IconDelete />}
                          status="danger"
                          onClick={() => {
                            setMcpServers(mcpServers.filter(s => s.id !== server.id));
                          }}
                          aria-label="删除服务"
                        />
                      </Tooltip>
                    </div>
                  </SettingItem>
                ))}
              </div>

              <div className="settings-section" style={{ 
                background: 'var(--color-bg-2)', 
                borderRadius: 8, 
                padding: '16px 20px',
              }}>
                <SettingItem title="添加新服务" desc="添加新的 MCP 服务" divider={false}>
                  <Button 
                    type="primary" 
                    shape="round" 
                    icon={<IconPlus />}
                    onClick={() => {
                      const newId = (mcpServers.length + 1).toString();
                      setMcpServers([...mcpServers, { 
                        id: newId, 
                        name: '新服务', 
                        url: 'http://localhost:3000', 
                        enabled: false 
                      }]);
                    }}
                  >
                    添加服务
                  </Button>
                </SettingItem>
              </div>
            </div>
          )}
        </div>

        <div id="settings-section" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Title heading={4} style={{ margin: 0, fontSize: 20 }}>高级设置</Title>
          </div>

          <div className="settings-section" style={{ 
            background: 'var(--color-bg-2)', 
            borderRadius: 8, 
            padding: '16px 20px',
            marginBottom: 24,
          }}>
            <SettingItem title="超时时间" desc="MCP 服务调用的最大等待时间（秒）" divider={false}>
              <Switch checked={true} onChange={() => {}} />
            </SettingItem>
          </div>
        </div>

        <div style={{ height: 'calc(100vh - 200px)', flexShrink: 0 }} />
      </div>
    </div>
  );
};

export default McpView;
