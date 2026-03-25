/**
 * 窗景背景组件
 * 为页面提供可配置的窗景背景
 */
import { useEffect, useState, type CSSProperties } from 'react';
import { usePageScenery, type PageType } from '../hooks/useScenery';

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
      <div style={{ position: 'relative', zIndex: 1, flex: 1, minHeight: '100%' }}>
        {children}
      </div>
    </div>
  );
};

// 开始页面专用窗景背景 - 已简化为透明包装器
// 开始界面的窗景由 DoneCard 独立管理
interface StartPageSceneryBackgroundProps {
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  id?: string;
}

export const StartPageSceneryBackground = ({ children, style, className, id }: StartPageSceneryBackgroundProps) => {
  // 简化：仅作为容器，不再处理背景窗景
  const containerStyle: CSSProperties = {
    position: 'relative',
    minHeight: '100%',
    ...style,
  };

  return (
    <div id={id} className={className} style={containerStyle}>
      {children}
    </div>
  );
};

// 统一导出
export const SceneryBackground = (props: SceneryBackgroundProps) => {
  return <SinglePageSceneryBackground {...props} />;
};

export default SceneryBackground;
