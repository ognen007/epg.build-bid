import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PortfolioGrid } from '../../components/contractor/portfolio/PortfolioGrid';
import { AddPortfolioModal } from '../../components/contractor/portfolio/AddPortfolioModal';
import { PortfolioProject } from '../../types/portfolio';

const sampleProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Downtown Park Redesign',
    description: 'Complete redesign of central park area including new playground equipment and landscaping.',
    imageUrl: 'https://images.unsplash.com/photo-1587162146766-e06b1189b907',
    location: 'Chicago, IL',
    clientTestimonial: 'Excellent work on the park redesign. The community loves it!',
    rating: 5
  },
  {
    id: '2',
    title: 'Office Building Renovation',
    description: 'Full interior renovation of a 10-story office building including modern amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    location: 'New York, NY',
    clientTestimonial: 'Professional team, delivered on time and within budget.',
    rating: 4.5
  }
];

export function ContractorPortfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>(sampleProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (project: Omit<PortfolioProject, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    setProjects([...projects, newProject]);
  };

  const handleEdit = (project: PortfolioProject) => {
    // Handle edit
    console.log('Edit project:', project);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Portfolio</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </button>
      </div>

      <PortfolioGrid
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddPortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}