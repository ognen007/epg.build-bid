import { Navigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthContext();

  // Redirect based on user role if authenticated
  if (isAuthenticated) {
    const userRole = user?.role?.toUpperCase() ?? "";
    if (['ADMIN', 'CSM', 'PROJECTSPECIALIST'].includes(userRole)) {
      return <Navigate to="/admin" replace />;
    }
    if (userRole === 'CONTRACTOR') {
      return <Navigate to="/contractor" replace />;
    }
    if (userRole === 'CLIENT') {
      return <Navigate to="/client" replace />;
    }
  }

  return <>{children}</>;
}
