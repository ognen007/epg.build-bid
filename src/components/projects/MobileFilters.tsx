import React from 'react';
import { Sliders, X } from 'lucide-react';
import { ProjectFilters } from './ProjectFilters';
import { ProjectFilters as FilterType } from './ProjectFilters';

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterType;
  onFilterChange: (filters: FilterType) => void;
}

export function MobileFilters({ isOpen, onClose, filters, onFilterChange }: MobileFiltersProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium text-gray-900">Filters</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-auto">
          <ProjectFilters
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>
    </div>
  );
}