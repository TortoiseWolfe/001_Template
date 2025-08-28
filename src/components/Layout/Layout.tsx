import React from 'react';
import { ThemeToggle } from '../UI/ThemeToggle';
import { PDFDownloadButton } from '../UI/PDFDownloadButton';
import { SectionNavigation } from '../UI/SectionNavigation';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const buildDate = import.meta.env.VITE_BUILD_DATE
    ? new Date(import.meta.env.VITE_BUILD_DATE)
    : new Date();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.controls}>
            <ThemeToggle />
            <PDFDownloadButton />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container" data-resume-content>
          {children}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p className="text-small text-secondary">
            © {new Date().getFullYear()} TurtleWolfe. Built with React &
            TypeScript.
            {' • '}
            Last updated:{' '}
            {buildDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </footer>

      <SectionNavigation />
    </div>
  );
};
