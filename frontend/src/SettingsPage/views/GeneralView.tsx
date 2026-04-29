import {
  Select,
  Switch,
  Button,
  Typography,
  Input,
  InputNumber,
  Message,
} from '@arco-design/web-react';
import {
  IconArrowLeft,
  IconSettings,
  IconClockCircle,
  IconNotification,
  IconFile,
} from '@arco-design/web-react/icon';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingItem } from '../components';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';
import { api } from '../../api';

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

interface GeneralViewProps {
  onBack: () => void;
}

interface LogsConfig {
  log_dir: string;
  log_level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';
  log_rotation: boolean;
  max_log_files: number;
}

const NAV_ITEMS = [
  { key: 'startup-section', label: 'generalView.startup', icon: IconClockCircle },
  { key: 'language-section', label: 'generalView.language', icon: IconNotification },
  { key: 'logs-section', label: 'generalView.logs', icon: IconFile },
];

const GeneralView = ({ onBack }: GeneralViewProps) => {
  const { t, i18n } = useTranslation();
  const { contentRef, activeSection, scrollToSection } = useScrollNavigation(NAV_ITEMS);
  const [autoStart, setAutoStart] = useState(false);
  const [minimizeToTray, setMinimizeToTray] = useState(() => {
    const saved = localStorage.getItem('papyrus_minimize_to_tray');
    return saved !== null ? saved === 'true' : false;
  });
  const [reviewReminder, setReviewReminder] = useState(true);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('papyrus_language') ?? 'zh-CN';
  });

  const [logsConfig, setLogsConfig] = useState<LogsConfig>({
    log_dir: '',
    log_level: 'INFO',
    log_rotation: true,
    max_log_files: 7,
  });
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    api.getLogsConfig()
      .then(data => {
        if (data.success && data.config) {
          setLogsConfig(prev => ({ ...prev, ...data.config }));
        }
      })
      .catch(err => {
        console.error('Failed to load logs config:', err);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('papyrus_minimize_to_tray', String(minimizeToTray));
  }, [minimizeToTray]);

  useEffect(() => {
    localStorage.setItem('papyrus_language', language);
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const saveLogsConfig = async (updates: Partial<LogsConfig>) => {
    const newConfig = { ...logsConfig, ...updates };
    setLogsConfig(newConfig);

    try {
      const data = await api.saveLogsConfig(newConfig);
      if (data.success) {
        Message.success(t('generalView.settingsSaved'));
      } else {
        Message.error(t('generalView.saveFailed'));
      }
    } catch (err) {
      Message.error(err instanceof Error ? err.message : t('generalView.saveFailed'));
    }
  };

  const openLogsDir = async () => {
    try {
      setLogsLoading(true);
      const data = await api.openLogsDir();
      if (data.success && data.path) {
        await window.electronAPI?.openFolder?.(data.path);
      } else {
        Message.error(t('generalView.saveFailed'));
      }
    } catch (err) {
      Message.error(err instanceof Error ? err.message : t('generalView.saveFailed'));
    } finally {
      setLogsLoading(false);
    }
  };

  const selectLogsDir = async () => {
    try {
      if (window.electronAPI?.selectFolder) {
        const result = await window.electronAPI.selectFolder(logsConfig.log_dir);
        if (!result.canceled && result.filePaths.length > 0) {
          const selectedPath = result.filePaths[0];
          await saveLogsConfig({ log_dir: selectedPath });
        }
      } else {
        const newPath = prompt(t('generalView.logDir') + ':', logsConfig.log_dir);
        if (newPath !== null) {
          await saveLogsConfig({ log_dir: newPath });
        }
      }
    } catch (err) {
      Message.error(t('generalView.saveFailed'));
    }
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
      <div style={{
        width: 220,
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
            aria-label="返回设置主页"
          />
          <Text style={{ fontSize: '14px', fontWeight: 500 }}>{t('settings.general')}</Text>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          {NAV_ITEMS.map(({ key, label: labelKey, icon: Icon }) => {
            const label = t(labelKey);
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
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-1)',
                  textDecoration: 'none',
                  borderRadius: 6,
                  background: isActive ? 'var(--color-primary-light)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s',
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
            <IconSettings style={{ fontSize: 32, color: 'var(--color-success)' }} />
            <Title heading={2} style={{ margin: 0, fontWeight: 400, fontSize: '28px' }}>
              {t('generalView.title')}
            </Title>
          </div>
        </div>

        <section id="startup-section" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Title heading={4} style={{ margin: 0, fontSize: 20 }}>{t('generalView.startup')}</Title>
          </div>

          <div className="settings-section" style={{ 
            background: 'var(--color-bg-2)', 
            borderRadius: 8, 
            padding: '16px 20px',
            marginBottom: 24,
          }}>
            <SettingItem title={t('generalView.autoStart')} desc={t('generalView.autoStartDesc')}>
              <Switch checked={autoStart} onChange={setAutoStart} />
            </SettingItem>

            <SettingItem title={t('generalView.minimizeToTray')} desc={t('generalView.minimizeToTrayDesc')}>
              <Switch checked={minimizeToTray} onChange={setMinimizeToTray} />
            </SettingItem>

            <SettingItem title={t('generalView.reviewReminder')} desc={t('generalView.reviewReminderDesc')} divider={false}>
              <Switch checked={reviewReminder} onChange={setReviewReminder} />
            </SettingItem>
          </div>
        </section>

        <section id="language-section" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Title heading={4} style={{ margin: 0, fontSize: 20 }}>{t('generalView.language')}</Title>
          </div>

          <div className="settings-section" style={{ 
            background: 'var(--color-bg-2)', 
            borderRadius: 8, 
            padding: '16px 20px',
            marginBottom: 24,
          }}>
            <SettingItem title={t('generalView.languageLabel')} desc={t('generalView.languageDesc')}>
              <Select value={language} onChange={setLanguage} style={{ width: 160 }}>
                <Option value="zh-CN">简体中文</Option>
                <Option value="zh-TW">繁体中文</Option>
                <Option value="en-US">English</Option>
                <Option value="ja-JP">日本語</Option>
              </Select>
            </SettingItem>

            <SettingItem title={t('generalView.dateFormat')} desc={t('generalView.dateFormatDesc')} divider={false}>
              <Select value="yyyy-MM-dd" style={{ width: 160 }}>
                <Option value="yyyy-MM-dd">2024-01-01</Option>
                <Option value="yyyy/MM/dd">2024/01/01</Option>
                <Option value="dd/MM/yyyy">01/01/2024</Option>
                <Option value="MM/dd/yyyy">01/01/2024</Option>
              </Select>
            </SettingItem>
          </div>
        </section>

        <section id="logs-section" style={{ marginBottom: 48, scrollMarginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Title heading={4} style={{ margin: 0, fontSize: 20 }}>{t('generalView.logs')}</Title>
          </div>

          <div className="settings-section" style={{ 
            background: 'var(--color-bg-2)', 
            borderRadius: 8, 
            padding: '16px 20px',
            marginBottom: 24,
          }}>
            <SettingItem title={t('generalView.logDir')} desc={t('generalView.logDirDesc')}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Input
                  value={logsConfig.log_dir}
                  readOnly
                  placeholder={t('generalView.logDir')}
                  style={{ width: 280 }}
                />
                <Button
                  type="secondary"
                  size="small"
                  onClick={selectLogsDir}
                >
                  {t('generalView.selectFolder')}
                </Button>
                <Button
                  type="secondary"
                  size="small"
                  onClick={openLogsDir}
                  loading={logsLoading}
                >
                  {t('generalView.open')}
                </Button>
              </div>
            </SettingItem>

            <SettingItem title={t('generalView.logLevel')} desc={t('generalView.logLevelDesc')}>
              <Select
                value={logsConfig.log_level}
                onChange={(value) => saveLogsConfig({ log_level: value })}
                style={{ width: 160 }}
              >
                <Option value="DEBUG">DEBUG</Option>
                <Option value="INFO">INFO</Option>
                <Option value="WARNING">WARNING</Option>
                <Option value="ERROR">ERROR</Option>
              </Select>
            </SettingItem>

            <SettingItem title={t('generalView.logRotation')} desc={t('generalView.logRotationDesc')}>
              <Switch
                checked={logsConfig.log_rotation}
                onChange={(checked) => saveLogsConfig({ log_rotation: checked })}
              />
            </SettingItem>

            <SettingItem title={t('generalView.maxLogFiles')} desc={t('generalView.maxLogFilesDesc')} divider={false}>
              <InputNumber
                min={0}
                max={365}
                value={logsConfig.max_log_files}
                onChange={(value) => saveLogsConfig({ max_log_files: value as number })}
                style={{ width: 120 }}
              />
            </SettingItem>
          </div>
        </section>

        <div style={{ height: 'calc(100vh - 200px)', flexShrink: 0 }} />
      </div>
    </div>
  );
};

export default GeneralView;