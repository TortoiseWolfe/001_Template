import React, { useEffect, useState } from 'react';
import styles from './SectionNavigation.module.css';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'personal-info', label: 'About', icon: '👤' },
  { id: 'summary', label: 'Summary', icon: '📝' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'skills', label: 'Skills', icon: '🛠️' },
  { id: 'education', label: 'Education', icon: '🎓' },
];

export const SectionNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('personal-info');
  const [isVisible, setIsVisible] = useState(false);

  // Show navigation after initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      const scrollY = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = 80; // Account for fixed header
      const targetPosition = section.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className={styles.navigation} aria-label="Section navigation">
      <ul className={styles.navList}>
        {navigationItems.map((item) => (
          <li key={item.id} className={styles.navItem}>
            <button
              className={`${styles.navButton} ${
                activeSection === item.id ? styles.active : ''
              }`}
              onClick={() => scrollToSection(item.id)}
              aria-label={`Go to ${item.label} section`}
              title={item.label}
            >
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.indicator} />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
