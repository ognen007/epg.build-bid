import React from 'react';
import { Calendar, MapPin, Home } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-72 h-48 md:h-auto relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${project.status === 'active' ? 'bg-green-100 text-green-800' : ''}
              ${project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${project.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
            `}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
          
          <div className="space-y-2 mb-4">
            {project.location && (
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{project.location}</span>
              </div>
            )}
            {project.rooms && (
              <div className="flex items-center text-gray-600">
                <Home className="h-4 w-4 mr-2" />
                <span className="text-sm">{project.rooms} rooms</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">
                Due {new Date(project.biddingDeadline).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">
              ${project.budget.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}