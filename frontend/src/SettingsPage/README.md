# 设置页面二级菜单

## 概述

设置页面支持二级菜单结构，类似 Windows 设置。每个设置分类可以有自己的侧边栏子菜单，点击后右侧显示完全不同的内容。

## 已实现二级菜单的分类

### 1. 聊天设置 (ChatView)

左侧二级菜单：
- **通用设置** - Agent 模式、时间戳、自动滚动、Enter 发送
- **自动补全** - 补全开关、二次确认、触发延迟、最大长度
- **模型参数** - 模型选择、Temperature、Top P、Max Tokens

### 2. 外观与窗景 (AppearanceView)

左侧二级菜单：
- **外观** - 主题、强调色、字体大小
- **窗景** - 开始界面窗景、各界面窗景配置

## 使用方式

### 添加新的二级菜单分类

```tsx
// 1. 定义菜单项
const MENU_ITEMS = [
  { key: 'general', label: '通用设置', icon: IconMessage },
  { key: 'advanced', label: '高级设置', icon: IconSettings },
];

// 2. 创建各个子页面的内容组件
const GeneralSettings = () => (
  <>
    <SettingItem title="设置项1" desc="描述">
      <Switch checked={value} onChange={setValue} />
    </SettingItem>
    {/* 更多设置项 */}
  </>
);

const AdvancedSettings = () => (
  <>
    <SettingItem title="高级设置1" desc="描述">
      <Input value={value} onChange={setValue} />
    </SettingItem>
    {/* 更多设置项 */}
  </>
);

// 3. 创建主组件
const MySettingsView = () => {
  const [activeMenu, setActiveMenu] = useState('general');

  // 根据当前菜单渲染对应内容
  const renderContent = () => {
    switch (activeMenu) {
      case 'general':
        return <GeneralSettings />;
      case 'advanced':
        return <AdvancedSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  // 获取当前菜单标题
  const getCurrentTitle = () => {
    const item = MENU_ITEMS.find(item => item.key === activeMenu);
    return item?.label || '通用设置';
  };

  return (
    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <SettingsSidebar
        title="设置标题"
        menuItems={MENU_ITEMS}
        activeItem={activeMenu}
        onItemClick={setActiveMenu}
        onBack={() => setActiveCategory(null)}
      />

      {/* 主内容区 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '48px' }}>
        <Title heading={2} style={{ margin: '0 0 32px 0' }}>
          {getCurrentTitle()}
        </Title>
        <div className="settings-section">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
```

## 组件

### SettingsSidebar

可复用的设置侧边栏组件，支持拖拽调整宽度。

**Props:**
- `title: string` - 侧边栏标题
- `menuItems: MenuItem[]` - 菜单项数组
- `activeItem: string` - 当前激活的菜单项 key
- `onItemClick: (key: string) => void` - 点击菜单项回调
- `onBack: () => void` - 返回按钮回调
- `defaultWidth?: number` - 默认宽度 (默认 200)
- `minWidth?: number` - 最小宽度 (默认 160)
- `maxWidth?: number` - 最大宽度 (默认 320)

**MenuItem 类型:**
```tsx
interface MenuItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
}
```

## 待添加二级菜单的分类

- [ ] 通用设置 (GeneralView)
- [ ] MCP 服务 (McpView)
- [ ] 快捷键 (ShortcutsView)
- [ ] 无障碍 (AccessibilityView)
- [ ] 数据设置 (DataView)
- [ ] 关于 (AboutView)
