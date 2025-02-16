import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectProposals } from './ProjectProposals';
import { ProjectWorkflowView } from './ProjectWorkflowView';
import { ContractorFilters } from './ContractorProjectFilter';
import { Plus, Search } from 'lucide-react'; // Import the Search icon
import { AddProjectModal } from '../../../../components/admin/projects/AddProjectModal';
import { ProjectType } from '../../../../types/project';
import { useSearchParams } from 'react-router-dom';
import { ProjectKanbanView } from '../../../../components/admin/projects/kanban/ProjectKanbanView';
import { DraftedProjectSection } from './DraftedProjectSection';
import { fetchContractors } from '../../../../services/admin/contractors/contractorListEndpoint';
import { fetchProjects } from '../../../../services/admin/contractorpipeline/contractorPipeline';

// Define ContractorType interface
export interface ContractorType {
  id: string;
  fullName: string;
}

export function ContractorPipeline() {
  const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
  const [allContractors, setAllContractors] = useState<ContractorType[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);
  const [selectedContractorId, setSelectedContractorId] = useState<any>();
  const [selectedView, setSelectedView] = useState<'pipeline' | 'tasks'>('pipeline');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContractorFullName, setSelectedContractorFullName] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Sync selectedContractorId with search parameter
  useEffect(() => {
    const contractorId = searchParams.get('contractorId');
    setSelectedContractorId(contractorId);
  }, [searchParams]);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const fetchedProjects = await fetchProjects();
        setAllProjects(fetchedProjects);
      } catch (err: any) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  useEffect(() => {
    async function loadContractors() {
      try {
        const fetchedContractors = await fetchContractors();
        setAllContractors(fetchedContractors);
      } catch (err: any) {
        console.error('Error fetching contractors:', err);
        setError('Failed to fetch contractors. Please try again later.');
      }
    }

    loadContractors();
  }, []);


  useEffect(() => {
    if (selectedContractorId) {
      const selectedContractor = allContractors.find(contractor => contractor.id === selectedContractorId);
      setSelectedContractorFullName(selectedContractor ? selectedContractor.fullName : null);
    } else {
      setSelectedContractorFullName(null);
    }
  }, [selectedContractorId, allContractors]);

  // Filter projects based on selected contractor
  useEffect(() => {
    if (selectedContractorId) {
      const selectedContractor = allContractors.find(contractor => contractor.id === selectedContractorId);
      if (selectedContractor) {
        const filtered = allProjects.filter(project => project.contractor === selectedContractor.fullName);
        setFilteredProjects(filtered);
      } else {
        setFilteredProjects([]);
      }
    } else {
      setFilteredProjects(allProjects);
    }
  }, [selectedContractorId, allProjects, allContractors]);

  // Handle contractor selection
  const handleContractorSelect = (contractorId: string) => {
    setSelectedContractorId(contractorId);
    setSearchParams({ contractorId });
  };

  // Handle add project button click
  const handleAddProjectClick = () => {
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle adding a new project
  const handleAddProject = (project: Omit<ProjectType, 'id'>) => {
    console.log('Project added:', project);
    setIsModalOpen(false);
  };

  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Add Project Button Skeleton */}
        <div className="flex justify-between items-center animate-pulse">
          <div className="h-10 bg-gray-200 rounded-md w-32"></div>
        </div>

        {/* Toggle Buttons Skeleton */}
        <div className="flex justify-center animate-pulse">
          <div className="inline-flex p-1 bg-white rounded-full shadow-sm">
            <div className="px-4 py-2 rounded-full bg-gray-200 w-24"></div>
            <div className="px-4 py-2 rounded-full bg-gray-200 w-24 ml-2"></div>
          </div>
        </div>

        {/* Grid Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Contractor Filters Skeleton */}
          <div className="lg:col-span-1">
            <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Projects View Skeleton */}
          <div className="lg:col-span-3">
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add Project Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleAddProjectClick}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
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
        {/* Contractor Filters */}
        {selectedView === 'pipeline' && (
          <div className="lg:col-span-1">
            <ContractorFilters
              contractors={allContractors}
              selectedContractorId={selectedContractorId}
              onSelect={handleContractorSelect}
            />
          </div>
        )}

        {/* Projects View */}
        <div className={selectedView === 'pipeline' ? 'lg:col-span-3' : 'lg:col-span-4'}>
          {selectedView === 'pipeline' ? (
            selectedContractorId ? (
              <>
              <DraftedProjectSection contractorId={selectedContractorId} fullName={selectedContractorFullName} proposals={filteredProjects}/>
                <ProjectProposals proposals={filteredProjects} />
                <ProjectWorkflowView contractorId={selectedContractorId}/>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center justify-center h-full">
                <Search className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg text-center">
                  No contractor selected. Start typing to search for contractors.
                </p>
              </div>
            )
          ) : (
            <ProjectKanbanView contractorId={selectedContractorId}/>
          )}
        </div>
      </div>
    </div>
  );
}