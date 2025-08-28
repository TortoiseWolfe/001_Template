import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // initial delay before starting
  repeat?: boolean;
  repeatDelay?: number;
  onComplete?: () => void; // callback when typing completes
}

interface UseTypewriterReturn {
  displayText: string;
  isComplete: boolean;
  isTyping: boolean;
}

export const useTypewriter = ({
  text,
  speed = 50,
  delay = 0,
  repeat = false,
  repeatDelay = 2000,
  onComplete,
}: UseTypewriterOptions): UseTypewriterReturn => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(text === '');
  const [isTyping, setIsTyping] = useState(false);
  const prevTextRef = useRef(text);

  useEffect(() => {
    // Check if text has changed
    if (prevTextRef.current !== text) {
      prevTextRef.current = text;
      setDisplayText('');
      setCurrentIndex(0);
      setIsComplete(text === '');
      setIsTyping(false);
      return; // Exit early to restart the effect on next render
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // If reduced motion is preferred, show full text immediately
      setDisplayText(text);
      setIsComplete(true);
      setIsTyping(false);
      return;
    }

    // Handle empty text case
    if (text === '') {
      setDisplayText('');
      setIsComplete(true);
      setIsTyping(false);
      if (onComplete) {
        onComplete();
      }
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setIsTyping(true);
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);

        // Check if we just typed the last character
        if (currentIndex + 1 === text.length) {
          setIsComplete(true);
          setIsTyping(false);
          if (onComplete) {
            // Call onComplete in next tick to ensure state is updated
            setTimeout(() => onComplete(), 0);
          }

          if (repeat) {
            timeout = setTimeout(() => {
              setDisplayText('');
              setCurrentIndex(0);
              setIsComplete(false);
            }, repeatDelay);
          }
        }
      }
    };

    if (currentIndex === 0 && delay > 0) {
      timeout = setTimeout(() => {
        typeNextCharacter();
      }, delay);
    } else if (currentIndex < text.length) {
      timeout = setTimeout(typeNextCharacter, speed);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [text, speed, delay, repeat, repeatDelay, currentIndex, onComplete]);

  return { displayText, isComplete, isTyping };
};
