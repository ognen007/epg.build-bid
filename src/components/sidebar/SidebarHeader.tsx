import React from 'react';
import { Building2, X } from 'lucide-react';

interface SidebarHeaderProps {
  onClose: () => void;
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
  return (
    <div className="p-6 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <Building2 className="h-8 w-8 text-orange-500" />
        <div className="font-bold text-gray-900 text-lg">EMINENCE</div>
      </div>
      <button 
        onClick={onClose}
        className="p-2 -mr-2 text-gray-500 hover:text-gray-600 lg:hidden"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}