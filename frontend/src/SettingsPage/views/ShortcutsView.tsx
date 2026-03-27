import { useState } from 'react';
import {
  Button,
  Typography,
  Modal,
  Input,
  Message,
} from '@arco-design/web-react';
import {
  IconArrowLeft,
  IconEdit,
  IconBulb,
  IconCommand,
  IconRefresh,
} from '@arco-design/web-react/icon';
import { useShortcuts, type ShortcutConfig } from '../../hooks/useShortcuts';

const { Title, Text, Paragraph } = Typography;

interface ShortcutsViewProps {
  onBack: () => void;
}

// 快捷键设置侧边栏子菜单项
const SHORTCUTS_MENU_ITEMS = [
  { key: 'general', label: '通用快捷键', icon: IconEdit },
  { key: 'editor', label: '编辑器快捷键', icon: IconCommand },
  { key: 'study', label: '学习模式快捷键', icon: IconCommand },
];

const ShortcutsView = ({ onBack }: ShortcutsViewProps) => {
  const [activeMenu, setActiveMenu] = useState('general');
  const { shortcuts, setShortcut, resetToDefault, defaultShortcuts } = useShortcuts();
  const [editingKey, setEditingKey] = useState<keyof ShortcutConfig | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [resetModalVisible, setResetModalVisible] = useState(false);

  // 通用快捷键定义
  const generalShortcutKeys = [
    { key: 'newNote', label: '新建笔记' },
    { key: 'newCard', label: '新建卡片' },
    { key: 'newWindow', label: '新建窗口' },
    { key: 'openNotes', label: '打开笔记页' },
    { key: 'openFiles', label: '打开文件库' },
    { key: 'openReview', label: '开始复习' },
    { key: 'search', label: '搜索' },
    { key: 'save', label: '保存' },
    { key: 'saveAll', label: '全部保存' },
    { key: 'preferences', label: '首选项' },
    { key: 'closeEditor', label: '关闭编辑器' },
    { key: 'exit', label: '退出' },
    { key: 'importTxt', label: '从文本导入卡片' },
  ] as const;

  // 编辑器快捷键定义
  const editorShortcutKeys = [
    { key: 'undo', label: '撤销' },
    { key: 'redo', label: '重做' },
    { key: 'cut', label: '剪切' },
    { key: 'copy', label: '复制' },
    { key: 'paste', label: '粘贴' },
    { key: 'selectAll', label: '全选' },
    { key: 'find', label: '查找' },
  ] as const;

  // 学习模式快捷键（这些暂时存储在本地状态，因为useShortcuts只管理菜单快捷键）
  const [studyShortcuts, setStudyShortcuts] = useState({
    revealAnswer: 'Space / Enter',
    rateForgot: '1',
    rateHard: '2',
    rateGood: '3',
    undoRate: 'U',
    exitStudy: 'Esc',
  });

  const studyShortcutKeys = [
    { key: 'revealAnswer', label: '揭晓答案', desc: '在卡片问题界面' },
    { key: 'rateForgot', label: '评分 - 忘记', desc: '在卡片答案界面' },
    { key: 'rateHard', label: '评分 - 模糊', desc: '在卡片答案界面' },
    { key: 'rateGood', label: '评分 - 掌握', desc: '在卡片答案界面' },
    { key: 'undoRate', label: '撤销评分', desc: '' },
    { key: 'exitStudy', label: '退出学习', desc: '' },
  ] as const;

  // 开始编辑快捷键
  const startEditing = (key: keyof ShortcutConfig) => {
    setEditingKey(key);
    setEditingValue(shortcuts[key] || '');
  };

  // 保存编辑的快捷键
  const saveEditing = () => {
    if (editingKey) {
      // 验证快捷键格式（简单验证）
      const trimmed = editingValue.trim();
      if (trimmed) {
        setShortcut(editingKey, trimmed);
        Message.success(`已将快捷键设置为 ${trimmed}`);
      }
      setEditingKey(null);
      setEditingValue('');
    }
  };

  // 取消编辑
  const cancelEditing = () => {
    setEditingKey(null);
    setEditingValue('');
  };

  // 处理输入按键
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const keys: string[] = [];
    
    if (e.ctrlKey || e.metaKey) keys.push('Ctrl');
    if (e.altKey) keys.push('Alt');
    if (e.shiftKey) keys.push('Shift');
    
    // 获取主键
    const key = e.key;
    if (key && !['Control', 'Alt', 'Shift', 'Meta'].includes(key)) {
      // 首字母大写
      const formattedKey = key.length === 1 ? key.toUpperCase() : key;
      keys.push(formattedKey);
    }
    
    setEditingValue(keys.join('+'));
  };

  // 重置所有快捷键
  const handleReset = () => {
    resetToDefault();
    setResetModalVisible(false);
    Message.success('已重置为默认快捷键');
  };

  // 通用快捷键内容
  const GeneralShortcuts = () => (
    <div className="settings-section">
      {generalShortcutKeys.map(({ key, label }, index) => (
        <SettingItem 
          key={key}
          title={label}
          divider={index !== generalShortcutKeys.length - 1}
        >
          <div className="settings-shortcut-input">
            <span className="settings-shortcut-value">{shortcuts[key as keyof ShortcutConfig]}</span>
            <Button 
              type="text" 
              size="mini" 
              icon={<IconEdit />} 
              aria-label={`编辑${label}快捷键`}
              onClick={() => startEditing(key as keyof ShortcutConfig)}
            />
          </div>
        </SettingItem>
      ))}

      <div className="settings-tip">
        <IconBulb style={{ color: 'var(--color-primary)' }} />
        <Text type="secondary" style={{ fontSize: 13 }}>
          点击编辑按钮可修改快捷键，快捷键冲突时会自动提示
        </Text>
      </div>

      <div style={{ marginTop: 24 }}>
        <Button 
          type="secondary" 
          icon={<IconRefresh />}
          onClick={() => setResetModalVisible(true)}
        >
          重置为默认快捷键
        </Button>
      </div>
    </div>
  );

  // 编辑器快捷键内容
  const EditorShortcuts = () => (
    <div className="settings-section">
      {editorShortcutKeys.map(({ key, label }, index) => (
        <SettingItem 
          key={key}
          title={label}
          divider={index !== editorShortcutKeys.length - 1}
        >
          <div className="settings-shortcut-input">
            <span className="settings-shortcut-value">{shortcuts[key as keyof ShortcutConfig]}</span>
            <Button 
              type="text" 
              size="mini" 
              icon={<IconEdit />} 
              aria-label={`编辑${label}快捷键`}
              onClick={() => startEditing(key as keyof ShortcutConfig)}
            />
          </div>
        </SettingItem>
      ))}

      <div className="settings-tip">
        <IconBulb style={{ color: 'var(--color-primary)' }} />
        <Text type="secondary" style={{ fontSize: 13 }}>
          编辑器快捷键在文本编辑区域生效
        </Text>
      </div>
    </div>
  );

  // 学习模式快捷键内容
  const StudyShortcuts = () => (
    <div className="settings-section">
      {studyShortcutKeys.map(({ key, label, desc }, index) => (
        <SettingItem 
          key={key}
          title={label}
          desc={desc || undefined}
          divider={index !== studyShortcutKeys.length - 1}
        >
          <div className="settings-shortcut-input">
            <span className="settings-shortcut-value">
              {studyShortcuts[key as keyof typeof studyShortcuts]}
            </span>
            <Button 
              type="text" 
              size="mini" 
              icon={<IconEdit />} 
              aria-label={`编辑${label}快捷键`}
              onClick={() => {
                // 学习模式快捷键暂时使用本地状态
                Message.info('学习模式快捷键编辑功能开发中');
              }}
            />
          </div>
        </SettingItem>
      ))}

      <div className="settings-tip">
        <IconBulb style={{ color: 'var(--color-primary)' }} />
        <Text type="secondary" style={{ fontSize: 13 }}>
          学习模式快捷键仅在闪卡学习界面生效
        </Text>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'general':
        return <GeneralShortcuts />;
      case 'editor':
        return <EditorShortcuts />;
      case 'study':
        return <StudyShortcuts />;
      default:
        return <GeneralShortcuts />;
    }
  };

  const getCurrentTitle = () => {
    const item = SHORTCUTS_MENU_ITEMS.find(item => item.key === activeMenu);
    return item?.label || '通用快捷键';
  };

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--color-bg-1)',
      height: '100%',
    }}>
      {/* 左侧二级菜单 */}
      <div style={{
        width: 200,
        height: '100%',
        borderRight: '1px solid var(--color-border-2)',
        background: 'var(--color-bg-1)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        {/* 标题栏 */}
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
          <Text style={{ fontSize: '14px', fontWeight: 500 }}>快捷键</Text>
        </div>

        {/* 菜单项 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
          {SHORTCUTS_MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.key;
            return (
              <div
                key={item.key}
                onClick={() => setActiveMenu(item.key)}
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
                  transition: 'all 0.2s',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--color-fill-2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Icon style={{ fontSize: 16 }} />
                <Text
                  style={{
                    fontSize: 13,
                    color: isActive ? 'var(--color-primary)' : 'inherit',
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {item.label}
                </Text>
              </div>
            );
          })}
        </div>
      </div>

      {/* 拖拽条 */}
      <div
        style={{
          width: 4,
          cursor: 'ew-resize',
          background: 'transparent',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-border-2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      />

      {/* 主内容区 */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: 48,
      }}>
        <Title heading={2} style={{ margin: '0 0 32px 0', fontWeight: 400, fontSize: '28px' }}>
          {getCurrentTitle()}
        </Title>
        
        {renderContent()}
      </div>

      {/* 编辑快捷键弹窗 */}
      <Modal
        title="编辑快捷键"
        visible={editingKey !== null}
        onOk={saveEditing}
        onCancel={cancelEditing}
        okText="保存"
        cancelText="取消"
      >
        <div style={{ padding: '16px 0' }}>
          <Paragraph type="secondary" style={{ marginBottom: 16 }}>
            按下想要的快捷键组合，或手动输入
          </Paragraph>
          <Input
            value={editingValue}
            onChange={setEditingValue}
            onKeyDown={handleKeyDown}
            placeholder="按下快捷键..."
            style={{ fontFamily: 'monospace', fontSize: 16 }}
          />
          <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>
            提示：在输入框中按下快捷键组合即可自动识别
          </Text>
        </div>
      </Modal>

      {/* 重置确认弹窗 */}
      <Modal
        title="重置快捷键"
        visible={resetModalVisible}
        onOk={handleReset}
        onCancel={() => setResetModalVisible(false)}
        okText="重置"
        cancelText="取消"
      >
        <Paragraph>确定要将所有快捷键重置为默认值吗？</Paragraph>
      </Modal>
    </div>
  );
};

// 设置项组件
const SettingItem = ({ 
  title, 
  desc, 
  children,
  divider = true 
}: { 
  title: string; 
  desc?: string; 
  children: React.ReactNode;
  divider?: boolean;
}) => (
  <div className="settings-item">
    <div className="settings-item-content">
      <div className="settings-item-info">
        <Text bold className="settings-item-title">{title}</Text>
        {desc && <Paragraph type="secondary" className="settings-item-desc">{desc}</Paragraph>}
      </div>
      <div className="settings-item-control">
        {children}
      </div>
    </div>
    {divider && <div className="settings-item-divider" />}
  </div>
);

export default ShortcutsView;
