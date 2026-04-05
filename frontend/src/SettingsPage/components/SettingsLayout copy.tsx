import { Button, Typography } from '@arco-design/web-react';
import { IconArrowLeft } from '@arco-design/web-react/icon';
import { SettingsSidebar, type MenuItem } from './SettingsSidebar';

const { Title, Text } = Typography;

export interface SettingsLayoutProps {
  title: string;
  menuItems: MenuItem[];
  activeMenu: string;
  onMenuChange: (key: string) => void;
  onBack: () => void;
  contentTitle?: string;
  children: React.ReactNode;
  sidebarWidth?: number;
  enableResizer?: boolean;
}

const SettingsLayout = ({
  title,
  menuItems,
  activeMenu,
  onMenuChange,
  onBack,
  contentTitle,
  children,
  sidebarWidth = 200,
  enableResizer = true,
}: SettingsLayoutProps) => {
  const currentTitle = contentTitle || menuItems.find(item => item.key === activeMenu)?.label || '';

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--color-bg-1)',
      height: '100%',
    }}>
      <SettingsSidebar
        title={title}
        menuItems={menuItems}
        activeItem={activeMenu}
        onItemClick={onMenuChange}
        onBack={onBack}
        defaultWidth={sidebarWidth}
        minWidth={160}
        maxWidth={320}
      />

      {enableResizer && (
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
      )}

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 48,
      }}>
        <Title
          heading={2}
          style={{
            margin: '0 0 32px 0',
            fontWeight: 400,
            fontSize: '28px',
          }}
        >
          {currentTitle}
        </Title>
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
