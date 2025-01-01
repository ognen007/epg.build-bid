import { Navigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuthContext();

  console.log('ProtectedRoute check:', { user, isAuthenticated, allowedRoles });

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role?.toUpperCase() ?? '';
  const allowedUpperRoles = allowedRoles.map(role => role.toUpperCase());

  // Redirect to appropriate dashboard if role isn't allowed
  if (!allowedUpperRoles.includes(userRole)) {
    console.log('Unauthorized role:', userRole, 'Allowed roles:', allowedUpperRoles);

    if (['ADMIN', 'VA', 'SALES'].includes(userRole)) {
      return <Navigate to="/admin" replace />;
    }

    if (userRole === 'CONTRACTOR') {
      return <Navigate to="/contractor" replace />;
    }

    if (userRole === 'CLIENT') {
      return <Navigate to="/client" replace />;
    }

    // Fallback for invalid roles
    return <Navigate to="/login" replace />;
  }

  // If everything is valid, render children
  return <>{children}</>;
}
