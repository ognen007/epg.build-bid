import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: JSX.Element;
}) => {
  const userRole = localStorage.getItem('userRole'); // Assuming user role is stored here
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }
  return children;
};
