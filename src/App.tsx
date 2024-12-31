import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts and Views
import { AdminLoginView } from './views/auth/AdminLoginView';
import { AdminLayout } from './layouts/AdminLayout';
import { ClientLayout } from './layouts/ClientLayout';
import { ContractorLayout } from './layouts/ContractorLayout';
import { RegisterView } from './views/auth/RegisterView';
import { LoginView } from './views/auth/LoginView';
import { AuthProvider } from './views/auth/useAuthContext';
import { ProtectedRoute } from './views/auth/ProtectedRoute';

// Cleanup Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
    });
  });
}

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login/admin" element={<AdminLoginView />} />
          <Route path="/" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'VA', 'SALES']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          {/* Client Routes */}
          <Route
            path="/client/*"
            element={
              <ProtectedRoute allowedRoles={['CLIENT']}>
                <ClientLayout />
              </ProtectedRoute>
            }
          />

          {/* Contractor Routes */}
          <Route
            path="/contractor/*"
            element={
              <ProtectedRoute allowedRoles={['CONTRACTOR']}>
                <ContractorLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
