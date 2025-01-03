import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import { ProjectTable } from '../../components/admin/projects/ProjectTable';
import { ProjectFilters } from '../../components/admin/projects/ProjectFilters';
import { AddProjectModal } from '../../components/admin/projects/AddProjectModal';
import { ProjectType } from '../../types/project';
import { Plus } from 'lucide-react';

export function ProjectManagement() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    contractor: '',
    search: ''
  });

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get('https://epg-backend.onrender.com/api/project/display');
        
        // Log the raw response to understand its structure
        console.log('Raw response data:', response.data);

        // Access the 'projects' key inside the response data
        const data = response.data.projects;  // This accesses the array inside the 'projects' key
        
        // Check if the data is an array
        if (Array.isArray(data)) {
          const formattedProjects: ProjectType[] = data.map((project: any) => ({
            id: project.id,
            name: project.name,
            contractor: project.contractor || null,
            status: project.status,
            deadline: new Date(project.deadline).toISOString(), // Ensure consistent format
          }));

          setProjects(formattedProjects);
        } else {
          throw new Error('Expected an array but got something else');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
  }, []);

  // Filter projects based on filters
  useEffect(() => {
    const filtered = projects.filter(project => {
      const matchesStatus = filters.status
        ? project.status.toLowerCase() === filters.status.toLowerCase()
        : true;
      const matchesContractor = filters.contractor
        ? project.contractor?.toLowerCase().includes(filters.contractor.toLowerCase())
        : true;
      const matchesSearch = filters.search
        ? project.name.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      return matchesStatus && matchesContractor && matchesSearch;
    });

    setFilteredProjects(filtered);
  }, [filters, projects]);

  const handleAddProject = (project: Omit<ProjectType, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ProjectFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <ProjectTable projects={filteredProjects} />
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
