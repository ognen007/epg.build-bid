import React from 'react';
import { Star, DollarSign } from 'lucide-react';
import { Project } from '../../../types/project';

interface CompletedProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function CompletedProjects({ projects, onProjectClick }: CompletedProjectsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Completed Projects</h2>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => onProjectClick(project)}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < project.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    Client Rating
                  </span>
                </div>
              </div>
              <span className={`
                px-2 py-1 text-sm font-medium rounded-full
                ${project.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : ''}
                ${project.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
              `}>
                <DollarSign className="h-4 w-4 inline-block mr-1" />
                {project.paymentStatus.charAt(0).toUpperCase() + project.paymentStatus.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}