import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminSidebar } from '../components/navigation/AdminSidebar';
import { Header } from '../components/Header';
import { WelcomePopup } from '../components/welcome/WelcomePopup';

// Import admin views
import { AdminDashboard } from '../views/admin/AdminDashboard';
import { UserManagement } from '../views/admin/UserManagement';
import { ProjectManagement } from '../views/admin/ProjectManagement';
import { AdminMessages } from '../views/admin/AdminMessages';
import { Analytics } from '../views/admin/Analytics';
import { PlatformSettings } from '../views/admin/PlatformSettings';
import { SupportTickets } from '../views/admin/SupportTickets';
import { AdminSettings } from '../views/admin/AdminSettings';

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchFullNameByEmail = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return setFullName("Admin User");
  
        const { email } = JSON.parse(storedUser);
  
        const response = await fetch(
          `https://epg-backend.onrender.com/api/admin/name-by-email?email=${email}`
        );
  
        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullName || "Admin User");
        } else {
          console.error("Error fetching full name:", response.statusText);
          setFullName("Admin User");
        }
      } catch (error) {
        console.error("Error fetching full name:", error);
        setFullName("Admin User");
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
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 lg:w-auto lg:static lg:flex
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)}
          onTasksClick={() => {}}
          showTasksButton={false}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/projects" element={<ProjectManagement />} />
            <Route path="/messages" element={<AdminMessages />} />
            {/* <Route path="/earnings" element={<EarningsManagement />} /> */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/platform-settings" element={<PlatformSettings />} />
            <Route path="/support" element={<SupportTickets />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}