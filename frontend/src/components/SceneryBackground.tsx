/**
 * 窗景背景组件
 * 为页面提供可配置的窗景背景
 */
import { useEffect, useState, type CSSProperties } from 'react';
import { usePageScenery, useStartPageScenery, type PageType } from '../hooks/useScenery';

interface SceneryBackgroundProps {
  page: PageType;
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

// 单页面窗景背景
const SinglePageSceneryBackground = ({ page, children, style, className }: SceneryBackgroundProps) => {
  const { config, loaded } = usePageScenery(page);
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    if (loaded) {
      if (config.enabled && config.image) {
        setBgImage(config.image);
      } else {
        setBgImage(null);
      }
    }
  }, [config, loaded]);

  const containerStyle: CSSProperties = {
    position: 'relative',
    minHeight: '100%',
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {/* 窗景背景层 */}
      {bgImage && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <img
            src={bgImage}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.15,
            }}
          />
          {/* 遮罩层，提升文字可读性 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, var(--color-bg-1) 0%, transparent 50%, var(--color-bg-1) 100%)',
            }}
          />
        </div>
      )}
      {/* 内容层 */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

// 开始页面专用窗景背景（支持轮播）
interface StartPageSceneryBackgroundProps {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  id?: string;
}

export const StartPageSceneryBackground = ({ children, style, className, id }: StartPageSceneryBackgroundProps) => {
  const { config, getCurrentImage, loaded } = useStartPageScenery();
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (loaded) {
      const image = getCurrentImage();
      setBgImage(image);
      setCurrentIndex(config.currentIndex);
    }
  }, [config, getCurrentImage, loaded]);

  // 自动轮播（每30秒切换）
  useEffect(() => {
    if (!config.enabled || config.collection.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = (prev + 1) % config.collection.length;
        setBgImage(config.collection[nextIndex]);
        return nextIndex;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [config]);

  const containerStyle: CSSProperties = {
    position: 'relative',
    minHeight: '100%',
    ...style,
  };

  return (
    <div id={id} className={className} style={containerStyle}>
      {/* 窗景背景层 */}
      {bgImage && config.enabled && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <img
            key={bgImage}
            src={bgImage}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.2,
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
          {/* 遮罩层 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, var(--color-bg-1) 0%, transparent 40%, var(--color-bg-1) 100%)',
            }}
          />
        </div>
      )}
      {/* 内容层 */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

// 统一导出
export const SceneryBackground = (props: SceneryBackgroundProps) => {
  if (props.page === 'start') {
    return <StartPageSceneryBackground {...props} page={undefined as unknown as PageType} />;
  }
  return <SinglePageSceneryBackground {...props} />;
};

export default SceneryBackground;
