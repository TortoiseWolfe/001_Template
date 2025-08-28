import { useState, useEffect } from 'react';
import styles from './ScheduleButton.module.css';
import { trackScheduleClick } from '../utils/analytics';

interface ScheduleButtonProps {
  calendlyUrl?: string;
  googleCalendarUrl?: string;
  variant?: 'floating' | 'header' | 'inline';
  className?: string;
}

const ScheduleButton: React.FC<ScheduleButtonProps> = ({
  calendlyUrl,
  googleCalendarUrl,
  variant = 'floating',
  className = '',
}) => {
  const [isAttentionMode, setIsAttentionMode] = useState(false);

  // Smart triggers for attention mode
  useEffect(() => {
    if (variant !== 'floating') return;

    // Trigger after 30 seconds on page
    const timeoutId = setTimeout(() => {
      setIsAttentionMode(true);
      // Turn off attention mode after 10 seconds
      setTimeout(() => setIsAttentionMode(false), 10000);
    }, 30000);

    // Trigger on scroll depth (50%)
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercentage > 50 && !isAttentionMode) {
        setIsAttentionMode(true);
        setTimeout(() => setIsAttentionMode(false), 10000);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [variant, isAttentionMode]);

  // Don't render if no URL is configured
  if (!calendlyUrl && !googleCalendarUrl) {
    return null;
  }

  const handleClick = () => {
    // Track the conversion event
    trackScheduleClick(variant);

    // Open scheduling link
    const url = calendlyUrl || googleCalendarUrl;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn(
        'No scheduling URL configured. Set VITE_CALENDLY_URL or VITE_GOOGLE_CALENDAR_URL in your .env file'
      );
    }
  };

  const buttonClass = `${styles.scheduleButton} ${styles[variant]} ${
    isAttentionMode ? styles.attentionMode : ''
  } ${className}`;

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      aria-label="Schedule an interview"
      title="Schedule an interview"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      {variant === 'floating' ? (
        <span className={styles.text}>Book Interview Now!</span>
      ) : (
        <span className={styles.text}>Schedule Interview</span>
      )}
    </button>
  );
};

export default ScheduleButton;
