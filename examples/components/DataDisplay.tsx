/**
 * Example: Data Display Component
 * Used by the test examples to demonstrate testing patterns
 */

import React from 'react';

export interface DataItem {
  id: string;
  title: string;
  description: string;
  metadata?: {
    date: string;
    tags: string[];
  };
}

interface DataDisplayProps {
  data?: DataItem[] | null;
  loading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  onItemClick?: (item: DataItem) => void;
  className?: string;
}

export const DataDisplay: React.FC<DataDisplayProps> = ({
  data,
  loading = false,
  error = null,
  emptyMessage = 'No data available',
  onItemClick,
  className = '',
}) => {
  // Handle various states
  if (loading) {
    return (
      <div role="status" aria-live="polite" className={className}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className={className}>
        <h3>Error loading data</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className={className}>{emptyMessage}</div>;
  }

  // Render data
  return (
    <ul role="list" className={className}>
      {data.map((item) => (
        <li key={item.id} role="listitem">
          <article
            onClick={() => onItemClick?.(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onItemClick?.(item);
              }
            }}
            tabIndex={onItemClick ? 0 : undefined}
            role={onItemClick ? 'button' : undefined}
            aria-label={`${item.title} - ${item.description}`}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.metadata && (
              <div>
                {item.metadata.date && (
                  <time dateTime={item.metadata.date}>
                    {new Date(item.metadata.date).toLocaleDateString()}
                  </time>
                )}
                {item.metadata.tags && (
                  <div>
                    {item.metadata.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
};
