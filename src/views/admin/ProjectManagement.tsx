import React, { useState } from 'react';
import { ProjectTable } from '../../components/admin/projects/ProjectTable';
import { ProjectFilters } from '../../components/admin/projects/ProjectFilters';
import { AddProjectModal } from '../../components/admin/projects/AddProjectModal';
import { ProjectType } from '../../types/project';
import { Plus } from 'lucide-react';

const sampleProjects: ProjectType[] = [
  {
    id: '1',
    name: 'City Center Mall Renovation',
    client: 'John Smith',
    contractor: 'ABC Construction',
    status: 'active',
    deadline: '2024-04-15'
  },
  {
    id: '2',
    name: 'Harbor Bridge Maintenance',
    client: 'Sarah Johnson',
    contractor: null,
    status: 'pending',
    deadline: '2024-05-01'
  }
];

export function ProjectManagement() {
  const [projects, setProjects] = useState<ProjectType[]>(sampleProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    contractor: '',
    search: ''
  });

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
          <ProjectTable projects={projects} />
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