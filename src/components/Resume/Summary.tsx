import React from 'react';
import styles from './Summary.module.css';

interface SummaryProps {
  summary: string;
}

export const Summary: React.FC<SummaryProps> = ({ summary }) => {
  return (
    <section id="summary" className={styles.summary}>
      <h2 className={styles.sectionTitle}>Professional Summary</h2>
      <div className={styles.summaryContent}>
        <p className={styles.summaryText}>{summary}</p>
      </div>
    </section>
  );
};
