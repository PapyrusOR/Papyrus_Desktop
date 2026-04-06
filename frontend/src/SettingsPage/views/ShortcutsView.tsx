import { useState } from 'react';
import {
  Button,
  Modal,
  Input,
  Message,
  Typography,
} from '@arco-design/web-react';
import {
  IconArrowLeft,
  IconEdit,
  IconBulb,
  IconCommand,
  IconRefresh,
} from '@arco-design/web-react/icon';
import { useShortcuts, type ShortcutConfig } from '../../hooks/useShortcuts';
import { SettingItem } from '../components';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';

const { Title, Text, Paragraph } = Typography;

interface ShortcutsViewProps {
  onBack: () => void;
}

const NAV_ITEMS = [
  { key: 'general-section', label: '通用快捷键', icon: IconEdit },
  { key: 'editor-section', label: '编辑器快捷键', icon: IconCommand },
  { key: 'study-section', label: '学习模式快捷键', icon: IconCommand },
];

const ShortcutsView = ({ onBack }: ShortcutsViewProps) => {
  const { contentRef, activeSection, scrollToSection } = useScrollNavigation(NAV_ITEMS);
  const { shortcuts, setShortcut, resetToDefault } = useShortcuts();
  const [editingKey, setEditingKey] = useState<keyof ShortcutConfig | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [resetModalVisible, setResetModalVisible] = useState(false);

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

  const editorShortcutKeys = [
    { key: 'undo', label: '撤销' },
    { key: 'redo', label: '重做' },
    { key: 'cut', label: '剪切' },
    { key: 'copy', label: '复制' },
    { key: 'paste', label: '粘贴' },
    { key: 'selectAll', label: '全选' },
    { key: 'find', label: '查找' },
  ] as const;

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

  const startEditing = (key: keyof ShortcutConfig) => {
    setEditingKey(key);
    setEditingValue(shortcuts[key] || '');
  };

  const saveEditing = () => {
    if (editingKey) {
      const trimmed = editingValue.trim();
      if (trimmed) {
        setShortcut(editingKey, trimmed);
        Message.success(`已将快捷键设置为 ${trimmed}`);
      }
      setEditingKey(null);
      setEditingValue('');
    }
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditingValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const keys: string[] = [];
    
    if (e.ctrlKey || e.metaKey) keys.push('Ctrl');
    if (e.altKey) keys.push('Alt');
    if (e.shiftKey) keys.push('Shift');
    
    const key = e.key;
    if (key && !['Control', 'Alt', 'Shift', 'Meta'].includes(key)) {
      const formattedKey = key.length === 1 ? key.toUpperCase() : key;
      keys.push(formattedKey);
    }
    
    setEditingValue(keys.join('+'));
  };

  const handleReset = () => {
    resetToDefault();
    setResetModalVisible(false);
    Message.success('已重置为默认快捷键');
  };

  const ShortcutInput = ({ value, onEdit }: { value: string; onEdit: () => void }) => (
    <div className="settings-shortcut-input">
      <span className="settings-shortcut-value">{value}</span>
      <Button 
        type="text" 
        size="mini" 
        icon={<IconEdit />} 
        onClick={onEdit}
      />
    </div>
  );

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
          <Text style={{ fontSize: '14px', fontWeight: 500 }}>快捷键</Text>
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
            <IconCommand style={{ fontSize: 32, color: 'var(--color-primary)' }} />
            <Title heading={2} style={{ margin: 0, fontWeight: 400, fontSize: '28px' }}>
              快捷键
            </Title>
          </div>
          <Paragraph type="secondary">
            自定义键盘快捷键，提高操作效率
          </Paragraph>
        </div>

        <div id="general-section" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Title heading={4} style={{ margin: 0, fontSize: 20 }}>通用快捷键</Title>
          </div>

          <div className="settings-section" style={{ 
            background: 'var(--color-bg-2)', 
            borderRadius: 8, 
            padding: '16px 20px',
            marginBottom: 24,
          }}>
            {generalShortcutKeys.map(({ key, label }, index) => (
              <SettingItem 
                key={key}
                title={label}
                divider={index !== generalShortcutKeys.length - 1}
              >
                <ShortcutInput 
                  value={shortcuts[key as keyof ShortcutConfig]}
                  onEdit={() => startEditing(key as keyof ShortcutConfig)}
                />
              </SettingItem>
            ))}
          </div>
        </div>

        <div id="editor-section" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Title heading={4} style={{ margin: 0, fontSize: 20 }}>编辑器快捷键</Title>
          </div>

          <div className="settings-section" style={{ 
            background: 'var(--color-bg-2)', 
            borderRadius: 8, 
            padding: '16px 20px',
            marginBottom: 24,
          }}>
            {editorShortcutKeys.map(({ key, label }, index) => (
              <SettingItem 
                key={key}
                title={label}
                divider={index !== editorShortcutKeys.length - 1}
              >
                <ShortcutInput 
                  value={shortcuts[key as keyof ShortcutConfig]}
                  onEdit={() => startEditing(key as keyof ShortcutConfig)}
                />
              </SettingItem>
            ))}
          </div>

          <div className="settings-tip">
            <IconBulb style={{ color: 'var(--color-primary)' }} />
            编辑器快捷键在文本编辑区域生效
          </div>
        </div>

        <div id="study-section" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Title heading={4} style={{ margin: 0, fontSize: 20 }}>学习模式快捷键</Title>
          </div>

          <div className="settings-section" style={{ 
            background: 'var(--color-bg-2)', 
            borderRadius: 8, 
            padding: '16px 20px',
            marginBottom: 24,
          }}>
            {studyShortcutKeys.map(({ key, label, desc }, index) => (
              <SettingItem 
                key={key}
                title={label}
                desc={desc || undefined}
                divider={index !== studyShortcutKeys.length - 1}
              >
                <ShortcutInput 
                  value={studyShortcuts[key as keyof typeof studyShortcuts]}
                  onEdit={() => Message.info('学习模式快捷键编辑功能开发中')}
                />
              </SettingItem>
            ))}
          </div>

          <div className="settings-tip">
            <IconBulb style={{ color: 'var(--color-primary)' }} />
            学习模式快捷键仅在闪卡学习界面生效
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <div className="settings-section" style={{ 
            background: 'var(--color-bg-2)', 
            borderRadius: 8, 
            padding: '16px 20px',
          }}>
            <SettingItem title="重置快捷键" desc="将所有快捷键恢复为默认设置" divider={false}>
              <Button 
                type="secondary" 
                icon={<IconRefresh />}
                onClick={() => setResetModalVisible(true)}
              >
                重置为默认快捷键
              </Button>
            </SettingItem>
          </div>
        </div>

        <div style={{ height: 'calc(100vh - 200px)', flexShrink: 0 }} />
      </div>

      <Modal
        title="编辑快捷键"
        visible={editingKey !== null}
        onOk={saveEditing}
        onCancel={cancelEditing}
        okText="保存"
        cancelText="取消"
      >
        <div style={{ padding: '16px 0' }}>
          按下想要的快捷键组合，或手动输入
          <Input
            value={editingValue}
            onChange={setEditingValue}
            onKeyDown={handleKeyDown}
            placeholder="按下快捷键..."
            style={{ fontFamily: 'monospace', fontSize: 16, marginTop: 16 }}
          />
          <div style={{ fontSize: 12, marginTop: 8, color: 'var(--color-text-3)' }}>
            提示：在输入框中按下快捷键组合即可自动识别
          </div>
        </div>
      </Modal>

      <Modal
        title="重置快捷键"
        visible={resetModalVisible}
        onOk={handleReset}
        onCancel={() => setResetModalVisible(false)}
        okText="重置"
        cancelText="取消"
      >
        确定要将所有快捷键重置为默认值吗？
      </Modal>
    </div>
  );
};

export default ShortcutsView;
