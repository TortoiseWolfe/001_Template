/**
 * Example: Data Display Component
 * 
 * Demonstrates:
 * - TypeScript interfaces for props
 * - Loading and error states
 * - Accessible list rendering
 * - CSS Modules for styling
 * - Responsive design
 * 
 * Usage:
 * ```
 * <DataDisplay 
 *   data={items} 
 *   loading={isLoading}
 *   error={error}
 *   onItemClick={handleClick}
 * />
 * ```
 */

import React from 'react';
import styles from './DataDisplay.module.css';

// Define the shape of your data
interface DataItem {
  id: string;
  title: string;
  description: string;
  metadata?: {
    date?: string;
    tags?: string[];
  };
}

// Component props interface
interface DataDisplayProps {
  data: DataItem[];
  loading?: boolean;
  error?: Error | null;
  onItemClick?: (item: DataItem) => void;
  className?: string;
  emptyMessage?: string;
}

export const DataDisplay: React.FC<DataDisplayProps> = ({
  data,
  loading = false,
  error = null,
  onItemClick,
  className,
  emptyMessage = 'No data available'
}) => {
  // Handle loading state
  if (loading) {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <span className={styles.loadingText}>Loading...</span>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={styles.error} role="alert">
        <h3>Error loading data</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  // Handle empty state
  if (!data || data.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  // Render data
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <ul className={styles.list} role="list">
        {data.map((item) => (
          <li key={item.id} className={styles.item}>
            <article
              className={styles.card}
              onClick={() => onItemClick?.(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onItemClick?.(item);
                }
              }}
              tabIndex={onItemClick ? 0 : undefined}
              role={onItemClick ? 'button' : undefined}
              aria-label={`${item.title}. ${item.description}`}
            >
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              
              {item.metadata && (
                <div className={styles.metadata}>
                  {item.metadata.date && (
                    <time dateTime={item.metadata.date}>
                      {new Date(item.metadata.date).toLocaleDateString()}
                    </time>
                  )}
                  {item.metadata.tags && (
                    <div className={styles.tags}>
                      {item.metadata.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

// CSS Module companion file example (DataDisplay.module.css):
/*
.container {
  padding: var(--spacing-md);
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--spacing-md);
}

.item {
  animation: fadeIn 0.3s ease-in-out;
}

.card {
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--border-radius);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.card:hover,
.card:focus {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .item,
  .spinner {
    animation: none;
    transition: none;
  }
}

@media (max-width: 768px) {
  .container {
    padding: var(--spacing-sm);
  }
  
  .card {
    padding: var(--spacing-md);
  }
}
*/