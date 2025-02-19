import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import "@radix-ui/themes/styles.css";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);

        // Listen for updates to the service worker
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available, so we reload the page
                  console.log('New content is available, refreshing...');
                  window.location.reload();
                } else {
                  console.log('Content is cached for offline use.');
                }
              }
            };
          }
        };
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
