import React from 'react';
import { Calendar, Hammer, CheckSquare } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  contractor: string;
  status: 'scheduled' | 'ongoing' | 'completed';
  startDate?: string;
  completionDate?: string;
}

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Downtown Office Complex',
    contractor: 'ABC Construction',
    status: 'scheduled',
    startDate: '2024-04-01'
  },
  {
    id: '2',
    name: 'Shopping Mall Renovation',
    contractor: 'XYZ Contractors',
    status: 'ongoing',
    startDate: '2024-02-15'
  }
];

export function ConstructionSection() {
  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'scheduled': return Calendar;
      case 'ongoing': return Hammer;
      case 'completed': return CheckSquare;
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'scheduled': return 'Scheduled Projects';
      case 'ongoing': return 'Ongoing Projects';
      case 'completed': return 'Completed Projects';
    }
  };

  const groupedProjects = sampleProjects.reduce((acc, project) => {
    if (!acc[project.status]) {
      acc[project.status] = [];
    }
    acc[project.status].push(project);
    return acc;
  }, {} as Record<Project['status'], Project[]>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Construction</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['scheduled', 'ongoing', 'completed'] as const).map(status => {
          const StatusIcon = getStatusIcon(status);
          const projects = groupedProjects[status] || [];
          
          return (
            <div key={status} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <StatusIcon className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium text-gray-900">{getStatusText(status)}</h3>
                </div>
                <span className="text-sm text-gray-500">{projects.length}</span>
              </div>

              <div className="space-y-3">
                {projects.map(project => (
                  <div key={project.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">{project.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{project.contractor}</div>
                    {project.startDate && (
                      <div className="text-sm text-gray-500 mt-1">
                        {status === 'scheduled' ? 'Starts' : 'Started'}: {new Date(project.startDate).toLocaleDateString()}
                      </div>
                    )}
                    {project.completionDate && (
                      <div className="text-sm text-gray-500">
                        Completed: {new Date(project.completionDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}