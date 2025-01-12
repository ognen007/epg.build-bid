import React, { useState } from 'react';
import { Plus, Bell, LifeBuoy } from 'lucide-react';
import { CreateAnnouncementModal } from '../../CreateAnnouncementModal';
import { useNavigate } from 'react-router-dom';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add New Project',
      description: 'Create a new project in the system',
      icon: Plus,
      onClick: () => navigate('/admin/pipeline')
    },
    {
      title: 'Create Announcement',
      description: 'Send a platform-wide announcement',
      icon: Bell,
      onClick: () => {} // Placeholder, will be overridden
    },
    {
      title: 'Resolve Pending Ticket',
      description: 'Handle urgent support requests',
      icon: LifeBuoy,
      onClick: () => navigate('/admin/takeoff')
    }
  ];
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Open the modal
  const handleCreateAnnouncementClick = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Update the "Create Announcement" action to use the handler
  const updatedActions = actions.map((action) => {
    if (action.title === 'Create Announcement') {
      return { ...action, onClick: handleCreateAnnouncementClick };
    }
    return action;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="space-y-4">
        {updatedActions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            className="flex items-center w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="p-2 bg-orange-100 rounded-lg">
              <action.icon className="h-5 w-5 text-orange-600" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-medium text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Render the modal */}
      <CreateAnnouncementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userFullName="Robert Welch" // Replace with dynamic user name if needed
      />
    </div>
  );
}