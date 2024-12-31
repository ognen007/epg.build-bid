import React from 'react';
import { Search } from 'lucide-react';

interface ProjectFiltersProps {
  filters: {
    status: string;
    contractor: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

export function ProjectFilters({ filters, onFilterChange }: ProjectFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contractor</label>
        <select
          className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
          value={filters.contractor}
          onChange={(e) => onFilterChange({ ...filters, contractor: e.target.value })}
        >
          <option value="">All Contractors</option>
          <option value="assigned">Assigned Only</option>
          <option value="unassigned">Unassigned Only</option>
        </select>
      </div>
    </div>
  );
}