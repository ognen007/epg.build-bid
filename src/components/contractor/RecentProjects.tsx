import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

const recentProjects = [
  {
    id: '1',
    title: 'Downtown Park Redesign',
    status: 'completed',
    completionDate: '2024-01-20',
    earnings: 85000,
    clientRating: 5
  },
  {
    id: '2',
    title: 'Office Building Renovation',
    status: 'completed',
    completionDate: '2024-01-15',
    earnings: 120000,
    clientRating: 4.5
  }
];

export function RecentProjects() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Recent Projects</h2>
        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center">
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {recentProjects.map((project) => (
          <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  Completed {new Date(project.completionDate).toLocaleDateString()}
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                ${project.earnings.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < project.clientRating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-gray-600">
                  Client Rating
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}