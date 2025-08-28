/**
 * Example: Theme Toggle Component
 *
 * Demonstrates:
 * - Dark/light mode switching
 * - Accessible toggle button
 * - System preference detection
 * - LocalStorage persistence
 * - Smooth transitions
 *
 * Usage:
 * ```
 * <ThemeToggle />
 * ```
 */

import React, { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';

interface ThemeToggleProps {
  defaultTheme?: Theme;
  storageKey?: string;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  defaultTheme,
  storageKey = 'theme-preference',
  className,
}) => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    // Check system preference
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // Fall back to default or light
    return defaultTheme || 'light';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't explicitly set a preference
      if (!localStorage.getItem(storageKey)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storageKey]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      className={`${styles.toggle} ${className || ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === 'dark'}
      title={`Currently ${theme} theme. Click to switch to ${nextTheme} theme.`}
    >
      <span className={styles.icon} aria-hidden="true">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className={styles.label}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

// Alternative implementation with SVG icons
export const ThemeToggleWithSVG: React.FC<ThemeToggleProps> = () => {
  // ... same logic as above ...
  const theme = 'light'; // Placeholder - implement same logic as main component

  return (
    <button className={styles.toggle}>
      <svg
        className={styles.icon}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {theme === 'light' ? (
          // Moon icon
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        ) : (
          // Sun icon
          <>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </>
        )}
      </svg>
    </button>
  );
};

// CSS Module companion file example (ThemeToggle.module.css):
/*
.toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-text);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.toggle:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.toggle:active {
  transform: translateY(0);
}

.icon {
  font-size: 1.2em;
  transition: transform 0.3s ease;
}

.toggle:hover .icon {
  transform: rotate(20deg);
}

.label {
  font-weight: 500;
}

@media (max-width: 640px) {
  .label {
    display: none;
  }
  
  .toggle {
    padding: var(--spacing-sm);
  }
}

// CSS Variables for theming
:root {
  --color-surface: #ffffff;
  --color-surface-hover: #f5f5f5;
  --color-border: #e0e0e0;
  --color-text: #333333;
  --color-primary: #007bff;
}

[data-theme="dark"] {
  --color-surface: #1a1a1a;
  --color-surface-hover: #2a2a2a;
  --color-border: #404040;
  --color-text: #e0e0e0;
  --color-primary: #4dabf7;
}
*/
