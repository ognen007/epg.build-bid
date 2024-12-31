import React from 'react';
import { Building2, X } from 'lucide-react';
import { Navigation } from './navigation/Navigation';
import { AdminNavigation } from './admin/navigation/AdminNavigation';

interface SidebarProps {
  onClose: () => void;
  userRole: 'admin' | 'client' | 'contractor';
}

export function Sidebar({ onClose, userRole }: SidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:w-64">
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-orange-500" />
            <div className="font-bold text-gray-900 text-lg">EMINENCE</div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-600 lg:hidden focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {userRole === 'admin' ? (
            <AdminNavigation />
          ) : (
            <Navigation userRole={userRole} />
          )}
        </div>
      </div>
    </div>
  );
}