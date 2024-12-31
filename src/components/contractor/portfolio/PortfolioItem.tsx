import React, { useState } from 'react';
import { Edit2, Trash2, Star, MapPin } from 'lucide-react';
import { PortfolioProject } from '../../../types/portfolio';

interface PortfolioItemProps {
  project: PortfolioProject;
  onEdit: (project: PortfolioProject) => void;
  onDelete: (id: string) => void;
}

export function PortfolioItem({ project, onEdit, onDelete }: PortfolioItemProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="relative h-48">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className={`
          absolute inset-0 bg-black/50 flex items-center justify-center gap-2
          transition-opacity duration-200
          ${showActions ? 'opacity-100' : 'opacity-0'}
        `}>
          <button
            onClick={() => onEdit(project)}
            className="p-2 bg-white rounded-full text-gray-700 hover:text-gray-900"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-2 bg-white rounded-full text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location}
          </div>
          {project.clientTestimonial && (
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {project.rating}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}