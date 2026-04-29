import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@arco-design/web-react';
import { IconNav, IconPlayArrow, IconCommon, IconFolder, IconMindMapping, IconSettings, IconLock, IconUnlock, IconMoon, IconSun, IconRobot } from '@arco-design/web-react/icon';
import IconCharts from './icons/IconCharts';
import IconScroll from './icons/IconScroll';
import './Sidebar.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  chatOpen: boolean;
  onChatToggle: () => void;
  activePage: string;
  onPageChange: (key: string) => void;
}

const Sidebar = ({ collapsed, onToggle, chatOpen, onChatToggle, activePage, onPageChange }: SidebarProps) => {
  const { t } = useTranslation();

  const items = [
    { key: 'start', icon: IconPlayArrow, label: t('sidebar.start') },
    { key: 'scroll', icon: IconScroll, label: t('sidebar.scroll') },
    { key: 'notes', icon: IconMindMapping, label: t('sidebar.notes') },
    { key: 'charts', icon: IconCharts, label: t('sidebar.charts') },
    { key: 'files', icon: IconFolder, label: t('sidebar.files') },
    { key: 'extensions', icon: IconCommon, label: t('sidebar.extensions') },
  ];

  const [locked, setLocked] = useState(false);
  const [dark, setDark] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (dark) {
      document.body.setAttribute('arco-theme', 'dark');
      document.body.style.backgroundColor = '#2A2A2B';
      document.body.style.color = 'var(--color-text-1)';
      document.body.style.colorScheme = 'dark';
    } else {
      document.body.removeAttribute('arco-theme');
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '';
      document.body.style.colorScheme = '';
    }
  }, [dark]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleDark = () => setDark(!dark);

  // 锁定/解锁编辑状态变更时触发事件
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('papyrus_edit_lock_changed', {
      detail: { locked }
    }));
  }, [locked]);

  return (
    <nav className={`sidebar${collapsed ? '' : ' sidebar-expanded'}`} aria-label="主导航">
      <button
        className={`sidebar-item sidebar-toggle${!collapsed ? ' sidebar-item-active' : ''}`}
        onClick={onToggle}
        aria-label={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        aria-expanded={!collapsed}
        type="button"
      >
        <span className="sidebar-icon"><IconNav /></span>
        <span className="sidebar-label">{t('sidebar.sidebar')}</span>
      </button>
      {items.map((item) => {
        const IconComponent = item.icon;
        return (
          <Tooltip key={item.key} content={item.label} position="right" mini disabled={!collapsed}>
            <button
              className={`sidebar-item${activePage === item.key ? ' sidebar-item-active' : ''}`}
              onClick={() => onPageChange(item.key)}
              aria-current={activePage === item.key ? 'page' : undefined}
              aria-label={item.label}
              type="button"
            >
              <span className="sidebar-icon"><IconComponent /></span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          </Tooltip>
        );
      })}
      <div className="tw-flex-1" />
      <Tooltip content={t('sidebar.chat')} position="right" mini disabled={!collapsed}>
        <button 
          className={`sidebar-item${chatOpen ? ' sidebar-item-active' : ''}`} 
          onClick={onChatToggle}
          aria-label={chatOpen ? t('sidebar.closeChat') : t('sidebar.openChat')}
          aria-pressed={chatOpen}
          type="button"
        >
          <span className="sidebar-icon"><IconRobot /></span>
          <span className="sidebar-label">{t('sidebar.chat')}</span>
        </button>
      </Tooltip>
      <Tooltip content={dark ? t('sidebar.switchToLight') : t('sidebar.switchToDark')} position="right" mini disabled={!collapsed}>
        <button 
          className="sidebar-item" 
          onClick={toggleDark}
          aria-label={dark ? t('sidebar.switchToLight') : t('sidebar.switchToDark')}
          aria-pressed={dark}
          type="button"
        >
          <span className="sidebar-icon">{dark ? <IconMoon /> : <IconSun />}</span>
          <span className="sidebar-label">{dark ? t('sidebar.darkMode') : t('sidebar.lightMode')}</span>
        </button>
      </Tooltip>
      <Tooltip content={locked ? t('sidebar.unlockEdit') : t('sidebar.lockEdit')} position="right" mini disabled={!collapsed}>
        <button
          className="sidebar-item"
          onClick={() => setLocked(!locked)}
          aria-label={locked ? t('sidebar.unlockEdit') : t('sidebar.lockEdit')}
          aria-pressed={locked}
          type="button"
        >
          <span className="sidebar-icon">{locked ? <IconLock /> : <IconUnlock />}</span>
          <span className="sidebar-label">{locked ? t('sidebar.lockEdit') : t('sidebar.unlockEdit')}</span>
        </button>
      </Tooltip>
      <Tooltip content={t('sidebar.settings')} position="right" mini disabled={!collapsed}>
        <button
          className={`sidebar-item${activePage === 'settings' ? ' sidebar-item-active' : ''}`}
          onClick={() => onPageChange('settings')}
          aria-current={activePage === 'settings' ? 'page' : undefined}
          aria-label={t('sidebar.settings')}
          type="button"
        >
          <span className="sidebar-icon"><IconSettings /></span>
          <span className="sidebar-label">{t('sidebar.settings')}</span>
        </button>
      </Tooltip>
    </nav>
  );
};

export default Sidebar;
