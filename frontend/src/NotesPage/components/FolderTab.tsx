import { IconFolder } from '@arco-design/web-react/icon';
import { PRIMARY_COLOR } from '../constants';

interface FolderTabProps {
  folder: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

export const FolderTab = ({ folder, count, isActive, onClick }: FolderTabProps) => (
  <div
    onClick={onClick}
    style={{
      padding: '10px 16px',
      borderRadius: '10px',
      cursor: 'pointer',
      background: isActive ? `${PRIMARY_COLOR}15` : 'transparent',
      border: `1px solid ${isActive ? PRIMARY_COLOR : 'transparent'}`,
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: '100px',
      maxWidth: '140px',
      justifyContent: 'flex-start',
      height: '52px',
      boxSizing: 'border-box' as const,
      flexShrink: 0,
    }}
  >
    <IconFolder style={{ 
      fontSize: '16px', 
      color: isActive ? PRIMARY_COLOR : 'var(--color-text-3)',
      flexShrink: 0,
    }} />
    <div style={{ 
      textAlign: 'left', 
      overflow: 'hidden',
      minWidth: 0,
    }}>
      <div style={{ 
        fontSize: '14px', 
        fontWeight: isActive ? 500 : 400,
        color: isActive ? PRIMARY_COLOR : 'var(--color-text-1)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {folder}
      </div>
      <div style={{ 
        fontSize: '11px', 
        color: 'var(--color-text-3)', 
        marginTop: '4px',
        whiteSpace: 'nowrap',
      }}>
        {count} 篇
      </div>
    </div>
  </div>
);
