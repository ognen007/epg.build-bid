import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function Link({ href, icon: Icon, children }: LinkProps) {
  const isActive = window.location.pathname === href;
  
  return (
    <a
      href={href}
      className={`
        flex items-center px-4 py-3 text-sm font-medium rounded-lg
        transition-colors duration-150 ease-in-out
        ${isActive
          ? 'bg-orange-500 text-white'
          : 'text-gray-700 hover:bg-orange-500 hover:text-white'
        }
      `}
    >
      <Icon className={`h-5 w-5 mr-3 transition-colors duration-150 ease-in-out`} />
      {children}
    </a>
  );
}