import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { ExpertiseCategory } from '../../types/contractor';

const categories: ExpertiseCategory[] = [
  'Plumbing',
  'Electrical',
  'Construction',
  'HVAC',
  'Carpentry',
  'Painting',
  'Landscaping',
  'Roofing'
];

export function ContractorSearch() {
  const [selectedCategories, setSelectedCategories] = useState<ExpertiseCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (category: ExpertiseCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search contractors by name or location..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`
                px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${selectedCategories.includes(category)
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {category}
              {selectedCategories.includes(category) && (
                <X className="inline-block h-3 w-3 ml-1" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}