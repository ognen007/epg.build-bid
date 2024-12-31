import React from 'react';
import { Bell, Menu, ListTodo, Phone } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onTasksClick: () => void;
  showTasksButton: boolean;
}

export function Header({ onMenuClick, onTasksClick, showTasksButton }: HeaderProps) {
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
        <button 
          className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
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