import React, { useState } from 'react';
import { Collapse, Tag } from '@arco-design/web-react';
import { IconMindMapping, IconRight, IconDown } from '@arco-design/web-react/icon';
import './ReasoningChain.css';

const CollapseItem = Collapse.Item;

export interface ReasoningChainProps {
  /** 思维链内容 */
  content: string;
  /** 默认是否展开 */
  defaultExpanded?: boolean;
}

/**
 * 思考链组件
 * 
 * 显示AI的思维链过程，支持自动折叠/展开
 * - 折叠时显示预览文本（前50字）
 * - 展开时显示完整内容，支持代码高亮
 * - 使用 Arco Design 的 Collapse 组件
 * - 样式使用 CSS 变量适配深色模式
 */
export const ReasoningChain: React.FC<ReasoningChainProps> = ({
  content,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // 获取预览文本（前50字）
  const getPreviewText = (text: string): string => {
    if (text.length <= 50) return text;
    return text.slice(0, 50) + '...';
  };

  // 渲染内容，支持代码块
  const renderContent = (text: string): React.ReactNode => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // 提取代码块内容和语言
        const match = part.match(/^```(\w+)?\n([\s\S]*?)```$/);
        if (match) {
          const [, language = 'text', code] = match;
          return (
            <div key={index} className="reasoning-code-block">
              {language !== 'text' && (
                <div className="reasoning-code-language">{language}</div>
              )}
              <pre className="reasoning-code-pre">
                <code className={`language-${language}`}>{code.trim()}</code>
              </pre>
            </div>
          );
        }
      }
      // 普通文本，保留换行
      return (
        <span key={index} className="reasoning-text">
          {part.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      );
    });
  };

  return (
    <div className="reasoning-chain">
      <Collapse
        bordered={false}
        activeKey={isExpanded ? ['1'] : []}
        onChange={(keys) => setIsExpanded(keys.includes('1'))}
        className="reasoning-collapse"
      >
        <CollapseItem
          name="1"
          header={(
            <div className="reasoning-header">
              <div className="reasoning-title-wrapper">
                <IconMindMapping className="reasoning-icon" />
                <span className="reasoning-title">思考过程</span>
                <Tag size="small" className="reasoning-tag">
                  {isExpanded ? '已展开' : '已折叠'}
                </Tag>
              </div>
              {!isExpanded && (
                <span className="reasoning-preview">
                  {getPreviewText(content)}
                </span>
              )}
            </div>
          )}
          expandIcon={(
            <div className="reasoning-expand-icon">
              {isExpanded ? <IconDown /> : <IconRight />}
            </div>
          )}
          className="reasoning-collapse-item"
        >
          <div className="reasoning-content">
            {renderContent(content)}
          </div>
        </CollapseItem>
      </Collapse>
    </div>
  );
};

export default ReasoningChain;
