import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.epg.build',
  appName: 'EPG Pulse',
  webDir: 'dist',
  ios: {
    contentInset: "always",
    backgroundColor: "#ffffff"
  },
};

export default config;
