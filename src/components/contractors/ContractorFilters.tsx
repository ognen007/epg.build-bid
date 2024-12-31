import React from 'react';
import { Sliders } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: ContractorFilters) => void;
  filters: ContractorFilters;
}

export interface ContractorFilters {
  rating: number;
  availability: string;
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
  projectType: string;
}

export function ContractorFilters({ onFilterChange, filters }: FilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="h-5 w-5 text-gray-500" />
        <h3 className="font-medium text-gray-900">Filters</h3>
      </div>

      <div className="space-y-4">
        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Minimum Rating
          </label>
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            value={filters.rating}
            onChange={(e) => onFilterChange({ ...filters, rating: Number(e.target.value) })}
          >
            <option value="0">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.8">4.8+ Stars</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            value={filters.availability}
            onChange={(e) => onFilterChange({ ...filters, availability: e.target.value })}
          >
            <option value="">Any Availability</option>
            <option value="immediate">Available Immediately</option>
            <option value="thisWeek">This Week</option>
            <option value="nextWeek">Next Week</option>
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter city or zip code"
            className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          />
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hourly Rate Range
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              value={filters.priceRange.min || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                priceRange: { ...filters.priceRange, min: Number(e.target.value) }
              })}
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
              value={filters.priceRange.max || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                priceRange: { ...filters.priceRange, max: Number(e.target.value) }
              })}
            />
          </div>
        </div>

        {/* Project Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Type
          </label>
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            value={filters.projectType}
            onChange={(e) => onFilterChange({ ...filters, projectType: e.target.value })}
          >
            <option value="">Any Project Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>
      </div>
    </div>
  );
}