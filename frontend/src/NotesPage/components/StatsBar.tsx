import { Typography } from '@arco-design/web-react';
import { PRIMARY_COLOR } from '../constants';

interface StatsBarProps {
  noteCount: number;
  totalWords: number;
  todayNotes: number;
  tagCount: number;
}

export const StatsBar = ({ noteCount, totalWords, todayNotes, tagCount }: StatsBarProps) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    marginBottom: '24px',
    borderRadius: '12px',
    border: '1px solid var(--color-text-3)',
    background: 'var(--color-bg-1)',
  }}>
    <div style={{ display: 'flex', gap: '48px' }}>
      <StatItem value={noteCount} label="笔记数" highlight />
      <StatItem value={`${(totalWords / 1000).toFixed(1)}k`} label="总字数" />
      <StatItem value={todayNotes} label="今日更新" />
      <StatItem value={tagCount} label="标签" />
    </div>
  </div>
);

interface StatItemProps {
  value: string | number;
  label: string;
  highlight?: boolean;
}

const StatItem = ({ value, label, highlight }: StatItemProps) => (
  <div style={{ textAlign: 'center' }}>
    <Typography.Text style={{ 
      fontSize: '24px', 
      fontWeight: 600, 
      color: highlight ? PRIMARY_COLOR : 'var(--color-text-1)' 
    }}>
      {value}
    </Typography.Text>
    <Typography.Text 
      type='secondary' 
      style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}
    >
      {label}
    </Typography.Text>
  </div>
);
