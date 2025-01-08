import React, { useState } from 'react';
import { Bell, Menu, ListTodo, Phone } from 'lucide-react';
import { NotificationPopover } from './NotificationPopover';

interface HeaderProps {
  onMenuClick: () => void;
  onTasksClick: () => void;
  showTasksButton: boolean;
  userFullName: string;
}

export function Header({ onMenuClick, onTasksClick, showTasksButton, userFullName }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Announcement',
      message: 'Important update about the platform maintenance.',
      from: 'System Admin',
      timestamp: '2 hours ago',
      read: false
    }
  ]);

  const hasUnreadNotifications = notifications.some(n => !n.read);

  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-3 sm:px-4 md:px-6">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-600 lg:hidden focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative">
          <button 
            className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {hasUnreadNotifications && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>
          
          {showNotifications && (
            <NotificationPopover 
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
            />
          )}
        </div>

        {showTasksButton && (
          <button 
            onClick={onTasksClick}
            className="p-2 text-gray-500 hover:text-gray-600 lg:hidden focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
            aria-label="Tasks"
          >
            <ListTodo className="h-5 w-5" />
          </button>
        )}
        
        <button className="hidden md:flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
          <Phone className="h-4 w-4 mr-2" />
          <span>Contact Us</span>
        </button>
      </div>
    </header>
  );
}