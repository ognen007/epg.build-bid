import React from 'react';
import { Sliders } from 'lucide-react';

export interface ProjectFilters {
  status: string[];
  minBudget: number;
  maxBudget: number;
  location: string;
}

interface ProjectFiltersProps {
  filters: ProjectFilters;
  onFilterChange: (filters: ProjectFilters) => void;
}

export function ProjectFilters({ filters, onFilterChange }: ProjectFiltersProps) {
  const handleStatusChange = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFilterChange({ ...filters, status: newStatuses });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium text-gray-900">Filters</h3>
      </div>

      <div className="space-y-6">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Status
          </label>
          <div className="space-y-2">
            {['active', 'pending', 'completed'].map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status)}
                  onChange={() => handleStatusChange(status)}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min Budget"
              value={filters.minBudget || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                minBudget: Number(e.target.value)
              })}
              className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
            <input
              type="number"
              placeholder="Max Budget"
              value={filters.maxBudget || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                maxBudget: Number(e.target.value)
              })}
              className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => onFilterChange({
              ...filters,
              location: e.target.value
            })}
            className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  );
}