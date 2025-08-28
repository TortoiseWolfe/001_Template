import React from 'react';
import { usePDFDownload } from '../../hooks/usePDFDownload';
import { trackDownload } from '../../utils/analytics';
import styles from './PDFDownloadButton.module.css';

export const PDFDownloadButton: React.FC = () => {
  const { downloadPDF, isGenerating, error } = usePDFDownload();

  const handleDownload = async () => {
    trackDownload('pdf');
    await downloadPDF();
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.downloadButton} ${isGenerating ? styles.generating : ''}`}
        onClick={handleDownload}
        disabled={isGenerating}
        aria-label="Download resume as PDF"
        title="Download resume as PDF"
      >
        <span className={styles.icon}>
          {isGenerating ? (
            // Loading spinner with steampunk gear
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.spinner}
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m4.22-13.22l-4.24 4.24m0 5.96l4.24 4.24M20 12h-6m-6 0H2m13.22 4.22l-4.24-4.24m-5.96 0l-4.24 4.24" />
            </svg>
          ) : (
            // Download icon
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          )}
        </span>
        <span className={styles.text}>
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </span>
      </button>

      {error && (
        <div className={styles.error} role="alert">
          <span className={styles.errorIcon}>⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
