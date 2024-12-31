import React from 'react';
import { PortfolioItem } from './PortfolioItem';
import { PortfolioProject } from '../../../types/portfolio';

interface PortfolioGridProps {
  projects: PortfolioProject[];
  onEdit: (project: PortfolioProject) => void;
  onDelete: (id: string) => void;
}

export function PortfolioGrid({ projects, onEdit, onDelete }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <PortfolioItem
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}