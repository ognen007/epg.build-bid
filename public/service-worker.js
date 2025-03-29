// Cache assets for offline functionality
const CACHE_NAME = 'my-pwa-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icon.png',
];

// Install event: Cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch event: Serve cached assets or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Push event: Handle incoming push notifications
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'Default Title';
  const options = {
    body: data.body || 'No content',
    icon: '/icon.png', // Path to your app's icon
    badge: '/badge.png', // Small icon for notifications
  };

  // Show the notification
  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click event: Handle when the user clicks the notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification

  // Open the app or a specific URL
  event.waitUntil(
    clients.openWindow('https://app.epg.build/') // Replace with your app's URL
  );
});