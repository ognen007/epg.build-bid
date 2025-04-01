import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';
import "@radix-ui/themes/styles.css";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDZySvF0SYvE4BdU57Of4P1_ekfOCnGvio",
  authDomain: "epgghl.firebaseapp.com",
  projectId: "epgghl",
  storageBucket: "epgghl.appspot.com",
  messagingSenderId: "1027773975545",
  appId: "1:1027773975545:web:721e84a865e1d24874cb28",
  measurementId: "G-V6N9RPV8S5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js") // Ensure this matches the name of your service worker file
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);

      // Retrieve FCM token
      return getToken(messaging, {
        vapidKey: "BKs6fImd8pb2-bkztLR99893-3GHacanTpWkm9M0G7L-7bwYR9juPZ63olumvdiI-52sOA55iY-CORlDoVWvTss",
        serviceWorkerRegistration: registration, // Pass the service worker registration
      });
    })
    .then((token) => {
      if (token) {
        console.log("FCM Token:", token);
        // Send the token to your backend
      } else {
        console.error("No FCM token available. Check permissions or browser compatibility.");
      }
    })
    .catch((error) => {
      console.error("Error registering service worker or retrieving FCM token:", error);
    });
}

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
