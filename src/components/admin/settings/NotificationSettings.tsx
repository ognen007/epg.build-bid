import React, { useState } from 'react';
import { Bell, Save } from 'lucide-react';

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    systemAlerts: true,
    userSignups: true,
    projectUpdates: true,
    disputeAlerts: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle notification settings update
    console.log('Updated notification settings:', settings);
  };

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                id={key}
                checked={value}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor={key} className="ml-2 block text-sm text-gray-700">
                {key.split(/(?=[A-Z])/).join(' ')}
              </label>
            </div>
          ))}
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