import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ContractorSidebar } from '../components/navigation/ContractorSidebar';
import { Header } from '../components/Header';
import { WelcomePopup } from '../components/welcome/WelcomePopup';

// Import contractor views
import { ContractorDashboard } from '../views/contractor/ContractorDashboard';
import { ContractorProjects } from '../views/contractor/ContractorProjects';
import { FindWorkView } from '../views/contractor/FindWorkView';
import { ContractorEarnings } from '../views/contractor/ContractorEarnings';
import { ContractorMessages } from '../views/contractor/ContractorMessages';
import { ContractorSettings } from '../views/contractor/ContractorSettings';
import { ContractorTasks } from '../views/contractor/ContractorTasks';

export function ContractorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {showWelcome && (
        <WelcomePopup 
          fullName="Contractor User" 
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
        <ContractorSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)}
          onTasksClick={() => {}}
          showTasksButton={false}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<ContractorDashboard />} />
            <Route path="/projects" element={<ContractorProjects />} />
            <Route path="/find-work" element={<FindWorkView />} />
            <Route path="/earnings" element={<ContractorEarnings />} />
            <Route path="/messages" element={<ContractorMessages />} />
            <Route path="/settings" element={<ContractorSettings />} />
            <Route path="/tasks" element={<ContractorTasks />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}