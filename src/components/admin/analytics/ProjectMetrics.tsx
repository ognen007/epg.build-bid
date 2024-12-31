import React from 'react';
import { Briefcase, TrendingUp } from 'lucide-react';
import { CategoryBar } from './CategoryBar';
import { MetricHeader } from './MetricHeader';
import { ProjectCategory } from '../../../types/analytics';

const metrics = {
  totalProjects: 185,
  growth: 8.3,
  categories: [
    { name: 'Residential', count: 85, percentage: 45 },
    { name: 'Commercial', count: 65, percentage: 35 },
    { name: 'Industrial', count: 35, percentage: 20 }
  ]
};

export function ProjectMetrics() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <MetricHeader 
        title="Project Metrics"
        total={metrics.totalProjects}
        growth={metrics.growth}
        icon={Briefcase}
      />

      <div className="space-y-4">
        {metrics.categories.map((category) => (
          <CategoryBar 
            key={category.name}
            category={category}
          />
        ))}
      </div>
    </div>
  );
}