import { useState, useEffect } from 'react';
import {
  Typography,
} from '@arco-design/web-react';
import {
  IconRobot,
  IconSettings,
  IconStorage,
  IconSafe,
  IconEdit,
  IconTool,
  IconFileImage,
  IconInfoCircle,
} from '@arco-design/web-react/icon';
import IconAccessibility from '../icons/IconAccessibility';
import './SettingsPage.css';
import {
  AppearanceView,
  GeneralView,
  ChatView,
  McpView,
  ShortcutsView,
  AccessibilityView,
  DataView,
  AboutView,
} from './views';

const { Title, Text, Paragraph } = Typography;

const SETTING_CATEGORIES = [
  {
    key: 'appearance',
    title: '外观与窗景',
    desc: '主题、颜色、字体大小、窗景',
    icon: IconFileImage,
    color: 'var(--color-primary)',
  },
  {
    key: 'general',
    title: '通用',
    desc: '语言、启动、通知',
    icon: IconSettings,
    color: 'var(--color-success)',
  },
  {
    key: 'chat',
    title: '聊天',
    desc: 'AI 助手、消息显示',
    icon: IconRobot,
    color: 'var(--color-purple-6, #722ED1)',
  },
  {
    key: 'mcp',
    title: 'MCP 服务',
    desc: '模型上下文协议配置',
    icon: IconTool,
    color: 'var(--color-danger)',
  },
  {
    key: 'shortcuts',
    title: '快捷键',
    desc: '键盘快捷键设置',
    icon: IconEdit,
    color: 'var(--color-warning)',
  },
  {
    key: 'accessibility',
    title: '无障碍',
    desc: '视觉辅助、动画、对比度',
    icon: IconAccessibility,
    color: 'var(--color-gold-6, #c5b507)',
  },
  {
    key: 'data',
    title: '数据设置',
    desc: '备份、导出、重置',
    icon: IconStorage,
    color: 'var(--color-cyan-6, #14C9C9)',
  },
  {
    key: 'about',
    title: '关于',
    desc: '版本信息、检查更新',
    icon: IconInfoCircle,
    color: 'var(--color-primary)',
  },
];

const SettingsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'in' | 'out'>('in');

  const handleCategoryClick = (key: string) => {
    setDirection('in');
    setAnimating(true);
    setActiveCategory(key);
  };

  const handleBack = () => {
    setDirection('out');
    setAnimating(true);
    setTimeout(() => {
      setActiveCategory(null);
      setAnimating(false);
    }, 200);
  };

  useEffect(() => {
    if (!animating) return;
    const timer = setTimeout(() => setAnimating(false), 200);
    return () => clearTimeout(timer);
  }, [animating, activeCategory]);

  const CategoryCard = ({ category }: { category: typeof SETTING_CATEGORIES[0] }) => {
    const Icon = category.icon;

    return (
      <div
        className="settings-category-card"
        onClick={() => handleCategoryClick(category.key)}
        role="button"
        tabIndex={0}
        aria-label={`${category.title}: ${category.desc}`}
        onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category.key)}
      >
        <div 
          className="settings-category-icon"
          style={{ 
            color: category.color,
          }}
        >
          <Icon style={{ fontSize: 32 }} />
        </div>
        <div className="settings-category-content">
          <Text bold className="settings-category-title">{category.title}</Text>
          <Paragraph type="secondary" className="settings-category-desc">
            {category.desc}
          </Paragraph>
        </div>
      </div>
    );
  };

  const MainView = () => (
    <div 
      className="settings-main"
      style={{ height: '100%', overflowY: 'auto' }}
    >
      <Title heading={1} style={{ fontWeight: 600, lineHeight: 1, margin: 0, fontSize: '40px', marginBottom: 32 }}>设置</Title>
      <div className="settings-categories-grid">
        {SETTING_CATEGORIES.map(category => (
          <CategoryCard key={category.key} category={category} />
        ))}
      </div>
    </div>
  );

  const getViewComponent = (key: string) => {
    const views: Record<string, React.ReactNode> = {
      appearance: <AppearanceView onBack={handleBack} />,
      general: <GeneralView onBack={handleBack} />,
      chat: <ChatView onBack={handleBack} />,
      mcp: <McpView onBack={handleBack} />,
      shortcuts: <ShortcutsView onBack={handleBack} />,
      accessibility: <AccessibilityView onBack={handleBack} />,
      data: <DataView onBack={handleBack} />,
      about: <AboutView onBack={handleBack} />,
    };
    return views[key];
  };

  return (
    <div className="settings-page">
      {activeCategory === null && !animating && <MainView />}
      {activeCategory === null && animating && direction === 'out' && (
        <div 
          className="settings-main settings-page-exit" 
          style={{ height: '100%', overflowY: 'auto' }}
        >
          <Title heading={1} style={{ fontWeight: 600, lineHeight: 1, margin: 0, fontSize: '40px', marginBottom: 32 }}>设置</Title>
          <div className="settings-categories-grid">
            {SETTING_CATEGORIES.map(category => (
              <CategoryCard key={category.key} category={category} />
            ))}
          </div>
        </div>
      )}
      {activeCategory !== null && (
        <div 
          className={direction === 'in' ? 'settings-page-enter' : 'settings-page-exit'}
          style={{ height: '100%', overflow: 'hidden' }}
        >
          {getViewComponent(activeCategory)}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;