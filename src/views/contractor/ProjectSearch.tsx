import React from 'react';
import { Search } from 'lucide-react';

interface ProjectSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProjectSearch({ searchQuery, onSearchChange }: ProjectSearchProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search your projects..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)} // Pass the search query to the parent
        />
      </div>
    </div>
  );
}