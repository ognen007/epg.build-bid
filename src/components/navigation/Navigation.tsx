import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { NavItem } from './NavItem';
import { routes } from '../../navigation/routes';

interface NavigationProps {
  userRole: 'client' | 'contractor';
}

export function Navigation({ userRole }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = routes[userRole];
  const settingsPath = `/${userRole}/settings`;

  return (
    <div className="flex flex-col h-full">
      {/* Main navigation items */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      {/* Settings at the bottom */}
      <nav className="px-2 py-4 border-t border-gray-200">
        <NavItem
          icon={Settings}
          label="Settings"
          isActive={location.pathname === settingsPath}
          onClick={() => navigate(settingsPath)}
        />
      </nav>
    </div>
  );
}