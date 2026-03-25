/**
 * 窗景背景管理 Hook
 * 统一管理各页面的窗景背景设置
 */
import { useState, useEffect, useCallback } from 'react';

export type PageType = 'start' | 'notes' | 'scroll' | 'files' | 'extensions' | 'charts';

export interface PageSceneryConfig {
  enabled: boolean;
  image: string;
  name: string;
}

export interface StartPageSceneryConfig {
  enabled: boolean;
  collection: string[];
  currentIndex: number;
}

export interface SceneryItem {
  id: string;
  name: string;
  image: string;
}

const DEFAULT_SCENERY: SceneryItem = {
  id: 'default',
  name: '默认窗景',
  image: '/scenery/image.png',
};

// 本地存储键
const STORAGE_KEY = 'papyrus_scenery_settings';
const CUSTOM_SCENERIES_KEY = 'papyrus_custom_sceneries';

// 默认设置
const defaultPageSceneries: Record<PageType, PageSceneryConfig> = {
  start: { enabled: true, image: '/scenery/image.png', name: '默认窗景' },
  notes: { enabled: false, image: '/scenery/image.png', name: '默认窗景' },
  scroll: { enabled: false, image: '/scenery/image.png', name: '默认窗景' },
  files: { enabled: false, image: '/scenery/image.png', name: '默认窗景' },
  extensions: { enabled: false, image: '/scenery/image.png', name: '默认窗景' },
  charts: { enabled: false, image: '/scenery/image.png', name: '默认窗景' },
};

const defaultStartPageScenery: StartPageSceneryConfig = {
  enabled: true,
  collection: ['/scenery/image.png'],
  currentIndex: 0,
};

// 加载设置
const loadSettings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        pageSceneries: { ...defaultPageSceneries, ...parsed.pageSceneries },
        startPageScenery: { ...defaultStartPageScenery, ...parsed.startPageScenery },
      };
    }
  } catch {
    // ignore
  }
  return {
    pageSceneries: defaultPageSceneries,
    startPageScenery: defaultStartPageScenery,
  };
};

// 保存设置
const saveSettings = (pageSceneries: Record<PageType, PageSceneryConfig>, startPageScenery: StartPageSceneryConfig) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ pageSceneries, startPageScenery }));
  } catch {
    // ignore
  }
};

// 加载自定义窗景库
const loadCustomSceneries = (): SceneryItem[] => {
  try {
    const saved = localStorage.getItem(CUSTOM_SCENERIES_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return [];
};

// 保存自定义窗景库
const saveCustomSceneries = (sceneries: SceneryItem[]) => {
  try {
    localStorage.setItem(CUSTOM_SCENERIES_KEY, JSON.stringify(sceneries));
  } catch {
    // ignore
  }
};

// 获取所有可用窗景
export const getAllSceneries = (): SceneryItem[] => {
  return [DEFAULT_SCENERY, ...loadCustomSceneries()];
};

// Hook: 单页面窗景
export const usePageScenery = (page: PageType) => {
  const [config, setConfig] = useState<PageSceneryConfig>(defaultPageSceneries[page]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { pageSceneries } = loadSettings();
    if (pageSceneries[page]) {
      setConfig(pageSceneries[page]);
    }
    setLoaded(true);
  }, [page]);

  const updateConfig = useCallback((updates: Partial<PageSceneryConfig>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates };
      const { pageSceneries, startPageScenery } = loadSettings();
      pageSceneries[page] = newConfig;
      saveSettings(pageSceneries, startPageScenery);
      return newConfig;
    });
  }, [page]);

  return { config, updateConfig, loaded };
};

// Hook: 开始页面窗景（合集）
export const useStartPageScenery = () => {
  const [config, setConfig] = useState<StartPageSceneryConfig>(defaultStartPageScenery);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { startPageScenery } = loadSettings();
    setConfig(startPageScenery);
    setLoaded(true);
  }, []);

  const updateConfig = useCallback((updates: Partial<StartPageSceneryConfig>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates };
      const { pageSceneries } = loadSettings();
      saveSettings(pageSceneries, newConfig);
      return newConfig;
    });
  }, []);

  const toggleImage = useCallback((image: string) => {
    setConfig(prev => {
      const isSelected = prev.collection.includes(image);
      let newCollection: string[];
      if (isSelected) {
        // 取消选择（至少保留一张）
        if (prev.collection.length > 1) {
          newCollection = prev.collection.filter(img => img !== image);
        } else {
          return prev;
        }
      } else {
        newCollection = [...prev.collection, image];
      }
      const newConfig = { ...prev, collection: newCollection };
      const { pageSceneries } = loadSettings();
      saveSettings(pageSceneries, newConfig);
      return newConfig;
    });
  }, []);

  // 获取当前轮播的图片
  const getCurrentImage = useCallback(() => {
    if (!config.enabled || config.collection.length === 0) {
      return null;
    }
    return config.collection[config.currentIndex % config.collection.length];
  }, [config]);

  return { config, updateConfig, toggleImage, getCurrentImage, loaded };
};

// Hook: 全局窗景管理
export const useSceneryManager = () => {
  const [customSceneries, setCustomSceneries] = useState<SceneryItem[]>([]);

  useEffect(() => {
    setCustomSceneries(loadCustomSceneries());
  }, []);

  const addCustomScenery = useCallback((name: string, image: string) => {
    const newScenery: SceneryItem = {
      id: Date.now().toString(),
      name: name || '自定义窗景',
      image,
    };
    const updated = [...customSceneries, newScenery];
    setCustomSceneries(updated);
    saveCustomSceneries(updated);
    return newScenery;
  }, [customSceneries]);

  const deleteCustomScenery = useCallback((id: string) => {
    const updated = customSceneries.filter(s => s.id !== id);
    setCustomSceneries(updated);
    saveCustomSceneries(updated);
  }, [customSceneries]);

  const allSceneries = [DEFAULT_SCENERY, ...customSceneries];

  return {
    customSceneries,
    allSceneries,
    addCustomScenery,
    deleteCustomScenery,
  };
};
