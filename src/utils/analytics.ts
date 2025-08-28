// Google Analytics 4 utilities
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

/**
 * Check if analytics should be enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  // Respect Do Not Track browser setting
  if (navigator.doNotTrack === '1') {
    return false;
  }

  // Check if gtag is loaded
  return typeof window.gtag === 'function';
};

/**
 * Track custom events to GA4
 */
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
): void => {
  if (!isAnalyticsEnabled()) {
    console.log('Analytics disabled or not loaded');
    return;
  }

  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

  try {
    window.gtag!('event', eventName, {
      ...parameters,
      send_to: GA_MEASUREMENT_ID,
    });

    console.log(`GA4 Event: ${eventName}`, parameters);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * Track PDF download events
 */
export const trackDownload = (format: 'pdf' | 'docx' = 'pdf'): void => {
  trackEvent('resume_download', {
    event_category: 'engagement',
    event_label: format,
    value: 1,
  });
};

/**
 * Track theme toggle events
 */
export const trackThemeToggle = (theme: 'light' | 'dark'): void => {
  trackEvent('theme_toggle', {
    event_category: 'user_preference',
    event_label: theme,
    theme_selected: theme,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (linkType: string, url: string): void => {
  trackEvent('external_link_click', {
    event_category: 'engagement',
    event_label: linkType,
    link_url: url,
    link_domain: new URL(url).hostname,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number): void => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    percent_scrolled: percentage,
  });
};

/**
 * Track Schedule Interview button clicks
 */
export const trackScheduleClick = (
  variant: 'floating' | 'header' | 'inline'
): void => {
  trackEvent('schedule_interview_click', {
    event_category: 'conversion',
    event_label: variant,
    value: 1,
    conversion_type: 'schedule',
  });
};

/**
 * Track contact form interactions
 */
export const trackFormInteraction = (
  action: 'view' | 'submit' | 'error'
): void => {
  trackEvent(`contact_form_${action}`, {
    event_category: action === 'submit' ? 'conversion' : 'engagement',
    event_label: action,
    value: action === 'submit' ? 1 : 0,
  });
};

/**
 * Parse and store UTM parameters
 */
interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export const parseUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  // Store in session if present
  if (Object.keys(utmParams).length > 0) {
    try {
      sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
    } catch (error) {
      console.error('Failed to store UTM params:', error);
    }
  }

  return utmParams;
};

/**
 * Track page view with UTM parameters
 */
export const trackPageViewWithUTM = (): void => {
  const utmParams = parseUTMParams();

  trackEvent('page_view_with_utm', {
    event_category: 'navigation',
    ...utmParams,
  });
};

/**
 * Track conversion funnel step
 */
export const trackFunnelStep = (step: string, stepNumber: number): void => {
  trackEvent('funnel_step', {
    event_category: 'conversion',
    event_label: step,
    funnel_step: stepNumber,
    value: stepNumber,
  });
};
