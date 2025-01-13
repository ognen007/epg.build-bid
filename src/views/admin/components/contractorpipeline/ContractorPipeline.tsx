import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectProposals } from './ProjectProposals';
import { ProjectWorkflowView } from './ProjectWorkflowView';
import { ContractorFilters } from './ContractorProjectFilter';
import { ProjectKanbanView } from '../../../../components/admin/projects/ProjectKanbanView';
import { Plus } from 'lucide-react';
import { AddProjectModal } from '../../../../components/admin/projects/AddProjectModal';
import { ProjectType } from '../../../../types/project';
import { useSearchParams } from 'react-router-dom';

// Define ContractorType interface
export interface ContractorType {
  id: string;
  fullName: string;
}

export function ContractorPipeline() {
  const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
  const [allContractors, setAllContractors] = useState<ContractorType[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);
  const [selectedContractorId, setSelectedContractorId] = useState<string | undefined>();
  const [selectedView, setSelectedView] = useState<'pipeline' | 'tasks'>('pipeline');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Sync selectedContractorId with search parameter
  useEffect(() => {
    const contractorId = searchParams.get('contractorId');
    setSelectedContractorId(contractorId);
  }, [searchParams]);

  // Fetch all projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://epg-backend.onrender.com/api/project/display');
        if (response.data && Array.isArray(response.data.projects)) {
          setAllProjects(response.data.projects);
        } else {
          throw new Error('Invalid data format: Expected an array of projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Fetch all contractors from the backend
  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await axios.get('https://epg-backend.onrender.com/api/contractors/name');
        if (response.data && Array.isArray(response.data)) {
          setAllContractors(response.data);
        } else {
          throw new Error('Invalid data format: Expected an array of contractors');
        }
      } catch (err) {
        console.error('Error fetching contractors:', err);
        setError('Failed to fetch contractors. Please try again later.');
      }
    };
    fetchContractors();
  }, []);

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
              loading ? (
                <p>Loading projects...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <ProjectProposals proposals={filteredProjects} />
                  <ProjectWorkflowView />
                </>
              )
            ) : (
              <p className="text-gray-500">No contractor selected. Start typing to search for contractors.</p>
            )
          ) : (
            <ProjectKanbanView />
          )}
        </div>
      </div>
    </div>
  );
}