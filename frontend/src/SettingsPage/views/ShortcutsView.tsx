import { useState } from 'react';
import {
  Button,
  Typography,
} from '@arco-design/web-react';
import {
  IconArrowLeft,
  IconEdit,
  IconBulb,
  IconCommand,
} from '@arco-design/web-react/icon';

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

  // 通用快捷键
  const generalShortcuts = {
    newNote: { label: '新建笔记', shortcut: 'Ctrl+N' },
    newCard: { label: '新建卡片', shortcut: 'Ctrl+Shift+C' },
    newWindow: { label: '新建窗口', shortcut: 'Ctrl+Shift+N' },
    openNotes: { label: '打开笔记页', shortcut: 'Ctrl+O' },
    openFiles: { label: '打开文件库', shortcut: 'Ctrl+K O' },
    startReview: { label: '开始复习', shortcut: 'Ctrl+R' },
    search: { label: '搜索', shortcut: 'Ctrl+K' },
    save: { label: '保存', shortcut: 'Ctrl+S' },
    saveAll: { label: '全部保存', shortcut: 'Ctrl+K S' },
    preferences: { label: '首选项', shortcut: 'Ctrl+,' },
    closeEditor: { label: '关闭编辑器', shortcut: 'Ctrl+F4' },
    exit: { label: '退出', shortcut: 'Alt+F4' },
    importTxt: { label: '从文本导入卡片', shortcut: 'Ctrl+Shift+I' },
  };

  // 编辑器快捷键
  const editorShortcuts = {
    undo: { label: '撤销', shortcut: 'Ctrl+Z' },
    redo: { label: '重做', shortcut: 'Ctrl+Y' },
    cut: { label: '剪切', shortcut: 'Ctrl+X' },
    copy: { label: '复制', shortcut: 'Ctrl+C' },
    paste: { label: '粘贴', shortcut: 'Ctrl+V' },
    selectAll: { label: '全选', shortcut: 'Ctrl+A' },
    find: { label: '查找', shortcut: 'Ctrl+F' },
  };

  // 学习模式快捷键
  const studyShortcuts = {
    revealAnswer: { label: '揭晓答案', shortcut: 'Space / Enter' },
    rateForgot: { label: '评分 - 忘记', shortcut: '1' },
    rateHard: { label: '评分 - 模糊', shortcut: '2' },
    rateGood: { label: '评分 - 掌握', shortcut: '3' },
    undoRate: { label: '撤销评分', shortcut: 'U' },
    exitStudy: { label: '退出学习', shortcut: 'Esc' },
  };

  // 通用快捷键内容
  const GeneralShortcuts = () => (
    <div className="settings-section">
      {Object.entries(generalShortcuts).map(([key, { label, shortcut }], index, arr) => (
        <SettingItem 
          key={key}
          title={label}
          divider={index !== arr.length - 1}
        >
          <div className="settings-shortcut-input">
            <span className="settings-shortcut-value">{shortcut}</span>
            <Button type="text" size="mini" icon={<IconEdit />} aria-label={`编辑${label}快捷键`} />
          </div>
        </SettingItem>
      ))}

      <div className="settings-tip">
        <IconBulb style={{ color: 'var(--color-primary)' }} />
        <Text type="secondary" style={{ fontSize: 13 }}>
          点击编辑按钮可修改快捷键，快捷键冲突时会自动提示
        </Text>
      </div>
    </div>
  );

  // 编辑器快捷键内容
  const EditorShortcuts = () => (
    <div className="settings-section">
      {Object.entries(editorShortcuts).map(([key, { label, shortcut }], index, arr) => (
        <SettingItem 
          key={key}
          title={label}
          divider={index !== arr.length - 1}
        >
          <div className="settings-shortcut-input">
            <span className="settings-shortcut-value">{shortcut}</span>
            <Button type="text" size="mini" icon={<IconEdit />} aria-label={`编辑${label}快捷键`} />
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
      {Object.entries(studyShortcuts).map(([key, { label, shortcut }], index, arr) => (
        <SettingItem 
          key={key}
          title={label}
          desc={key === 'revealAnswer' ? '在卡片问题界面' : key.startsWith('rate') ? '在卡片答案界面' : undefined}
          divider={index !== arr.length - 1}
        >
          <div className="settings-shortcut-input">
            <span className="settings-shortcut-value">{shortcut}</span>
            <Button type="text" size="mini" icon={<IconEdit />} aria-label={`编辑${label}快捷键`} />
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
