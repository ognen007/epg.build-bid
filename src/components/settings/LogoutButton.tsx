import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../views/auth/useAuthContext';

export function LogoutButton() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </button>
  );
}
