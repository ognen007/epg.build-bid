import React from 'react';
import { Star, MapPin, ArrowRight, UserPlus } from 'lucide-react';
import { Contractor } from '../../types/contractor';

interface ContractorCardProps {
  contractor: Contractor;
}

export function ContractorCard({ contractor }: ContractorCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-start space-x-4">
        <img
          src={contractor.avatar}
          alt={contractor.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{contractor.name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {contractor.rating.toFixed(1)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {contractor.location}
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {contractor.expertise.map(skill => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <div>
              <div className="text-sm text-gray-500">Completed Projects</div>
              <div className="font-semibold text-gray-900">{contractor.completedProjects}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Hourly Rate</div>
              <div className="font-semibold text-gray-900">${contractor.hourlyRate}/hr</div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
            <button 
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => {/* Handle view details */}}
            >
              View Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
            <button 
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              onClick={() => {/* Handle hire now */}}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}