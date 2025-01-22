import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update the service worker
      manifest: {
        name: 'EPG.build Bid',
        short_name: 'EPG Bid',
        description: 'EPGs Bidding app',
        theme_color: '#ffffff',
        background_color: '#ffffff', // Add background color
        start_url: '/', // Add start URL
        display: 'standalone', // Ensure standalone display mode
        icons: [
          {
            src: '/src/assets/android-chrome-192x192.png', // Path to icon in src/assets
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/src/assets/android-chrome-512x512.png', // Path to icon in src/assets
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Enable offline support
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/, // Cache API requests
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
            },
          },
        ],
      },
    }),
  ],
});