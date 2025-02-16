import { useEffect, useState } from 'react';
import { ProjectTable } from '../../components/admin/projects/ProjectTable';
import { ProjectFilters } from '../../components/admin/projects/ProjectFilters';
import { AddProjectModal } from '../../components/admin/projects/AddProjectModal';
import { ProjectType } from '../../types/project';
import { Plus } from 'lucide-react';
import { fetchProjects } from '../../services/admin/projects/fetchProjectsEndpoint';

export function ProjectManagement() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    stage: '',
    client: '',
    search: '',
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(''); // Add error state

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      setError('');
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch (error: any) {
        console.error("Error loading projects:", error);
        setError(error.message); // Set error message from service
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  // Filter projects based on filters
  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesStatus = filters.status
        ? project.status.toLowerCase() === filters.status.toLowerCase()
        : true;
      const matchesClient = filters.client
        ? project.contractor?.toLowerCase().includes(filters.client.toLowerCase())
        : true;
      const matchesSearch = filters.search
        ? project.name.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      return matchesStatus && matchesClient && matchesSearch;
    });

    setFilteredProjects(filtered);
  }, [filters, projects]);

  const handleAddProject = (project: Omit<ProjectType, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects([...projects, newProject]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Project Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ProjectFilters filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
            </div>
          ) : (
            <ProjectTable projects={filteredProjects} />
          )}
        </div>
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProject}
      />
    </div>
  );
}