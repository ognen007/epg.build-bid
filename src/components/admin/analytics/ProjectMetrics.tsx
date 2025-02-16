import { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';
import { CategoryBar } from './CategoryBar';
import { MetricHeader } from './MetricHeader';
import { fetchProjectMetrics } from '../../../services/admin/projects/projectMetrixEndpoints';

export function ProjectMetrics() {
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    growth: 0,
    categories: [] as { name: string; count: number; percentage: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const data = await fetchProjectMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics');
      } finally {
        setLoading(false);
      }
    };

    getMetrics();
  }, []);

  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Metric Header Skeleton */}
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/6"></div>
          </div>
        </div>

        {/* Category Bars Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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