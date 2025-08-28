import React from 'react';
import { useTypewriter } from '../../hooks/useTypewriter';
import styles from './TypewriterText.module.css';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  delay = 0,
  className = '',
  showCursor = true,
  cursorChar = '|',
  onComplete,
}) => {
  const { displayText, isComplete, isTyping } = useTypewriter({
    text,
    speed,
    delay,
  });

  React.useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <span className={`${styles.typewriter} ${className}`}>
      {displayText}
      {showCursor && (isTyping || !isComplete) && (
        <span className={styles.cursor}>{cursorChar}</span>
      )}
    </span>
  );
};
