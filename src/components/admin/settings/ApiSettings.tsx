import React, { useState } from 'react';
import { Key, RefreshCw, Copy, Save } from 'lucide-react';

export function ApiSettings() {
  const [settings, setSettings] = useState({
    apiKey: 'sk_test_123456789',
    webhookUrl: 'https://api.example.com/webhook',
    rateLimit: 100,
    enableLogging: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle API settings update
    console.log('Updated API settings:', settings);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleRegenerateKey = () => {
    // Handle API key regeneration
    console.log('Regenerating API key...');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Key className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-900">API Settings</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">API Key</label>
          <div className="mt-1 flex rounded-lg shadow-sm">
            <input
              type="text"
              readOnly
              value={settings.apiKey}
              className="flex-1 rounded-l-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            <button
              type="button"
              onClick={() => handleCopy(settings.apiKey)}
              className="px-4 py-2 bg-gray-50 text-gray-700 hover:text-gray-900 border border-l-0 border-gray-300"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleRegenerateKey}
              className="px-4 py-2 bg-gray-50 text-gray-700 hover:text-gray-900 border border-l-0 border-gray-300 rounded-r-lg"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
          <input
            type="url"
            value={settings.webhookUrl}
            onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rate Limit (requests/minute)</label>
          <input
            type="number"
            value={settings.rateLimit}
            onChange={(e) => setSettings({ ...settings, rateLimit: Number(e.target.value) })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="enableLogging"
            checked={settings.enableLogging}
            onChange={(e) => setSettings({ ...settings, enableLogging: e.target.checked })}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="enableLogging" className="ml-2 block text-sm text-gray-700">
            Enable API Logging
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}