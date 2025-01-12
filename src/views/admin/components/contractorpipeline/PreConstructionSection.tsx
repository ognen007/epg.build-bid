import React from 'react';
import { Clock, FileText, MessageSquare, CheckCircle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: 'proposal' | 'takeoff' | 'ready' | 'negotiating';
  dropboxLink?: string;
  lastUpdated: string;
  dueDate?: string; // Add dueDate field
}

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'City Center Mall Renovation',
    status: 'proposal',
    lastUpdated: '2024-03-15',
  },
  {
    id: '2',
    name: 'Harbor Bridge Maintenance',
    status: 'takeoff',
    lastUpdated: '2024-03-14',
  },
  {
    id: '3',
    name: 'Downtown Park Redesign',
    status: 'ready',
    lastUpdated: '2024-03-13',
    dueDate: '2025-01-11', // Add dueDate for "Ready for Proposal" projects
    dropboxLink: 'https://www.dropbox.com',
  },
  {
    id: '4',
    name: 'Office Complex Construction',
    status: 'negotiating',
    lastUpdated: '2024-03-12',
  },
];

export function PreConstructionSection() {
  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'proposal':
        return MessageSquare;
      case 'takeoff':
        return Clock;
      case 'ready':
        return FileText;
      case 'negotiating':
        return CheckCircle;
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'takeoff':
        return 'Takeoff in Progress';
      case 'ready':
        return 'Ready for Proposal';
      case 'negotiating':
        return 'Negotiating';
      default:
        return '';
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
    <div className="space-y-6 w-full">
      <h2 className="text-xl font-semibold text-gray-900">Pre-Construction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {(['takeoff', 'ready', 'negotiating'] as const).map((status) => {
          const StatusIcon = getStatusIcon(status);
          const projects = groupedProjects[status] || [];

          return (
            <div key={status} className="bg-white rounded-xl shadow-sm p-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <StatusIcon className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium text-gray-900">{getStatusText(status)}</h3>
                </div>
                <span className="text-sm text-gray-500">{projects.length}</span>
              </div>

              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="p-3 bg-gray-50 rounded-lg w-full">
                    <div className="font-medium text-gray-900">{project.name}</div>
                    {status === 'ready' && project.dueDate && (
                      <div className="text-sm text-gray-500 mt-1">
                        Due {new Date(project.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    {status === 'ready' && project.dropboxLink && (
                      <a
                        href={project.dropboxLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 hover:text-orange-700 mt-2 inline-block"
                      >
                        View Files
                      </a>
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