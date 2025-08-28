/**
 * Initialize Google Analytics 4 with privacy-first approach
 */

interface GtagConfigCommand {
  (
    command: 'config' | 'event' | 'set',
    targetId: string,
    config?: Record<string, unknown>
  ): void;
}

interface GtagJsCommand {
  (command: 'js', date: Date): void;
}

type GtagFunction = GtagConfigCommand & GtagJsCommand;

declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

export const initializeAnalytics = (): void => {
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  const SHOW_ANALYTICS = import.meta.env.VITE_SHOW_ANALYTICS !== 'false';

  // Skip if no measurement ID configured
  if (!GA_MEASUREMENT_ID) {
    console.log('Analytics: No measurement ID configured');
    return;
  }

  // Skip if analytics disabled in settings
  if (!SHOW_ANALYTICS) {
    console.log('Analytics: Disabled via settings');
    return;
  }

  // Respect Do Not Track browser setting
  if (navigator.doNotTrack === '1') {
    console.log('Analytics: Respecting Do Not Track preference');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  // Set timestamp
  window.gtag('js', new Date());

  // Configure GA4 with privacy settings
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    anonymize_ip: true, // IP anonymization for privacy
    cookie_flags: 'SameSite=None;Secure', // Secure cookies
    allow_google_signals: false, // Disable advertising features
    allow_ad_personalization_signals: false, // Disable ad personalization
  });

  // Load GA4 script asynchronously
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

  // Add error handling
  script.onerror = () => {
    console.error('Analytics: Failed to load Google Analytics script');
  };

  script.onload = () => {
    console.log('Analytics: Google Analytics loaded successfully');
  };

  document.head.appendChild(script);
};
