/**
 * Register service worker for PWA functionality
 */
export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      // Only register in production
      if (import.meta.env.PROD) {
        const registration = await navigator.serviceWorker.register(
          '/Resume/service-worker.js',
          {
            scope: '/Resume/',
          }
        );

        console.log('Service Worker registered successfully:', registration);

        // Check for updates periodically
        setInterval(
          () => {
            registration.update();
          },
          1000 * 60 * 60
        ); // Check every hour

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // New content available, could show a notification
                console.log('New content available! Refresh to update.');
              }
            });
          }
        });
      } else {
        console.log('Service Worker not registered in development mode');
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  } else {
    console.log('Service Workers not supported');
  }
};
