import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ProjectRow } from './ProjectRow';
import { CreateProjectModal } from './CreateProjectModal';
import { Project } from '../../types/project';

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'City Center Mall Renovation',
    status: 'active',
    biddingDeadline: '2024-12-15',
    budget: 2500000,
    description: 'Complete interior renovation of the west wing including new flooring, lighting, and store frontages.'
  },
  {
    id: '2',
    title: 'Harbor Bridge Maintenance',
    status: 'pending',
    biddingDeadline: '2025-01-30',
    budget: 1800000,
    description: 'Structural maintenance and repainting of the harbor bridge support beams.'
  }
];

export function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateProject = (project: Project) => {
    setProjects([...projects, project]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bidding Deadline
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <ProjectRow 
                key={project.id} 
                project={project}
                onStatusChange={(status) => {
                  setProjects(projects.map(p => 
                    p.id === project.id ? { ...p, status } : p
                  ));
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}