import React from 'react';
import { ProjectCategory } from '../../../types/analytics';

interface CategoryBarProps {
  category: ProjectCategory;
}

export function CategoryBar({ category }: CategoryBarProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{category.name}</span>
        <div className="text-right">
          <span className="text-lg font-semibold text-gray-900">
            {category.count}
          </span>
          <span className="text-sm text-gray-500 ml-2">
            ({category.percentage}%)
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-orange-500 h-2 rounded-full"
          style={{ width: `${category.percentage}%` }}
        />
      </div>
    </div>
  );
}