import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ProjectMetric {
  category: string;
  count: number;
  value: number;
  growth: number;
}

const metrics: ProjectMetric[] = [
  { category: 'Residential', count: 85, value: 450000, growth: 12 },
  { category: 'Commercial', count: 65, value: 850000, growth: 8 },
  { category: 'Industrial', count: 35, value: 650000, growth: 15 }
];

export function ProjectMetrics() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Project Metrics</h2>
        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center">
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.category} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{metric.category}</h3>
                <div className="mt-1 text-2xl font-semibold text-gray-900">
                  ${metric.value.toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{metric.count} projects</div>
                <div className="text-sm text-green-600">+{metric.growth}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}