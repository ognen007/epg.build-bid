import React from 'react';
import { TaskList } from '../tasks/TaskList';
import { MiniCalendar } from '../calendar/MiniCalendar';
import { X } from 'lucide-react';

interface RightSidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

export function RightSidebar({ onClose, isOpen }: RightSidebarProps) {
  return (
    <div 
      className={`
        fixed inset-y-0 right-0 z-30 w-full sm:w-80 bg-white border-l border-gray-200 
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-auto
      `}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Tasks & Calendar</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-600 lg:hidden focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
            aria-label="Close tasks"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <MiniCalendar />
          <TaskList />
        </div>
      </div>
    </div>
  );
}