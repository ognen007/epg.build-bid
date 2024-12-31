import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function NavItem({ icon: Icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg
        transition-colors duration-150 ease-in-out
        ${isActive
          ? 'bg-orange-500 text-white'
          : 'text-gray-700 hover:bg-orange-500 hover:text-white'
        }
      `}
    >
      <Icon className="h-5 w-5 mr-3" />
      {label}
    </button>
  );
}