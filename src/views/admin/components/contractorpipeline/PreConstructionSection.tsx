import React from 'react';
import { Clock, FileText, MessageSquare, CheckCircle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  contractor: string;
  status: 'proposal' | 'takeoff' | 'ready' | 'negotiating';
  dropboxLink?: string;
  lastUpdated: string;
}

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'City Center Mall Renovation',
    contractor: 'ABC Construction',
    status: 'proposal',
    lastUpdated: '2024-03-15'
  },
  {
    id: '2',
    name: 'Harbor Bridge Maintenance',
    contractor: 'XYZ Contractors',
    status: 'takeoff',
    lastUpdated: '2024-03-14'
  }
];

export function PreConstructionSection() {
  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'proposal': return MessageSquare;
      case 'takeoff': return Clock;
      case 'ready': return FileText;
      case 'negotiating': return CheckCircle;
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'takeoff': return 'Takeoff in Progress';
      case 'ready': return 'Ready for Proposal';
      case 'negotiating': return 'Negotiating';
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
    <div className="space-y-6 w-full"> {/* Ensure full width */}
      <h2 className="text-xl font-semibold text-gray-900">Pre-Construction</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full"> {/* Ensure full width */}
        {(['takeoff', 'ready', 'negotiating'] as const).map(status => {
          const StatusIcon = getStatusIcon(status);
          const projects = groupedProjects[status] || [];
          
          return (
            <div key={status} className="bg-white rounded-xl shadow-sm p-6 w-full"> {/* Ensure full width */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <StatusIcon className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium text-gray-900">{getStatusText(status)}</h3>
                </div>
                <span className="text-sm text-gray-500">{projects.length}</span>
              </div>

              <div className="space-y-3">
                {projects.map(project => (
                  <div key={project.id} className="p-3 bg-gray-50 rounded-lg w-full"> {/* Ensure full width */}
                    <div className="font-medium text-gray-900">{project.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{project.contractor}</div>
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