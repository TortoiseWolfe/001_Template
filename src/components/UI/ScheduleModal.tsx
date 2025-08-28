import { useEffect } from 'react';
import ScheduleButton from '../ScheduleButton';
import styles from './ScheduleModal.module.css';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendlyUrl?: string;
  googleCalendarUrl?: string;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  calendlyUrl,
  googleCalendarUrl,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="schedule-modal-title"
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.successIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <h2 id="schedule-modal-title" className={styles.title}>
            🎉 Thank You for Reaching Out!
          </h2>

          <p className={styles.subtitle}>
            Want to speed things up? Skip the email back-and-forth and book a
            call directly!
          </p>

          <div className={styles.benefits}>
            <div className={styles.benefit}>
              ⚡ <span>Instant scheduling</span>
            </div>
            <div className={styles.benefit}>
              📅 <span>Pick your preferred time</span>
            </div>
            <div className={styles.benefit}>
              🎯 <span>Get answers immediately</span>
            </div>
          </div>

          <div className={styles.ctaWrapper}>
            <ScheduleButton
              calendlyUrl={calendlyUrl}
              googleCalendarUrl={googleCalendarUrl}
              variant="inline"
              className={styles.ctaButton}
            />
          </div>

          <button className={styles.skipButton} onClick={onClose}>
            I'll wait for your email response
          </button>
        </div>
      </div>
    </div>
  );
};
