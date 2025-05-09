import { useNavigate, useLocation } from 'react-router-dom';
import { X, Settings } from 'lucide-react';
import { NavItem } from './NavItem';
import epgLogo from '../../asset/epgLogo.png';
import { routes } from '../../navigation/routes';

interface RouteConfig {
  path: string;
  label: string;
  icon: React.ElementType;
  roles?: string[];
}

interface AdminSidebarProps {
  menuItems: RouteConfig[];
  onClose: () => void;
}

export function AdminSidebar({ menuItems, onClose }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const mainNavItems = routes.admin.filter(route => !route.path.includes('settings'));
  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <img src={epgLogo} className="h-14" alt="EPG Logo" />
        </div>
        <button
          onClick={onClose}
          className="p-2 -mr-2 text-gray-500 hover:text-gray-600 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
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
            isActive={location.pathname === '/admin/settings'}
            onClick={() => navigate('/admin/settings')}
            isSettings={true}
          />
        </div>
      </div>
  );
}