import { useState } from 'react';
import {
  Input,
  Select,
  Switch,
  Button,
  Slider,
  InputNumber,
  Message,
  Space,
  Typography,
  Tag,
  Modal,
  Form,
  Popconfirm,
  Checkbox,
  Tooltip,
  Card,
  Radio,
  Divider,
  Grid,
} from '@arco-design/web-react';
const CheckboxGroup = Checkbox.Group;

const OptGroup = Select.OptGroup;
import {
  IconRobot,
  IconSettings,
  IconStorage,
  IconSafe,
  IconThunderbolt,
  IconEyeInvisible,
  IconPlus,
  IconDelete,
  IconEdit,
  IconRefresh,
  IconEye,
  IconTool,
  IconBulb,
  IconCompass,
  IconPalette,
  IconMessage,
  IconArrowLeft,
  IconImage,
} from '@arco-design/web-react/icon';

import './SettingsPage.css';
import { useSceneryManager, usePageScenery, useStartPageScenery, type PageType, loadStartPageScenery, saveStartPageScenery, type StartPageSceneryConfig } from '../hooks/useScenery';

const FormItem = Form.Item;
const { Title, Text, Paragraph } = Typography;
const Option = Select.Option;
const RadioGroup = Radio.Group;

// 设置分类定义
const SETTING_CATEGORIES = [
  {
    key: 'appearance',
    title: '外观',
    desc: '主题、颜色、字体大小',
    icon: IconPalette,
    color: '#206CCF',
  },
  {
    key: 'general',
    title: '通用',
    desc: '语言、启动、通知',
    icon: IconSettings,
    color: '#00B42A',
  },
  {
    key: 'chat',
    title: '聊天',
    desc: 'AI 助手、消息显示',
    icon: IconMessage,
    color: '#722ED1',
  },
  {
    key: 'mcp',
    title: 'MCP 服务',
    desc: '模型上下文协议配置',
    icon: IconTool,
    color: '#F53F3F',
  },
  {
    key: 'shortcuts',
    title: '快捷键',
    desc: '键盘快捷键设置',
    icon: IconEdit,
    color: '#FF7D00',
  },
  {
    key: 'data',
    title: '数据设置',
    desc: '备份、导出、重置',
    icon: IconStorage,
    color: '#14C9C9',
  },
];

// Provider 预设
const PROVIDER_PRESETS: Record<string, { name: string; baseUrl: string }> = {
  openai: { name: 'OpenAI', baseUrl: 'https://api.openai.com/v1' },
  anthropic: { name: 'Anthropic', baseUrl: 'https://api.anthropic.com/v1' },
  ollama: { name: 'Ollama', baseUrl: 'http://localhost:11434' },
  gemini: { name: 'Gemini', baseUrl: 'https://generativelanguage.googleapis.com' },
  deepseek: { name: 'DeepSeek', baseUrl: 'https://api.deepseek.com' },
  siliconflow: { name: '硅基流动', baseUrl: 'https://api.siliconflow.cn' },
  moonshot: { name: '月之暗面', baseUrl: 'https://api.moonshot.cn' },
  custom: { name: '自定义', baseUrl: '' },
};

// 端口选项
const PORT_OPTIONS = [
  { label: 'OpenAI', value: 'openai' },
  { label: 'OpenAI-Response', value: 'openai-response' },
  { label: 'Anthropic', value: 'anthropic' },
  { label: 'Gemini', value: 'gemini' },
];

// 能力配置
const CAPABILITIES = [
  { key: 'tools', label: '工具调用', icon: IconTool },
  { key: 'vision', label: '视觉理解', icon: IconEye },
  { key: 'reasoning', label: '推理能力', icon: IconBulb },
];

// 主题选项
const THEME_OPTIONS = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
  { label: '跟随系统', value: 'system' },
];

// 字体大小选项
const FONT_SIZE_OPTIONS = [
  { label: '小', value: 'small' },
  { label: '中', value: 'medium' },
  { label: '大', value: 'large' },
];

// 默认窗景
const DEFAULT_SCENERY = {
  id: 'default',
  name: '默认窗景',
  image: '/scenery/image.png',
};

interface Model {
  id: string;
  name: string;
  modelId: string;
  enabled: boolean;
  port: string;
  capabilities: string[];
}

interface Provider {
  id: string;
  type: string;
  name: string;
  apiKey: string;
  baseUrl: string;
  models: Model[];
  enabled: boolean;
  isDefault: boolean;
}

const defaultProviders: Provider[] = [
  { 
    id: '1', 
    type: 'openai', 
    name: 'OpenAI', 
    apiKey: '', 
    baseUrl: 'https://api.openai.com/v1', 
    models: [
      { id: 'm1', name: 'GPT-4o', modelId: 'gpt-4o', enabled: true, port: 'openai', capabilities: ['tools', 'vision'] },
      { id: 'm2', name: 'GPT-4 Turbo', modelId: 'gpt-4-turbo', enabled: true, port: 'openai', capabilities: ['tools'] },
      { id: 'm3', name: 'GPT-3.5 Turbo', modelId: 'gpt-3.5-turbo', enabled: true, port: 'openai', capabilities: ['tools'] },
    ], 
    enabled: true, 
    isDefault: true 
  },
  { 
    id: '2', 
    type: 'gemini', 
    name: 'Gemini', 
    apiKey: '', 
    baseUrl: 'https://generativelanguage.googleapis.com', 
    models: [
      { id: 'm4', name: 'Gemini 2.5 Flash', modelId: 'gemini-2.5-flash', enabled: true, port: 'gemini', capabilities: ['tools', 'vision'] },
      { id: 'm5', name: 'Gemini 2.5 Pro', modelId: 'gemini-2.5-pro', enabled: true, port: 'gemini', capabilities: ['tools', 'vision', 'reasoning'] },
    ], 
    enabled: false, 
    isDefault: false 
  },
  { 
    id: '3', 
    type: 'deepseek', 
    name: 'DeepSeek', 
    apiKey: '', 
    baseUrl: 'https://api.deepseek.com', 
    models: [
      { id: 'm6', name: 'DeepSeek Chat', modelId: 'deepseek-chat', enabled: true, port: 'openai', capabilities: [] },
      { id: 'm7', name: 'DeepSeek R1', modelId: 'deepseek-reasoner', enabled: true, port: 'openai', capabilities: ['reasoning'] },
    ], 
    enabled: false, 
    isDefault: false 
  },
  { 
    id: '4', 
    type: 'anthropic', 
    name: 'Anthropic', 
    apiKey: '', 
    baseUrl: 'https://api.anthropic.com/v1', 
    models: [
      { id: 'm8', name: 'Claude 3.5 Sonnet', modelId: 'claude-3-5-sonnet-20241022', enabled: true, port: 'anthropic', capabilities: ['tools', 'vision'] },
      { id: 'm9', name: 'Claude 3 Opus', modelId: 'claude-3-opus-20240229', enabled: false, port: 'anthropic', capabilities: ['tools', 'vision'] },
    ], 
    enabled: false, 
    isDefault: false 
  },
];

const SettingsPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // 模型相关状态
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>('1');
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [currentModelId, setCurrentModelId] = useState<string>('m1');
  const [providers, setProviders] = useState<Provider[]>(defaultProviders);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addForm] = Form.useForm();
  const [newProviderType, setNewProviderType] = useState('openai');
  const [editingModel, setEditingModel] = useState<Model | null>(null);
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [modelForm] = Form.useForm();

  // 外观设置状态
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [accentColor, setAccentColor] = useState('#206CCF');
  
  // 窗景设置 - 使用 hooks
  const { allSceneries, customSceneries, addCustomScenery, deleteCustomScenery } = useSceneryManager();
  const notesScenery = usePageScenery('notes');
  const scrollScenery = usePageScenery('scroll');
  const filesScenery = usePageScenery('files');
  const extensionsScenery = usePageScenery('extensions');
  const chartsScenery = usePageScenery('charts');
  
  // 开始页面窗景设置（用于 DoneCard）
  const [startPageScenery, setStartPageScenery] = useState<StartPageSceneryConfig>(() => loadStartPageScenery());
  
  // 弹窗状态
  const [addSceneryModalVisible, setAddSceneryModalVisible] = useState(false);
  const [sceneryForm] = Form.useForm();
  const [activeSceneryPage, setActiveSceneryPage] = useState<PageType | 'start'>('start');
  
  // 更新开始页面窗景
  const updateStartPageScenery = (updates: Partial<StartPageSceneryConfig>) => {
    setStartPageScenery(prev => {
      const newConfig = { ...prev, ...updates };
      saveStartPageScenery(newConfig);
      return newConfig;
    });
  };

  // 通用设置状态
  const [autoStart, setAutoStart] = useState(false);
  const [minimizeToTray, setMinimizeToTray] = useState(true);
  const [reviewReminder, setReviewReminder] = useState(true);
  const [language, setLanguage] = useState('zh-CN');

  // 聊天设置状态
  const [agentModeEnabled, setAgentModeEnabled] = useState(false);
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [sendOnEnter, setSendOnEnter] = useState(true);

  // MCP 服务状态
  const [mcpEnabled, setMcpEnabled] = useState(false);
  const [mcpServers, setMcpServers] = useState([
    { id: '1', name: '文件系统', url: 'http://localhost:3001', enabled: true },
    { id: '2', name: '网页搜索', url: 'http://localhost:3002', enabled: false },
  ]);

  // 快捷键设置状态
  const [shortcuts, setShortcuts] = useState({
    openChat: 'Ctrl+Shift+C',
    newNote: 'Ctrl+N',
    search: 'Ctrl+K',
    toggleSidebar: 'Ctrl+B',
  });

  const filtered = providers.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const selected = providers.find(p => p.id === selectedId);

  const updateProvider = (id: string, updates: Partial<Provider>) => {
    setProviders(providers.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addProvider = () => {
    addForm.validate().then((values: any) => {
      const preset = PROVIDER_PRESETS[newProviderType];
      const newProvider: Provider = {
        id: Date.now().toString(),
        type: newProviderType,
        name: values.name || preset.name,
        apiKey: values.apiKey || '',
        baseUrl: values.baseUrl || preset.baseUrl,
        models: [],
        enabled: false,
        isDefault: false,
      };
      setProviders([...providers, newProvider]);
      setSelectedId(newProvider.id);
      setAddModalVisible(false);
      addForm.resetFields();
      Message.success('添加成功');
    });
  };

  const deleteProvider = (id: string) => {
    const newProviders = providers.filter(p => p.id !== id);
    setProviders(newProviders);
    if (selectedId === id) setSelectedId(newProviders[0]?.id || '');
    Message.success('已删除');
  };

  const setDefault = (id: string) => {
    setProviders(providers.map(p => ({ ...p, isDefault: p.id === id })));
    Message.success('已设为默认');
  };

  const saveModel = () => {
    modelForm.validate().then((values: any) => {
      if (!selected) return;
      
      const capabilities: string[] = [];
      if (values.cap_tools) capabilities.push('tools');
      if (values.cap_vision) capabilities.push('vision');
      if (values.cap_reasoning) capabilities.push('reasoning');
      
      const modelData = {
        name: values.name,
        modelId: values.modelId,
        port: values.port,
        capabilities,
      };
      
      if (editingModel) {
        updateProvider(selected.id, {
          models: selected.models.map(m => 
            m.id === editingModel.id 
              ? { ...m, ...modelData }
              : m
          )
        });
        Message.success('模型已更新');
      } else {
        const newModel: Model = {
          id: Date.now().toString(),
          ...modelData,
          enabled: true,
        };
        updateProvider(selected.id, { models: [...selected.models, newModel] });
        Message.success('模型添加成功');
      }
      
      setModelModalVisible(false);
      modelForm.resetFields();
      setEditingModel(null);
    });
  };

  const deleteModel = (modelId: string) => {
    if (!selected) return;
    updateProvider(selected.id, { 
      models: selected.models.filter(m => m.id !== modelId) 
    });
    Message.success('模型已删除');
  };

  const toggleModel = (modelId: string, enabled: boolean) => {
    if (!selected) return;
    updateProvider(selected.id, {
      models: selected.models.map(m => m.id === modelId ? { ...m, enabled } : m)
    });
  };

  const openModelModal = (model?: Model) => {
    if (model) {
      setEditingModel(model);
      modelForm.setFieldsValue({
        name: model.name,
        modelId: model.modelId,
        port: model.port,
        cap_tools: model.capabilities.includes('tools'),
        cap_vision: model.capabilities.includes('vision'),
        cap_reasoning: model.capabilities.includes('reasoning'),
      });
    } else {
      setEditingModel(null);
      modelForm.resetFields();
      modelForm.setFieldValue('port', selected?.type || 'openai');
      modelForm.setFieldValue('cap_tools', false);
      modelForm.setFieldValue('cap_vision', false);
      modelForm.setFieldValue('cap_reasoning', false);
    }
    setModelModalVisible(true);
  };

  const renderCapabilityIcons = (capabilities: string[]) => {
    return (
      <Space size={8}>
        {capabilities.includes('vision') && (
          <Tooltip content="视觉理解">
            <IconEye style={{ color: 'rgb(32, 108, 207)', fontSize: 16 }} />
          </Tooltip>
        )}
        {capabilities.includes('tools') && (
          <Tooltip content="工具调用">
            <IconTool style={{ color: 'rgb(32, 108, 207)', fontSize: 16 }} />
          </Tooltip>
        )}
        {capabilities.includes('reasoning') && (
          <Tooltip content="推理能力">
            <IconBulb style={{ color: 'rgb(32, 108, 207)', fontSize: 16 }} />
          </Tooltip>
        )}
      </Space>
    );
  };

  const getCurrentModel = () => {
    for (const p of providers) {
      const model = p.models.find(m => m.id === currentModelId && m.enabled);
      if (model) return { ...model, provider: p };
    }
    return null;
  };

  const currentModel = getCurrentModel();
  const currentModelSupportTools = currentModel?.capabilities.includes('tools') ?? false;

  // 分类卡片组件
  const CategoryCard = ({ category }: { category: typeof SETTING_CATEGORIES[0] }) => {
    const [hovered, setHovered] = useState(false);
    const Icon = category.icon;

    return (
      <div
        className="settings-category-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setActiveCategory(category.key)}
        style={{
          background: 'var(--color-bg-1)',
          boxShadow: hovered ? `0 8px 24px rgba(0, 0, 0, 0.12)` : '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}
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
      {divider && <Divider className="settings-item-divider" />}
    </div>
  );

  // 主页面 - 分类网格
  const MainView = () => (
    <div className="settings-main">
      <Title heading={1} className="settings-page-title">设置</Title>
      <div className="settings-categories-grid">
        {SETTING_CATEGORIES.map(category => (
          <CategoryCard key={category.key} category={category} />
        ))}
      </div>
    </div>
  );

  // 添加自定义窗景
  const handleAddCustomScenery = () => {
    sceneryForm.validate().then((values: any) => {
      addCustomScenery(values.name, values.imageUrl);
      setAddSceneryModalVisible(false);
      sceneryForm.resetFields();
      Message.success('窗景添加成功');
    });
  };

  // 单页面窗景选择组件
  interface SceneryHook {
    config: { enabled: boolean; image: string; name: string };
    updateConfig: (updates: Partial<{ enabled: boolean; image: string; name: string }>) => void;
    loaded?: boolean;
  }

  const SinglePageScenerySelector = ({ sceneryHook, title }: { sceneryHook: SceneryHook; title: string }) => {
    const { config, updateConfig } = sceneryHook;
    
    return (
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={{ fontWeight: 600 }}>{title}</Text>
          <Switch 
            size="small"
            checked={config.enabled} 
            onChange={(checked) => updateConfig({ enabled: checked })}
          />
        </div>
        
        {config.enabled && (
          <Grid.Row gutter={[8, 8]}>
            {allSceneries.map((item) => (
              <Grid.Col key={item.id} span={4}>
                <div
                  className={`settings-scenery-thumb ${config.image === item.image ? 'active' : ''}`}
                  onClick={() => updateConfig({ image: item.image, name: item.name })}
                  style={{
                    aspectRatio: '16/9',
                    borderRadius: 6,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: config.image === item.image ? '2px solid #206CCF' : '2px solid transparent',
                    boxShadow: config.image === item.image ? '0 0 0 2px rgba(32, 108, 207, 0.2)' : 'none',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.style.background = 'var(--color-fill-2)';
                    }}
                  />
                  {config.image === item.image && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: '#206CCF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              </Grid.Col>
            ))}
          </Grid.Row>
        )}
      </div>
    );
  };

  // 开始界面窗景设置（用于 DoneCard）
  const StartPageScenerySettings = () => {
    return (
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <Text style={{ fontWeight: 600 }}>开始界面</Text>
            <Paragraph type="secondary" style={{ fontSize: 12, margin: 0 }}>
              今日完成卡片中的窗景
            </Paragraph>
          </div>
          <Switch 
            size="small"
            checked={startPageScenery.enabled} 
            onChange={(checked) => updateStartPageScenery({ enabled: checked })}
          />
        </div>
        
        {startPageScenery.enabled && (
          <>
            <Text style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>选择窗景</Text>
            <Grid.Row gutter={[8, 8]}>
              {allSceneries.map((item) => (
                <Grid.Col key={item.id} span={4}>
                  <div
                    className={`settings-scenery-thumb ${startPageScenery.image === item.image ? 'active' : ''}`}
                    onClick={() => updateStartPageScenery({ image: item.image, name: item.name })}
                    style={{
                      aspectRatio: '16/9',
                      borderRadius: 6,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: startPageScenery.image === item.image ? '2px solid #206CCF' : '2px solid transparent',
                      boxShadow: startPageScenery.image === item.image ? '0 0 0 2px rgba(32, 108, 207, 0.2)' : 'none',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.style.background = 'var(--color-fill-2)';
                      }}
                    />
                    {startPageScenery.image === item.image && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 2,
                          right: 2,
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: '#206CCF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </Grid.Col>
              ))}
            </Grid.Row>
          </>
        )}
      </div>
    );
  };

  // 外观设置
  const AppearanceView = () => {
    return (
    <div className="settings-detail">
      <div className="settings-detail-header-row">
        <Button 
          type="text" 
          icon={<IconArrowLeft />}
          onClick={() => setActiveCategory(null)}
          className="settings-back-btn"
        >
          返回
        </Button>
      </div>
      <Title heading={2} className="settings-detail-title">外观</Title>
      
      <div className="settings-section">
        {/* 窗景设置 - 第一板块 */}
        <div className="settings-item">
          <div className="settings-item-content">
            <div className="settings-item-info">
              <Text bold className="settings-item-title">
                <IconImage style={{ marginRight: 8, color: '#206CCF' }} />
                窗景设置
              </Text>
              <Paragraph type="secondary" className="settings-item-desc">
                为各个界面自定义背景窗景图片
              </Paragraph>
            </div>
          </div>
          
          {/* 窗景设置卡片 */}
          <Card 
            className="settings-scenery-card"
            style={{ marginTop: 16, marginBottom: 24 }}
            bodyStyle={{ padding: 20 }}
          >
            {/* 自定义窗景库管理 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <Text style={{ fontWeight: 600 }}>我的窗景库</Text>
                <Paragraph type="secondary" style={{ fontSize: 12, margin: 0 }}>
                  {customSceneries.length} 张自定义窗景
                </Paragraph>
              </div>
              <Button 
                type="primary" 
                size="small"
                icon={<IconPlus />}
                onClick={() => setAddSceneryModalVisible(true)}
              >
                添加窗景
              </Button>
            </div>
            
            {/* 自定义窗景缩略图 */}
            {customSceneries.length > 0 && (
              <>
                <Grid.Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
                  {customSceneries.map((item) => (
                    <Grid.Col key={item.id} span={3}>
                      <div
                        style={{
                          aspectRatio: '16/9',
                          borderRadius: 6,
                          overflow: 'hidden',
                          position: 'relative',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div
                          className="settings-scenery-delete"
                          onClick={() => deleteCustomScenery(item.id)}
                          style={{
                            position: 'absolute',
                            top: 2,
                            left: 2,
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            background: 'rgba(245, 63, 63, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            opacity: 0,
                            transition: 'opacity 0.2s',
                          }}
                        >
                          <IconDelete style={{ color: 'white', fontSize: 10 }} />
                        </div>
                      </div>
                      <Text style={{ fontSize: 11, textAlign: 'center', display: 'block', marginTop: 2 }}>
                        {item.name}
                      </Text>
                    </Grid.Col>
                  ))}
                </Grid.Row>
                <style>{`
                  .settings-scenery-thumb:hover .settings-scenery-delete,
                  [class*="settings-scenery-delete"]:hover {
                    opacity: 1 !important;
                  }
                `}</style>
              </>
            )}
            
            <Divider style={{ margin: '20px 0' }} />
            
            {/* 各页面窗景设置 */}
            <Text style={{ fontWeight: 600, display: 'block', marginBottom: 16 }}>各界面窗景配置</Text>
            
            {/* 开始界面 - 支持合集 */}
            <StartPageScenerySettings />
            
            <Divider style={{ margin: '16px 0' }} />
            
            {/* 其他界面 - 单张窗景 */}
            <SinglePageScenerySelector sceneryHook={notesScenery} title="笔记界面" />
            <SinglePageScenerySelector sceneryHook={scrollScenery} title="卷轴界面" />
            <SinglePageScenerySelector sceneryHook={filesScenery} title="文件库界面" />
            <SinglePageScenerySelector sceneryHook={extensionsScenery} title="扩展管理界面" />
            <SinglePageScenerySelector sceneryHook={chartsScenery} title="数据图表界面" />
          </Card>
        </div>

        <Divider className="settings-item-divider" />

        <SettingItem title="主题" desc="选择应用的整体配色方案">
          <RadioGroup
            type="button"
            value={theme}
            onChange={setTheme}
            options={THEME_OPTIONS}
          />
        </SettingItem>

        <SettingItem title="强调色" desc="选择应用的主色调">
          <div className="settings-color-picker">
            {['#206CCF', '#00B42A', '#F53F3F', '#FF7D00', '#722ED1', '#14C9C9'].map(color => (
              <div
                key={color}
                className={`settings-color-option ${accentColor === color ? 'active' : ''}`}
                style={{ background: color }}
                onClick={() => setAccentColor(color)}
              />
            ))}
          </div>
        </SettingItem>

        <SettingItem title="字体大小" desc="调整界面文字大小" divider={false}>
          <RadioGroup
            type="button"
            value={fontSize}
            onChange={setFontSize}
            options={FONT_SIZE_OPTIONS}
          />
        </SettingItem>
      </div>
    </div>
  );
  };

  // 通用设置
  const GeneralView = () => (
    <div className="settings-detail">
      <div className="settings-detail-header-row">
        <Button 
          type="text" 
          icon={<IconArrowLeft />}
          onClick={() => setActiveCategory(null)}
          className="settings-back-btn"
        >
          返回
        </Button>
      </div>
      <Title heading={2} className="settings-detail-title">通用</Title>
      
      <div className="settings-section">
        <SettingItem title="语言">
          <Select value={language} onChange={setLanguage} style={{ width: 160 }}>
            <Option value="zh-CN">简体中文</Option>
            <Option value="zh-TW">繁体中文</Option>
            <Option value="en-US">English</Option>
            <Option value="ja-JP">日本語</Option>
          </Select>
        </SettingItem>

        <SettingItem title="开机自动启动" desc="系统启动时自动运行应用">
          <Switch checked={autoStart} onChange={setAutoStart} />
        </SettingItem>

        <SettingItem title="关闭时最小化到托盘" desc="点击关闭按钮时最小化到系统托盘">
          <Switch checked={minimizeToTray} onChange={setMinimizeToTray} />
        </SettingItem>

        <SettingItem title="复习提醒通知" desc="有卡片需要复习时显示桌面通知" divider={false}>
          <Switch checked={reviewReminder} onChange={setReviewReminder} />
        </SettingItem>
      </div>
    </div>
  );

  // 聊天设置
  const ChatView = () => (
    <div className="settings-detail">
      <div className="settings-detail-header-row">
        <Button 
          type="text" 
          icon={<IconArrowLeft />}
          onClick={() => setActiveCategory(null)}
          className="settings-back-btn"
        >
          返回
        </Button>
      </div>
      <Title heading={2} className="settings-detail-title">聊天</Title>
      
      <div className="settings-section">
        <SettingItem title="Agent 模式" desc="启用工具调用功能，AI 可以操作卡片和笔记">
          <Switch 
            checked={agentModeEnabled && currentModelSupportTools}
            onChange={setAgentModeEnabled}
            disabled={!currentModelSupportTools}
          />
        </SettingItem>

        {!currentModelSupportTools && currentModel && (
          <div className="settings-warning-tip">
            <IconBulb style={{ color: '#FF7D00' }} />
            <Text type="secondary" style={{ fontSize: 13 }}>
              当前选中的模型 "{currentModel.name}" 不支持工具调用
            </Text>
          </div>
        )}

        <SettingItem title="显示时间戳" desc="在消息旁显示发送时间">
          <Switch checked={showTimestamp} onChange={setShowTimestamp} />
        </SettingItem>

        <SettingItem title="自动滚动" desc="新消息到来时自动滚动到底部">
          <Switch checked={autoScroll} onChange={setAutoScroll} />
        </SettingItem>

        <SettingItem title="Enter 发送" desc="按 Enter 键发送消息，Shift+Enter 换行" divider={false}>
          <Switch checked={sendOnEnter} onChange={setSendOnEnter} />
        </SettingItem>
      </div>

      <div className="settings-section">
        <Title heading={4} className="settings-section-title">模型参数</Title>
        
        <div className="settings-form-row">
          <Text className="settings-form-label">当前模型</Text>
          <Select 
            value={currentModelId} 
            onChange={setCurrentModelId}
            style={{ width: 280 }}
          >
            {providers.filter(p => p.enabled).map(p => (
              <OptGroup key={p.id} label={p.name}>
                {p.models.filter(m => m.enabled).map(m => (
                  <Option key={m.id} value={m.id}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {m.name}
                      {renderCapabilityIcons(m.capabilities)}
                    </span>
                  </Option>
                ))}
              </OptGroup>
            ))}
          </Select>
        </div>

        {[
          { label: 'Temperature', min: 0, max: 2, step: 0.1, default: 0.7 },
          { label: 'Top P', min: 0, max: 1, step: 0.1, default: 0.9 },
          { label: 'Max Tokens', min: 100, max: 8000, step: 100, default: 2000 },
        ].map(item => (
          <div key={item.label} className="settings-slider-row">
            <Text className="settings-form-label">{item.label}</Text>
            <div className="settings-slider-control">
              <Slider min={item.min} max={item.max} step={item.step} defaultValue={item.default} style={{ flex: 1 }} />
              <InputNumber min={item.min} max={item.max} step={item.step} defaultValue={item.default} style={{ width: 80 }} />
            </div>
          </div>
        ))}

        <Button type="primary" shape="round" style={{ marginTop: 16 }}>
          保存参数
        </Button>
      </div>
    </div>
  );

  // MCP 服务设置
  const McpView = () => (
    <div className="settings-detail">
      <div className="settings-detail-header-row">
        <Button 
          type="text" 
          icon={<IconArrowLeft />}
          onClick={() => setActiveCategory(null)}
          className="settings-back-btn"
        >
          返回
        </Button>
      </div>
      <Title heading={2} className="settings-detail-title">MCP 服务</Title>
      
      <div className="settings-section">
        <SettingItem title="启用 MCP 服务" desc="允许 AI 通过 MCP 协议调用外部工具" divider={false}>
          <Switch checked={mcpEnabled} onChange={setMcpEnabled} />
        </SettingItem>
      </div>

      {mcpEnabled && (
        <div className="settings-section">
          <Title heading={4} className="settings-section-title">已配置的服务</Title>
          
          {mcpServers.map(server => (
            <Card 
              key={server.id} 
              className="settings-mcp-card"
              bodyStyle={{ padding: 16 }}
            >
              <div className="settings-mcp-card-content">
                <div className="settings-mcp-info">
                  <IconTool style={{ fontSize: 24, color: '#206CCF' }} />
                  <div>
                    <Text bold>{server.name}</Text>
                    <Paragraph type="secondary" style={{ fontSize: 12, margin: 0 }}>
                      {server.url}
                    </Paragraph>
                  </div>
                </div>
                <div className="settings-mcp-actions">
                  <Switch 
                    size="small" 
                    checked={server.enabled}
                    onChange={(checked) => {
                      setMcpServers(mcpServers.map(s => 
                        s.id === server.id ? { ...s, enabled: checked } : s
                      ));
                    }}
                  />
                  <Button type="text" size="mini" icon={<IconEdit />} />
                  <Button 
                    type="text" 
                    size="mini" 
                    icon={<IconDelete />}
                    status="danger"
                    onClick={() => {
                      setMcpServers(mcpServers.filter(s => s.id !== server.id));
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}

          <Button 
            type="outline" 
            shape="round" 
            icon={<IconPlus />}
            style={{ marginTop: 16 }}
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
        </div>
      )}
    </div>
  );

  // 快捷键设置
  const ShortcutsView = () => (
    <div className="settings-detail">
      <div className="settings-detail-header-row">
        <Button 
          type="text" 
          icon={<IconArrowLeft />}
          onClick={() => setActiveCategory(null)}
          className="settings-back-btn"
        >
          返回
        </Button>
      </div>
      <Title heading={2} className="settings-detail-title">快捷键</Title>
      
      <div className="settings-section">
        {Object.entries(shortcuts).map(([key, value]) => (
          <SettingItem 
            key={key}
            title={{
              openChat: '打开聊天面板',
              newNote: '新建笔记',
              search: '搜索',
              toggleSidebar: '切换侧边栏',
            }[key] || key}
            divider={key !== 'toggleSidebar'}
          >
            <div className="settings-shortcut-input">
              <span className="settings-shortcut-value">{value}</span>
              <Button type="text" size="mini" icon={<IconEdit />} />
            </div>
          </SettingItem>
        ))}
      </div>

      <div className="settings-tip">
        <IconBulb style={{ color: '#206CCF' }} />
        <Text type="secondary" style={{ fontSize: 13 }}>
          点击编辑按钮可修改快捷键，快捷键冲突时会自动提示
        </Text>
      </div>
    </div>
  );

  // 数据设置
  const DataView = () => (
    <div className="settings-detail">
      <div className="settings-detail-header-row">
        <Button 
          type="text" 
          icon={<IconArrowLeft />}
          onClick={() => setActiveCategory(null)}
          className="settings-back-btn"
        >
          返回
        </Button>
      </div>
      <Title heading={2} className="settings-detail-title">数据设置</Title>
      
      <div className="settings-section">
        <div className="settings-data-card">
          <div className="settings-data-info">
            <div 
              className="settings-data-icon"
              style={{ background: '#206CCF15', color: '#206CCF' }}
            >
              <IconSafe style={{ fontSize: 24 }} />
            </div>
            <div>
              <Text bold style={{ fontSize: 15 }}>创建备份</Text>
              <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
                立即备份所有数据到本地文件
              </Paragraph>
            </div>
          </div>
          <Button type="primary" shape="round">
            立即备份
          </Button>
        </div>

        <div className="settings-data-card">
          <div className="settings-data-info">
            <div 
              className="settings-data-icon"
              style={{ background: '#00B42A15', color: '#00B42A' }}
            >
              <IconStorage style={{ fontSize: 24 }} />
            </div>
            <div>
              <Text bold style={{ fontSize: 15 }}>导出数据</Text>
              <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
                导出为 JSON 或 Markdown 文件
              </Paragraph>
            </div>
          </div>
          <Button shape="round">
            导出数据
          </Button>
        </div>

        <div className="settings-data-card danger">
          <div className="settings-data-info">
            <div 
              className="settings-data-icon"
              style={{ background: '#F53F3F15', color: '#F53F3F' }}
            >
              <IconDelete style={{ fontSize: 24 }} />
            </div>
            <div>
              <Text bold style={{ fontSize: 15, color: '#F53F3F' }}>重置所有数据</Text>
              <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
                永久删除所有数据，不可恢复
              </Paragraph>
            </div>
          </div>
          <Button status="danger" shape="round">
            重置
          </Button>
        </div>
      </div>

      <div className="settings-tip">
        <IconSafe style={{ color: '#00B42A' }} />
        <Text type="secondary" style={{ fontSize: 13 }}>
          建议定期备份数据，以防止意外丢失
        </Text>
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      {activeCategory === null && <MainView />}
      {activeCategory === 'appearance' && <AppearanceView />}
      {activeCategory === 'general' && <GeneralView />}
      {activeCategory === 'chat' && <ChatView />}
      {activeCategory === 'mcp' && <McpView />}
      {activeCategory === 'shortcuts' && <ShortcutsView />}
      {activeCategory === 'data' && <DataView />}

      {/* 添加 Provider 弹窗 */}
      <Modal
        title="添加 Provider"
        visible={addModalVisible}
        onOk={addProvider}
        onCancel={() => { setAddModalVisible(false); addForm.resetFields(); }}
        autoFocus={false}
        focusLock
      >
        <Form form={addForm} layout="vertical">
          <FormItem label={<Title heading={6} style={{ margin: 0 }}>类型</Title>} field="type" initialValue="openai">
            <Select value={newProviderType} onChange={setNewProviderType}>
              {Object.entries(PROVIDER_PRESETS).map(([key, preset]) => (
                <Option key={key} value={key}>{preset.name}</Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label={<Title heading={6} style={{ margin: 0 }}>名称</Title>} field="name">
            <Input placeholder={PROVIDER_PRESETS[newProviderType]?.name} />
          </FormItem>
          <FormItem label={<Title heading={6} style={{ margin: 0 }}>API Key</Title>} field="apiKey">
            <Input.Password placeholder="输入 API Key" />
          </FormItem>
          <FormItem label={<Title heading={6} style={{ margin: 0 }}>Base URL</Title>} field="baseUrl">
            <Input placeholder={PROVIDER_PRESETS[newProviderType]?.baseUrl} />
          </FormItem>
        </Form>
      </Modal>

      {/* 添加/编辑模型弹窗 */}
      <Modal
        title={editingModel ? '编辑模型' : '添加模型'}
        visible={modelModalVisible}
        onOk={saveModel}
        onCancel={() => { setModelModalVisible(false); modelForm.resetFields(); setEditingModel(null); }}
        autoFocus={false}
        focusLock
      >
        <Form form={modelForm} layout="vertical">
          <FormItem label={<Title heading={6} style={{ margin: 0 }}>模型名称</Title>} field="name" rules={[{ required: true }]}>
            <Input placeholder="如：GPT-4o" />
          </FormItem>
          <FormItem label={<Title heading={6} style={{ margin: 0 }}>模型 ID</Title>} field="modelId" rules={[{ required: true }]}>
            <Input placeholder="实际的 API ID，如：gpt-4o" />
          </FormItem>
          <FormItem label={<Title heading={6} style={{ margin: 0 }}>端口选择</Title>} field="port" initialValue={selected?.type || 'openai'}>
            <Select>
              {PORT_OPTIONS.map(opt => (
                <Option key={opt.value} value={opt.value}>{opt.label}</Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label={<Title heading={6} style={{ margin: 0 }}>模型能力</Title>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CAPABILITIES.map(cap => (
                <FormItem 
                  key={cap.key} 
                  field={`cap_${cap.key}`} 
                  style={{ marginBottom: 0 }}
                  triggerPropName="checked"
                >
                  <Checkbox style={{ width: '100%' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <cap.icon style={{ color: 'rgb(32, 108, 207)', fontSize: 16 }} />
                        <Text>{cap.label}</Text>
                      </span>
                    </span>
                  </Checkbox>
                </FormItem>
              ))}
            </div>
          </FormItem>
        </Form>
      </Modal>

      {/* 添加自定义窗景弹窗 */}
      <Modal
        title="添加自定义窗景"
        visible={addSceneryModalVisible}
        onOk={handleAddCustomScenery}
        onCancel={() => { setAddSceneryModalVisible(false); sceneryForm.resetFields(); }}
        autoFocus={false}
        focusLock
      >
        <Form form={sceneryForm} layout="vertical">
          <FormItem 
            label={<Title heading={6} style={{ margin: 0 }}>窗景名称</Title>} 
            field="name" 
            rules={[{ required: true, message: '请输入窗景名称' }]}
          >
            <Input placeholder="如：我的家乡" />
          </FormItem>
          <FormItem 
            label={<Title heading={6} style={{ margin: 0 }}>图片链接</Title>} 
            field="imageUrl" 
            rules={[{ required: true, message: '请输入图片链接' }]}
          >
            <Input placeholder="https://example.com/image.jpg" />
          </FormItem>
          <Paragraph type="secondary" style={{ fontSize: 12, margin: 0 }}>
            支持网络图片链接或本地图片路径
          </Paragraph>
        </Form>
      </Modal>
    </div>
  );
};

export default SettingsPage;
