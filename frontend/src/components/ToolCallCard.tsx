import React, { useState } from 'react';
import { Collapse, Tag, Button, Spin, Descriptions } from '@arco-design/web-react';
import { IconRight, IconDown, IconTool, IconCheck, IconClose, IconLoading } from '@arco-design/web-react/icon';
import './ToolCallCard.css';

const CollapseItem = Collapse.Item;

export type ToolCallStatus = 'pending' | 'executing' | 'success' | 'failed';

export interface ToolCallCardProps {
  /** 工具名称 */
  toolName: string;
  /** 工具图标 */
  icon?: React.ReactNode;
  /** 执行状态 */
  status: ToolCallStatus;
  /** 工具参数 */
  params?: Record<string, any>;
  /** 执行结果 */
  result?: any;
  /** 错误信息 */
  error?: string;
  /** 批准回调 */
  onApprove?: () => void;
  /** 拒绝回调 */
  onReject?: () => void;
  /** 默认是否展开 */
  defaultExpanded?: boolean;
}

/**
 * 工具调用卡片组件
 * 
 * 显示工具调用的状态、参数和结果
 * - pending: 黄色边框/背景，显示"待审批"标签，有批准/拒绝按钮
 * - executing: 蓝色边框/背景，显示加载动画，"执行中..."
 * - success: 绿色边框/背景，显示"执行成功"标签和结果
 * - failed: 红色边框/背景，显示"执行失败"标签和错误信息
 * - 支持自动折叠功能（点击标题展开/折叠详情）
 */
export const ToolCallCard: React.FC<ToolCallCardProps> = ({
  toolName,
  icon,
  status,
  params,
  result,
  error,
  onApprove,
  onReject,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // 状态配置
  const statusConfig = {
    pending: {
      label: '待审批',
      color: 'orange',
      className: 'tool-call-pending',
      icon: <IconTool />,
    },
    executing: {
      label: '执行中',
      color: 'blue',
      className: 'tool-call-executing',
      icon: <IconLoading className="tool-call-spin" />,
    },
    success: {
      label: '执行成功',
      color: 'green',
      className: 'tool-call-success',
      icon: <IconCheck />,
    },
    failed: {
      label: '执行失败',
      color: 'red',
      className: 'tool-call-failed',
      icon: <IconClose />,
    },
  };

  const config = statusConfig[status];

  // 格式化 JSON 数据
  const formatJSON = (data: any): string => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  // 渲染参数
  const renderParams = () => {
    if (!params || Object.keys(params).length === 0) {
      return <div className="tool-call-empty">无参数</div>;
    }

    const data = Object.entries(params).map(([key, value]) => ({
      label: key,
      value: typeof value === 'object' ? JSON.stringify(value) : String(value),
    }));

    return (
      <Descriptions
        data={data}
        layout="inline-vertical"
        column={1}
        size="small"
        className="tool-call-params"
      />
    );
  };

  // 渲染结果
  const renderResult = () => {
    if (status === 'failed') {
      return (
        <div className="tool-call-error">
          <div className="tool-call-error-message">
            {error || '未知错误'}
          </div>
        </div>
      );
    }

    if (result === undefined || result === null) {
      return <div className="tool-call-empty">暂无结果</div>;
    }

    return (
      <pre className="tool-call-result">
        <code>{formatJSON(result)}</code>
      </pre>
    );
  };

  return (
    <div className={`tool-call-card ${config.className}`}>
      <Collapse
        bordered={false}
        activeKey={isExpanded ? ['1'] : []}
        onChange={(keys) => setIsExpanded(keys.includes('1'))}
        className="tool-call-collapse"
      >
        <CollapseItem
          name="1"
          header={(
            <div className="tool-call-header">
              <div className="tool-call-title-wrapper">
                <span className="tool-call-icon">{icon || config.icon}</span>
                <span className="tool-call-name">调用：{toolName}</span>
                <Tag 
                  color={config.color} 
                  size="small"
                  className="tool-call-status-tag"
                >
                  {status === 'executing' ? (
                    <span className="tool-call-status-with-spin">
                      <Spin size={12} />
                      {config.label}
                    </span>
                  ) : (
                    config.label
                  )}
                </Tag>
              </div>
              {status === 'pending' && (
                <div className="tool-call-actions" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    type="primary" 
                    size="mini"
                    status="success"
                    onClick={onApprove}
                    className="tool-call-btn"
                  >
                    批准
                  </Button>
                  <Button 
                    type="secondary" 
                    size="mini"
                    status="danger"
                    onClick={onReject}
                    className="tool-call-btn"
                  >
                    拒绝
                  </Button>
                </div>
              )}
            </div>
          )}
          expandIcon={
            <div className="tool-call-expand-icon">
              {isExpanded ? <IconDown /> : <IconRight />}
            </div>
          }
          className="tool-call-collapse-item"
        >
          <div className="tool-call-content">
            <div className="tool-call-section">
              <div className="tool-call-section-title">参数</div>
              <div className="tool-call-section-body">
                {renderParams()}
              </div>
            </div>
            {(status === 'success' || status === 'failed') && (
              <div className="tool-call-section">
                <div className="tool-call-section-title">
                  {status === 'failed' ? '错误信息' : '执行结果'}
                </div>
                <div className="tool-call-section-body">
                  {renderResult()}
                </div>
              </div>
            )}
          </div>
        </CollapseItem>
      </Collapse>
    </div>
  );
};

export default ToolCallCard;
