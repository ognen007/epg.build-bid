import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './views/auth/useAuthContext';
import { AdminLoginView } from './views/auth/AdminLoginView';
import { LoginView } from './views/auth/LoginView';
import { RegisterView } from './views/auth/RegisterView';
import { AdminLayout } from './layouts/AdminLayout';
import { ClientLayout } from './layouts/ClientLayout';
import { ContractorLayout } from './layouts/ContractorLayout';
import { ProtectedRoute } from './views/auth/ProtectedRoute';
import { PublicRoute } from './views/auth/PublicRoute';

export function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
  {/* Public Routes */}
  <Route
            path="/login/admin"
            element={
              <PublicRoute>
                <AdminLoginView />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginView />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterView />
              </PublicRoute>
            }
          />


  {/* Protected Routes */}
  <Route
    path="/admin/*"
    element={
      <ProtectedRoute allowedRoles={['ADMIN', 'CSM', 'PROJECTSPECIALIST', 'ESTIMATOR']}>
        <AdminLayout />
      </ProtectedRoute>
    }
  />
  <Route
    path="/client/*"
    element={
      <ProtectedRoute allowedRoles={['CLIENT']}>
        <ClientLayout />
      </ProtectedRoute>
    }
  />
  <Route
    path="/contractor/*"
    element={
      <ProtectedRoute allowedRoles={['CONTRACTOR']}>
        <ContractorLayout />
      </ProtectedRoute>
    }
  />

  {/* Fallback for undefined routes */}
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>

      </Router>
    </AuthProvider>
  );
}