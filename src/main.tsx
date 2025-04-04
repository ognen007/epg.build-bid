import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import "@radix-ui/themes/styles.css";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/dev-sw.js?dev-sw.js')
//       .then((registration) => {
//         console.log('Service Worker registered:', registration);

//         // Listen for updates to the service worker
//         registration.onupdatefound = () => {
//           const installingWorker = registration.installing;
//           if (installingWorker) {
//             installingWorker.onstatechange = () => {
//               if (installingWorker.state === 'installed') {
//                 if (navigator.serviceWorker.controller) {
//                   // New content is available, so we reload the page
//                   console.log('New content is available, refreshing...');
//                   window.location.reload();
//                 } else {
//                   console.log('Content is cached for offline use.');
//                 }
//               }
//             };
//           }
//         };
//       })
//       .catch((error) => {
//         console.error('Service Worker registration failed:', error);
//       });
//   });
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
