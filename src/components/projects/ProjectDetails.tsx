import React from 'react';
import { X, Calendar, DollarSign, Users, Clock, FileText, MapPin, User, Building2 } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 pr-8">{project.title}</h2>
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
            <div className="mb-6 rounded-lg overflow-hidden h-48 sm:h-64">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="font-medium">{project.location}</div>
                </div>
              </div>

              {/* ... other grid items ... */}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="flex items-center justify-center px-4 py-2 text-gray-700 hover:text-gray-900">
                <FileText className="h-4 w-4 mr-2" />
                Download Details
              </button>
              <button className="flex items-center justify-center px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                <DollarSign className="h-4 w-4 mr-2" />
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}