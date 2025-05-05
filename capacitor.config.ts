import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.epg.build',
  appName: 'EPG Pulse', 
  webDir: 'dist',
  ios: {
    backgroundColor: '#ffffff',
    preferredContentMode: 'recommended'
  }
};

export default config;