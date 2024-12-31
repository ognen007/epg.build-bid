import React from 'react';
import { Search, Sliders } from 'lucide-react';

interface Filters {
  search: string;
  budgetRange: {
    min: number;
    max: number;
  };
  industry: string;
  deadline: string;
}

interface JobFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function JobFilters({ filters, onFilterChange }: JobFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget Range
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Min"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={filters.budgetRange.min || ''}
            onChange={(e) => onFilterChange({
              ...filters,
              budgetRange: { ...filters.budgetRange, min: Number(e.target.value) }
            })}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={filters.budgetRange.max || ''}
            onChange={(e) => onFilterChange({
              ...filters,
              budgetRange: { ...filters.budgetRange, max: Number(e.target.value) }
            })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.industry}
          onChange={(e) => onFilterChange({ ...filters, industry: e.target.value })}
        >
          <option value="">All Industries</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="industrial">Industrial</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deadline
        </label>
        <input
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.deadline}
          onChange={(e) => onFilterChange({ ...filters, deadline: e.target.value })}
        />
      </div>
    </div>
  );
}