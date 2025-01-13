import React, { useEffect, useState } from 'react';
import { Briefcase, TrendingUp } from 'lucide-react';
import { CategoryBar } from './CategoryBar';
import { MetricHeader } from './MetricHeader';

// Define the structure of the API response
interface ApiResponse {
  totalProjects: number;
  growth: number;
  categories: {
    name: string;
    count: number;
    percentage: number;
  }[];
}

export function ProjectMetrics() {
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    growth: 0,
    categories: [] as { name: string; count: number; percentage: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend API
        const response = await fetch('https://epg-backend.onrender.com/api/projects/metrics');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        setMetrics(result);
      } catch (error) {
        console.error('Error fetching project metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="bg-white rounded-xl shadow-sm p-6">Loading...</div>;
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