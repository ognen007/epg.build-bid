import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminSidebar } from '../components/navigation/AdminSidebar';
import { Header } from '../components/Header';
import { WelcomePopup } from '../components/welcome/WelcomePopup';

// Import admin views
import { AdminDashboard } from '../views/admin/AdminDashboard';
import { UserManagement } from '../views/admin/UserManagement';
import { AdminMessages } from '../views/admin/AdminMessages';
import { Analytics } from '../views/admin/Analytics';
import { PlatformSettings } from '../views/admin/PlatformSettings';
import { SupportTickets } from '../views/admin/SupportTickets';
import { AdminSettings } from '../views/admin/AdminSettings';
import { RevenueComponent } from '../components/admin/analytics/RevenueComponent';
import { UserGrowthComponent } from '../components/admin/analytics/UserGrowthComponent';
import { RevenueDetails } from '../components/admin/analytics/RevenueDetails';
import { ProjectKanbanView } from '../components/admin/projects/ProjectKanbanView';
import { TakeoffView } from '../components/admin/takeoff/TakeoffView';
import { ContractorPipeline } from '../views/admin/components/contractorpipeline/ContractorPipeline';
import { useAuthContext } from '../views/auth/useAuthContext';
import { routes } from '../navigation/routes';
import { EstimatorKanban } from '../components/admin/takeoffEstimator/kanban/ProjectKanbanView';

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fullName, setFullName] = useState('');
  const { user } = useAuthContext();

  // Determine which routes to use based on the user's role
  const roleRoutes = user?.role === 'ADMIN' ? routes.admin : user?.role === 'ESTIMATOR' ? routes.admin.filter(route => route.roles?.includes('ESTIMATOR')) : [];

  useEffect(() => {
    const fetchFullNameByEmail = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return setFullName('Admin User');

        const { email } = JSON.parse(storedUser);

        const response = await fetch(
          `https://epg-backend.onrender.com/api/admin/name-by-email?email=${email}`
        );

        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullName || 'Admin User');
        } else {
          console.error('Error fetching full name:', response.statusText);
          setFullName('Admin User');
        }
      } catch (error) {
        console.error('Error fetching full name:', error);
        setFullName('Admin User');
      }
    };

    fetchFullNameByEmail();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {showWelcome && (
        <WelcomePopup
          fullName={fullName}
          onComplete={() => setShowWelcome(false)}
        />
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 lg:w-auto lg:static lg:flex
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <AdminSidebar menuItems={roleRoutes} onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          userFullName={fullName}
          onMenuClick={() => setIsSidebarOpen(true)}
          onTasksClick={() => {}}
          showTasksButton={false}
        />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            {/* Admin Routes */}
            {user?.role === 'ADMIN' && (
              <>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/projects/:id" element={<ProjectKanbanView />} />
                <Route path="/messages" element={<AdminMessages />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/platform-settings" element={<PlatformSettings />} />
                <Route path="/support" element={<SupportTickets />} />
                <Route path="/settings" element={<AdminSettings />} />
                <Route path="/analytics/revenue" element={<RevenueComponent />} />
                <Route path="/analytics/revenue/:id" element={<RevenueDetails />} />
                <Route path="/analytics/users" element={<UserGrowthComponent />} />
                <Route path="/pipeline" element={<ContractorPipeline />} />
                <Route path="/pipeline/:id" element={<ContractorPipeline />} />
                <Route path="/takeoff" element={<TakeoffView />} />
              </>
            )}

            {/* Estimator Routes */}
            {user?.role === 'ESTIMATOR' && (
              <>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/messages" element={<AdminMessages />} />
                <Route path="/settings" element={<AdminSettings />} />
                <Route path="/takeoff/estimate" element={<EstimatorKanban/>} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </div>
  );
}