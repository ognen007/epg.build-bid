import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ClientSidebar } from '../components/navigation/ClientSidebar';
import { Header } from '../components/Header';
import { RightSidebar } from '../components/dashboard/RightSidebar';
import { WelcomePopup } from '../components/welcome/WelcomePopup';

// Import client views
import { DashboardView } from '../views/client/DashboardView';
import { ProjectsView } from '../views/client/ProjectsView';
import { ContractorsView } from '../views/client/ContractorsView';
import { MessagesView } from '../views/client/MessagesView';
import { SettingsView } from '../views/client/SettingsView';

export function ClientLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {showWelcome && (
        <WelcomePopup 
          fullName="Client User" 
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
        <ClientSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)}
          onTasksClick={() => setIsRightSidebarOpen(true)}
          showTasksButton={true}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="/projects" element={<ProjectsView />} />
            <Route path="/contractors" element={<ContractorsView />} />
            <Route path="/messages" element={<MessagesView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
      
      <RightSidebar 
        onClose={() => setIsRightSidebarOpen(false)} 
        isOpen={isRightSidebarOpen}
      />
    </div>
  );
}