import { useState } from 'react';
import { ProjectProposals } from './contractorpipeline/ProjectProposals';
import { ProjectWorkflowView } from './contractorpipeline/ProjectWorkflowView';
import { ContractorFilters } from './contractorpipeline/ContractorProjectFilter';
import { ProjectKanbanView } from '../../../components/admin/projects/ProjectKanbanView';
import { Plus } from 'lucide-react'; // Import the Plus icon from Lucide
import { AddProjectModal } from '../../../components/admin/projects/AddProjectModal';
import { ProjectType } from '../../../types/project';

const sampleProjects = {
  ongoing: [
    {
      id: '1',
      title: 'City Center Mall Renovation',
      clientName: 'John Smith',
      status: 'in_progress',
      progress: 65,
      deadline: '2024-04-15',
      description: 'Interior renovation project',
    },
  ],
  completed: [
    {
      id: '2',
      title: 'Harbor Bridge Maintenance',
      rating: 4.5,
      paymentStatus: 'paid',
      description: 'Bridge maintenance and repairs',
    },
  ],
  proposals: [
    {
      id: '3',
      title: 'Downtown Park Redesign',
      description: 'Complete redesign of central park area',
      budget: 95000,
      deadline: '2024-05-20',
    },
  ],
};

const sampleContractors = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Johnny Appleseed' },
];

export function ContractorPipeline() {
  const [projects, setProjects] = useState(sampleProjects);
  const [filters, setFilters] = useState({ name: '' });
  const [selectedView, setSelectedView] = useState<'pipeline' | 'tasks'>('pipeline'); // State for selected view
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleAcceptProposal = (id: string) => {
    console.log('Proposal accepted:', id);
  };

  const handleDeclineProposal = (id: string) => {
    console.log('Proposal declined:', id);
  };

  const handleAddProjectClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleAddProject = (project: Omit<ProjectType, 'id'>) => {
    console.log('Project added:', project);
    // Add your logic to handle the new project here
    setIsModalOpen(false); // Close the modal after adding the project
  };

  // Check if filters are empty
  const isFiltersEmpty = filters.name.trim() === '';

  return (
    <div className="space-y-6">
      {/* Add Project Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleAddProjectClick}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> {/* Lucide Plus icon */}
          <span>Add Project</span>
        </button>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddProject}
      />

      {/* Toggle Buttons */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-white rounded-full shadow-sm">
          <button
            onClick={() => setSelectedView('pipeline')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedView === 'pipeline'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Pipeline
          </button>
          <button
            onClick={() => setSelectedView('tasks')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedView === 'tasks'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Tasks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ContractorFilters
            filters={filters}
            onFilterChange={(newFilters) => setFilters(newFilters)}
            contractors={sampleContractors} // Pass the list of contractors
          />
        </div>

        {/* Conditionally render the right side based on filters and selected view */}
        {!isFiltersEmpty ? (
          <div className="lg:col-span-3">
            {selectedView === 'pipeline' ? (
              <>
                <ProjectProposals
                  proposals={projects.proposals}
                  onAccept={handleAcceptProposal}
                  onDecline={handleDeclineProposal}
                />
                <ProjectWorkflowView />
              </>
            ) : (
              <ProjectKanbanView />
            )}
          </div>
        ) : (
          <div className="lg:col-span-3">
            <p className="text-gray-500">No filters applied. Start typing to search for contractors.</p>
          </div>
        )}
      </div>
    </div>
  );
}