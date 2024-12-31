import React, { useState, useMemo } from 'react';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { ProjectGrid } from '../../components/projects/ProjectGrid';
import { ProjectDetails } from '../../components/projects/ProjectDetails';
import { ProjectSearch } from '../../components/projects/ProjectSearch';
import { ProjectFilters, ProjectFilters as FilterType } from '../../components/projects/ProjectFilters';
import { MobileFilters } from '../../components/projects/MobileFilters';
import { CreateProjectModal } from '../../components/projects/CreateProjectModal';
import { Project } from '../../types/project';

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'City Center Mall Renovation',
    status: 'active',
    biddingDeadline: '2024-12-15',
    budget: 2500000,
    description: 'Complete interior renovation of the west wing including new flooring, lighting, and store frontages.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    location: 'New York, NY',
    rooms: 12
  },
  {
    id: '2',
    title: 'Harbor Bridge Maintenance',
    status: 'pending',
    biddingDeadline: '2025-01-30',
    budget: 1800000,
    description: 'Structural maintenance and repainting of the harbor bridge support beams.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    location: 'San Francisco, CA'
  }
];

export function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterType>({
    status: [],
    minBudget: 0,
    maxBudget: 0,
    location: ''
  });

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        project.title.toLowerCase().includes(searchLower) ||
        project.location?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(project.status)) {
        return false;
      }

      // Budget filter
      if (filters.minBudget && project.budget < filters.minBudget) {
        return false;
      }
      if (filters.maxBudget && project.budget > filters.maxBudget) {
        return false;
      }

      // Location filter
      if (filters.location && !project.location?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [projects, searchQuery, filters]);

  const handleCreateProject = (project: Project) => {
    setProjects([...projects, project]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Project
          </button>
        </div>
      </div>

      <ProjectSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="hidden lg:block lg:col-span-1">
          <ProjectFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <ProjectGrid
            projects={filteredProjects}
            onProjectClick={setSelectedProject}
          />
        </div>
      </div>

      {/* Mobile Filters */}
      <MobileFilters
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}