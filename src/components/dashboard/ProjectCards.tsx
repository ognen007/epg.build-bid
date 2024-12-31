import React from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const recentProjects = [
  {
    id: '1',
    title: 'Modern Office Renovation',
    description: 'Complete renovation of 3-story office building including HVAC upgrades',
    status: 'active',
    deadline: '2024-04-15',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c'
  },
  {
    id: '2',
    title: 'Residential Complex',
    description: 'New residential complex with 200 units and modern amenities',
    status: 'pending',
    deadline: '2024-05-20',
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'
  },
  {
    id: '3',
    title: 'Shopping Mall Extension',
    description: 'Extension of existing mall with new retail spaces and parking',
    status: 'completed',
    deadline: '2024-03-30',
    location: 'Chicago, IL',
    image: 'https://images.unsplash.com/photo-1587162146766-e06b1189b907'
  }
];

export function ProjectCards() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
        <button 
          onClick={() => navigate('/client/projects')}
          className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
        >
          View All Projects
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentProjects.map((project) => (
          <div 
            key={project.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/client/projects/${project.id}`)}
          >
            <div className="h-48">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${project.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  ${project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${project.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
                `}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(project.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}