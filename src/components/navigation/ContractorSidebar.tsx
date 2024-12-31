import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, X, Settings } from 'lucide-react';
import { NavItem } from './NavItem';
import { routes } from '../../navigation/routes';

interface ContractorSidebarProps {
  onClose: () => void;
}

export function ContractorSidebar({ onClose }: ContractorSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get all routes except settings
  const mainNavItems = routes.contractor.filter(route => !route.path.includes('settings'));

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-orange-500" />
          <div className="font-bold text-gray-900 text-lg">CONTRACTOR</div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 -mr-2 text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col h-full">
        {/* Main navigation items */}
        <div className="flex-1 px-2 py-4 space-y-1">
          {mainNavItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>

        {/* Settings at the bottom */}
        <div className="px-2 mt-auto">
          <NavItem
            icon={Settings}
            label="Settings"
            isActive={location.pathname === '/contractor/settings'}
            onClick={() => navigate('/contractor/settings')}
            isSettings={true}
          />
        </div>
      </div>
    </div>
  );
}