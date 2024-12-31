import React from 'react';
import { Clock, User } from 'lucide-react';
import { ProjectProgressBar } from './ProjectProgressBar';
import { Project } from '../../../types/project';

interface OngoingProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function OngoingProjects({ projects, onProjectClick }: OngoingProjectsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Ongoing Projects</h2>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => onProjectClick(project)}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <User className="h-4 w-4 mr-1" />
                  {project.clientName}
                </div>
              </div>
              <span className={`
                px-2 py-1 text-sm font-medium rounded-full
                ${project.status === 'not_started' ? 'bg-gray-100 text-gray-800' : ''}
                ${project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : ''}
                ${project.status === 'complete' ? 'bg-green-100 text-green-800' : ''}
              `}>
                {project.status.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </div>
            
            <ProjectProgressBar progress={project.progress} />
            
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Due {new Date(project.deadline).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}