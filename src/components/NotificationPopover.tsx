import React from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  from: string;
  timestamp: string;
  read: boolean;
}

interface NotificationPopoverProps {
  notifications: Notification[];
  onNotificationClick: (id: string) => void;
}

export function NotificationPopover({ notifications, onNotificationClick }: NotificationPopoverProps) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
        <div className="mt-2 divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <p className="py-4 text-sm text-gray-500 text-center">No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => onNotificationClick(notification.id)}
                className={`
                  py-4 cursor-pointer transition-colors
                  ${notification.read ? 'bg-white' : 'bg-orange-50'}
                `}
              >
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <span className="text-xs text-gray-500">{notification.timestamp}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-400">From: {notification.from}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}