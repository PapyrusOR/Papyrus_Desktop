import { useState } from 'react';
import { Typography } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { PRIMARY_COLOR, CARD_HEIGHT } from '../constants';

interface AddCardProps {
  onClick: () => void;
}

export const AddCard = ({ onClick }: AddCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        height: `${CARD_HEIGHT}px`,
        borderRadius: '16px',
        border: `1px dashed ${hovered ? PRIMARY_COLOR : 'var(--color-text-3)'}`,
        background: hovered ? `${PRIMARY_COLOR}08` : 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        cursor: 'pointer',
        transition: 'border-color 0.2s, background 0.2s',
        boxSizing: 'border-box' as const,
      }}
    >
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: hovered ? PRIMARY_COLOR : 'var(--color-fill-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
      }}>
        <IconPlus style={{ 
          fontSize: '24px', 
          color: hovered ? '#fff' : 'var(--color-text-2)' 
        }} />
      </div>
      <Typography.Text 
        type={hovered ? 'primary' : 'secondary'} 
        style={{ fontSize: '14px' }}
      >
        新建笔记
      </Typography.Text>
    </div>
  );
};
