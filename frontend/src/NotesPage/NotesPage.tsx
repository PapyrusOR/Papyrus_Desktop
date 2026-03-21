import { Typography, Button, Tag, Input, Modal } from '@arco-design/web-react';
import { IconPlus, IconFolder } from '@arco-design/web-react/icon';
import { useState, useMemo } from 'react';

const PRIMARY_COLOR = '#206CCF';

// 统一按钮样式
const UNIFIED_BTN_STYLE = {
  height: '40px',
  borderRadius: '20px',
  padding: '0 20px',
  fontSize: '14px',
};

// 笔记数据
const MOCK_NOTES = [
  { id: '1', title: '极限的定义与性质', folder: '高等数学', preview: '数列极限：对于任意 ε > 0，存在正整数 N...', tags: ['数学', '极限'], updatedAt: '今天', wordCount: 1240 },
  { id: '2', title: '导数的几何意义', folder: '高等数学', preview: '函数在某点的导数表示函数曲线在该点切线的斜率...', tags: ['数学', '导数'], updatedAt: '昨天', wordCount: 890 },
  { id: '3', title: '微分中值定理', folder: '高等数学', preview: '罗尔定理、拉格朗日中值定理、柯西中值定理...', tags: ['数学'], updatedAt: '3天前', wordCount: 2100 },
  { id: '4', title: 'React useEffect 详解', folder: '前端开发', preview: 'useEffect 是 React 中用于处理副作用的 Hook...', tags: ['React', 'Hooks'], updatedAt: '今天', wordCount: 3200 },
  { id: '5', title: 'TypeScript 泛型', folder: '前端开发', preview: '泛型（Generics）是 TypeScript 的核心特性之一...', tags: ['TS'], updatedAt: '2天前', wordCount: 1560 },
  { id: '6', title: '进程与线程', folder: '操作系统', preview: '进程是操作系统资源分配的基本单位...', tags: ['OS'], updatedAt: '4天前', wordCount: 2800 },
  { id: '7', title: '内存管理', folder: '操作系统', preview: '操作系统的内存管理主要包括内存分配...', tags: ['OS'], updatedAt: '5天前', wordCount: 3400 },
  { id: '8', title: '日语动词变形', folder: '日本語', preview: '日语动词分为三类...', tags: ['日语', 'N2'], updatedAt: '今天', wordCount: 1890 },
];

// 通用卡片样式
const useCardStyle = (hovered: boolean) => ({
  borderRadius: '16px',
  border: `1px solid ${hovered ? PRIMARY_COLOR : 'var(--color-text-3)'}`,
  background: hovered ? `${PRIMARY_COLOR}08` : 'var(--color-bg-1)',
  transition: 'border-color 0.2s, background 0.2s',
  cursor: 'pointer',
  height: '200px',
  boxSizing: 'border-box' as const,
});

// 横向文件夹树项
const FolderTab = ({ 
  folder, 
  count,
  isActive, 
  onClick 
}: { 
  folder: string; 
  count: number;
  isActive: boolean; 
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      padding: '10px 20px',
      borderRadius: '10px',
      cursor: 'pointer',
      background: isActive ? `${PRIMARY_COLOR}15` : 'transparent',
      border: `1px solid ${isActive ? PRIMARY_COLOR : 'transparent'}`,
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: '120px',
      justifyContent: 'center',
      height: '52px',
      boxSizing: 'border-box' as const,
    }}
  >
    <IconFolder style={{ fontSize: '16px', color: isActive ? PRIMARY_COLOR : 'var(--color-text-3)' }} />
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        fontSize: '14px', 
        fontWeight: isActive ? 600 : 500,
        color: isActive ? PRIMARY_COLOR : 'var(--color-text-1)',
      }}>
        {folder}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--color-text-3)', marginTop: '2px' }}>
        {count} 篇
      </div>
    </div>
  </div>
);

// 笔记卡片 - 固定高度
const NoteCard = ({ note, onClick }: { note: typeof MOCK_NOTES[0]; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  const cardStyle = useCardStyle(hovered);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        ...cardStyle,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          background: 'var(--color-fill-2)',
          color: 'var(--color-text-3)',
          borderRadius: '999px',
          padding: '2px 10px',
          fontSize: '11px',
        }}>
          <IconFolder style={{ fontSize: '10px' }} />
          {note.folder}
        </div>
        <Typography.Text type='secondary' style={{ fontSize: '12px' }}>
          {note.updatedAt}
        </Typography.Text>
      </div>

      <Typography.Text bold style={{ fontSize: '16px', lineHeight: 1.4, marginBottom: '8px' }}>
        {note.title}
      </Typography.Text>

      <Typography.Paragraph
        type='secondary'
        style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, flex: 1 }}
        ellipsis={{ rows: 3 }}
      >
        {note.preview}
      </Typography.Paragraph>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {note.tags.slice(0, 2).map(tag => (
            <Tag key={tag} size='small' color='arcoblue' style={{ fontSize: '11px' }}>{tag}</Tag>
          ))}
          {note.tags.length > 2 && (
            <Tag size='small' style={{ fontSize: '11px', background: 'var(--color-fill-2)' }}>+{note.tags.length - 2}</Tag>
          )}
        </div>
        <Typography.Text type='secondary' style={{ fontSize: '12px' }}>
          {note.wordCount} 字
        </Typography.Text>
      </div>
    </div>
  );
};

// 添加卡片 - 高度与笔记卡片一致
const AddCard = ({ onClick }: { onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        height: '200px',
        borderRadius: '16px',
        border: `1px dashed ${hovered ? PRIMARY_COLOR : 'var(--color-text-3)'}`,
        background: hovered ? `${PRIMARY_COLOR}08` : 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        cursor: 'pointer',
        transition: 'border-color 0.2s, background 0.2s',
        boxSizing: 'border-box' as const,
      }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: hovered ? PRIMARY_COLOR : 'var(--color-fill-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
      }}>
        <IconPlus style={{ fontSize: '24px', color: hovered ? '#fff' : 'var(--color-text-2)' }} />
      </div>
      <Typography.Text type={hovered ? 'primary' : 'secondary'} style={{ fontSize: '14px' }}>
        新建笔记
      </Typography.Text>
    </div>
  );
};

// 飞书式编辑界面
const EditorModal = ({ note, visible, onClose }: { note: typeof MOCK_NOTES[0] | null; visible: boolean; onClose: () => void }) => {
  if (!note) return null;

  // 大纲数据
  const outline = [
    { id: '1', title: note.title, level: 1 },
    { id: '2', title: '核心概念', level: 2 },
    { id: '3', title: '详细说明', level: 2 },
    { id: '4', title: '实例分析', level: 2 },
    { id: '5', title: '参考资料', level: 2 },
  ];

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width='95vw'
      style={{ top: 20, maxWidth: '1200px' }}
      bodyStyle={{ padding: 0, height: 'calc(95vh - 110px)', overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', height: '100%' }}>
        {/* 左侧大纲 */}
        <div style={{
          width: '220px',
          flexShrink: 0,
          borderRight: '1px solid var(--color-border-2)',
          background: 'var(--color-bg-1)',
          padding: '24px 16px',
          overflowY: 'auto',
        }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-2)', marginBottom: '16px' }}>
            大纲
          </div>
          {outline.map((item, index) => (
            <div
              key={item.id}
              style={{
                padding: '6px 12px',
                paddingLeft: `${12 + (item.level - 1) * 16}px`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                color: index === 0 ? PRIMARY_COLOR : 'var(--color-text-2)',
                fontWeight: index === 0 ? 500 : 400,
                background: index === 0 ? `${PRIMARY_COLOR}08` : 'transparent',
                marginBottom: '2px',
              }}
            >
              {item.title}
            </div>
          ))}
        </div>

        {/* 右侧内容区 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '40px 60px' }}>
          {/* 面包屑 */}
          <div style={{ fontSize: '13px', color: 'var(--color-text-3)', marginBottom: '24px' }}>
            结构笔记 / {note.folder} / <span style={{ color: PRIMARY_COLOR }}>{note.title}</span>
          </div>

          {/* 大标题 */}
          <Input
            defaultValue={note.title}
            style={{
              fontSize: '36px',
              fontWeight: 700,
              border: 'none',
              background: 'transparent',
              padding: 0,
              marginBottom: '24px',
              color: 'var(--color-text-1)',
            }}
          />

          {/* 元信息 - 横向布局 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '24px', 
            marginBottom: '40px',
            padding: '16px 20px',
            background: '#FFFBE6',
            borderRadius: '8px',
            border: '1px solid #FFE58F',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-text-2)' }}>
              <IconFolder style={{ fontSize: '14px' }} />
              {note.folder}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-3)' }}>更新于 {note.updatedAt}</div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-3)' }}>{note.wordCount} 字</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {note.tags.map(tag => (
                <Tag key={tag} size='small' color='arcoblue' style={{ fontSize: '11px' }}>{tag}</Tag>
              ))}
            </div>
          </div>

          {/* 内容编辑区 */}
          <Input.TextArea
            defaultValue={`${note.preview}

## 核心概念

这里是关于 ${note.title} 的核心概念说明。

### 要点一
详细阐述第一个要点...

### 要点二
详细阐述第二个要点...

## 详细说明

展开详细的内容描述，可以包含：
- 理论推导
- 实际应用
- 注意事项

## 实例分析

通过具体例子加深理解：

**例1**：简单示例说明...

**例2**：进阶示例说明...

## 参考资料

- [相关笔记链接]
- [外部参考资料]`}
            style={{
              width: '100%',
              minHeight: '500px',
              border: 'none',
              background: 'transparent',
              fontSize: '15px',
              lineHeight: '1.8',
              resize: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

const NotesPage = () => {
  const [activeFolder, setActiveFolder] = useState('全部笔记');
  const [selectedNote, setSelectedNote] = useState<typeof MOCK_NOTES[0] | null>(null);
  const [editorVisible, setEditorVisible] = useState(false);

  // 动态生成文件夹列表
  const folders = useMemo(() => {
    const folderMap = new Map<string, number>();
    folderMap.set('全部笔记', MOCK_NOTES.length);
    MOCK_NOTES.forEach(note => {
      folderMap.set(note.folder, (folderMap.get(note.folder) || 0) + 1);
    });
    return Array.from(folderMap.entries()).map(([name, count]) => ({ name, count }));
  }, []);

  // 动态生成标签列表
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    MOCK_NOTES.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet);
  }, []);

  const filteredNotes = activeFolder === '全部笔记' 
    ? MOCK_NOTES 
    : MOCK_NOTES.filter(n => n.folder === activeFolder);

  const totalWords = filteredNotes.reduce((sum, n) => sum + n.wordCount, 0);
  const todayNotes = filteredNotes.filter(n => n.updatedAt === '今天').length;

  const handleEdit = (note: typeof MOCK_NOTES[0]) => {
    setSelectedNote(note);
    setEditorVisible(true);
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '48px 64px 64px' }}>
      {/* 标题 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <Typography.Title heading={1} style={{ fontWeight: 400, lineHeight: 1, margin: 0, fontSize: '40px' }}>
            结构笔记
          </Typography.Title>
          <Typography.Text type='secondary' style={{ fontSize: '14px', marginTop: '8px', display: 'block' }}>
            {activeFolder} · {filteredNotes.length} 篇 · {totalWords.toLocaleString()} 字
          </Typography.Text>
        </div>
        {/* 统一按钮样式 */}
        <Button 
          type='primary' 
          icon={<IconPlus />} 
          style={{ ...UNIFIED_BTN_STYLE, backgroundColor: PRIMARY_COLOR }}
        >
          新建笔记
        </Button>
      </div>

      {/* 数据栏 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        marginBottom: '24px',
        borderRadius: '12px',
        border: '1px solid var(--color-text-3)',
        background: 'var(--color-bg-1)',
      }}>
        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ textAlign: 'center' }}>
            <Typography.Text style={{ fontSize: '24px', fontWeight: 600, color: PRIMARY_COLOR }}>{filteredNotes.length}</Typography.Text>
            <Typography.Text type='secondary' style={{ fontSize: '12px', display: 'block', marginTop: '2px' }}>笔记数</Typography.Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Typography.Text style={{ fontSize: '24px', fontWeight: 600 }}>{(totalWords / 1000).toFixed(1)}k</Typography.Text>
            <Typography.Text type='secondary' style={{ fontSize: '12px', display: 'block', marginTop: '2px' }}>总字数</Typography.Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Typography.Text style={{ fontSize: '24px', fontWeight: 600 }}>{todayNotes}</Typography.Text>
            <Typography.Text type='secondary' style={{ fontSize: '12px', display: 'block', marginTop: '2px' }}>今日更新</Typography.Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Typography.Text style={{ fontSize: '24px', fontWeight: 600 }}>{allTags.length}</Typography.Text>
            <Typography.Text type='secondary' style={{ fontSize: '12px', display: 'block', marginTop: '2px' }}>标签</Typography.Text>
          </div>
        </div>
      </div>

      {/* 横向文件夹树 - 动态生成，高度统一 */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '32px',
        overflowX: 'auto',
        paddingBottom: '4px',
      }}>
        {folders.map(({ name, count }) => (
          <FolderTab
            key={name}
            folder={name}
            count={count}
            isActive={activeFolder === name}
            onClick={() => setActiveFolder(name)}
          />
        ))}
      </div>

      {/* 标签筛选 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {allTags.map(tag => (
          <Tag key={tag} color='arcoblue' style={{ cursor: 'pointer' }}>{tag}</Tag>
        ))}
      </div>

      {/* 笔记卡片网格 - 高度对齐 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredNotes.map(note => (
          <NoteCard key={note.id} note={note} onClick={() => handleEdit(note)} />
        ))}
        <AddCard onClick={() => {}} />
      </div>

      <div style={{ height: '32px' }} />

      {/* 编辑弹窗 - 飞书式 */}
      <EditorModal
        note={selectedNote}
        visible={editorVisible}
        onClose={() => setEditorVisible(false)}
      />
    </div>
  );
};

export default NotesPage;
