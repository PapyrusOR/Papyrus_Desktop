import { Typography, Spin, Empty } from '@arco-design/web-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api, type Card } from '../api';

interface ReviewItem {
  id: string;
  collectionTitle: string;
  scrollCount: number;
  estimatedMinutes: number;
}

const SECONDARY_COLOR = '#9FD4FD';

const ReviewCard = ({ item }: { item: ReviewItem }) => {
  const [hovered, setHovered] = useState(false);
  const { t } = useTranslation();

  const title = item.id === 'new' ? t('startPage.newCards') : t('startPage.reviewCards');

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '0 0 auto',
        width: '220px',
        height: '100%',
        borderRadius: '16px',
        border: `2px solid ${hovered ? SECONDARY_COLOR : 'var(--color-text-3)'}`,
        background: 'transparent',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          background: '#206CCF',
          color: '#fff',
          borderRadius: '999px',
          padding: '2px 10px',
          fontSize: '12px',
          fontWeight: 600,
          lineHeight: '20px',
        }}>
          {t('startPage.dueCount', { count: item.scrollCount })}
        </div>
        <Typography.Text bold style={{ fontSize: '18px', lineHeight: 1.3 }}>
          {title}
        </Typography.Text>
      </div>

      <Typography.Text type='secondary' style={{ fontSize: '13px' }}>
        {t('startPage.minutes', { count: item.estimatedMinutes })}
      </Typography.Text>
    </div>
  );
};

interface ReviewQueueProps {
  height: number;
}

// 计算待复习队列
function calculateReviewQueue(cards: Card[]): ReviewItem[] {
  const now = Date.now() / 1000;
  const dueCards = cards.filter(c => (c.next_review || 0) <= now);

  if (dueCards.length === 0) {
    return [];
  }

  // 按间隔时间分组
  const newCards = dueCards.filter(c => (c.interval || 0) === 0);
  const reviewCards = dueCards.filter(c => (c.interval || 0) > 0);

  const queue: ReviewItem[] = [];

  if (newCards.length > 0) {
    queue.push({
      id: 'new',
      collectionTitle: '', // translated in render
      scrollCount: newCards.length,
      estimatedMinutes: Math.ceil(newCards.length * 0.5),
    });
  }

  if (reviewCards.length > 0) {
    queue.push({
      id: 'review',
      collectionTitle: '', // translated in render
      scrollCount: reviewCards.length,
      estimatedMinutes: Math.ceil(reviewCards.length * 0.3),
    });
  }

  return queue;
}

const ReviewQueue = ({ height }: ReviewQueueProps) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await api.listCards();
        if (response.success) {
          const queue = calculateReviewQueue(response.cards);
          setItems(queue);
        }
      } catch (err) {
        console.error(t('startPage.fetchDueCardsFailed'), err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();

    const handleCardsChanged = () => {
      fetchCards();
    };
    window.addEventListener('papyrus_cards_changed', handleCardsChanged);
    return () => window.removeEventListener('papyrus_cards_changed', handleCardsChanged);
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        height: `${height}px`,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Spin size={24} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: `${height}px`,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Empty description={t('startPage.noDueCards')} />
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '16px',
      height: `${height}px`,
      overflowX: 'auto',
      overflowY: 'hidden',
      paddingBottom: '4px',
    }}>
      {items.map(r => (
        <ReviewCard key={r.id} item={r} />
      ))}
    </div>
  );
};

export default ReviewQueue;
