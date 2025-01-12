import { useState } from 'react';
import { ProjectProposals } from './contractorpipeline/ProjectProposals';
import { ProjectWorkflowView } from './contractorpipeline/ProjectWorkflowView';
import { ContractorFilters } from './contractorpipeline/ContractorProjectFilter';

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

  const handleAcceptProposal = (id: string) => {
    console.log('Proposal accepted:', id);
  };

  const handleDeclineProposal = (id: string) => {
    console.log('Proposal declined:', id);
  };

  // Check if filters are empty
  const isFiltersEmpty = filters.name.trim() === '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <ContractorFilters
          filters={filters}
          onFilterChange={(newFilters) => setFilters(newFilters)}
          contractors={sampleContractors} // Pass the list of contractors
        />
      </div>

      {/* Conditionally render the right side based on filters */}
      {!isFiltersEmpty ? (
        <div className="lg:col-span-3">
          <ProjectProposals
            proposals={projects.proposals}
            onAccept={handleAcceptProposal}
            onDecline={handleDeclineProposal}
          />
          <ProjectWorkflowView />
        </div>
      ) : (
        <div className="lg:col-span-3">
          <p className="text-gray-500">No filters applied. Start typing to search for contractors.</p>
        </div>
      )}
    </div>
  );
}