import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isSettings?: boolean;
}

export function NavItem({ icon: Icon, label, isActive, onClick, isSettings }: NavItemProps) {
  const baseClasses = "w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200";
  
  if (isSettings) {
    return (
      <div className="px-2 mt-auto border-t border-gray-900/10">
        <button
          onClick={onClick}
          className={`
            ${baseClasses}
            ${isActive 
              ? 'bg-orange-500 text-white' 
              : 'text-gray-700 hover:bg-orange-500/10 hover:text-orange-600'
            }
          `}
        >
          <Icon className={`h-5 w-5 mr-3 ${isActive ? '' : 'text-gray-500'}`} />
          <span className="font-medium">{label}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`
        ${baseClasses}
        rounded-lg
        ${isActive
          ? 'bg-orange-500 text-white shadow-sm'
          : 'text-gray-700 hover:bg-orange-500/10 hover:text-orange-600'
        }
      `}
    >
      <Icon className="h-5 w-5 mr-3" />
      {label}
    </button>
  );
}