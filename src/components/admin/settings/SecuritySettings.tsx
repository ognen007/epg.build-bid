import React, { useState } from 'react';
import { Shield, Save } from 'lucide-react';

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    loginAttempts: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle security settings update
    console.log('Updated security settings:', settings);
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Expiry (days)</label>
            <input
              type="number"
              value={settings.passwordExpiry}
              onChange={(e) => setSettings({ ...settings, passwordExpiry: Number(e.target.value) })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({ ...settings, sessionTimeout: Number(e.target.value) })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Max Login Attempts</label>
            <input
              type="number"
              value={settings.loginAttempts}
              onChange={(e) => setSettings({ ...settings, loginAttempts: Number(e.target.value) })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="twoFactorAuth"
            checked={settings.twoFactorAuth}
            onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700">
            Require Two-Factor Authentication
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