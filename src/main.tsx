import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { initializeAnalytics } from './utils/initAnalytics';
import { registerServiceWorker } from './utils/registerServiceWorker';

// Initialize Google Analytics 4 with privacy controls
initializeAnalytics();

// Register service worker for PWA functionality
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
