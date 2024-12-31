import React, { useState } from 'react';
import { ContractorSearch } from '../../components/contractors/ContractorSearch';
import { ContractorGrid } from '../../components/contractors/ContractorGrid';
import { ContractorFilters, ContractorFilters as FilterType } from '../../components/contractors/ContractorFilters';

export function ContractorsView() {
  const [filters, setFilters] = useState<FilterType>({
    rating: 0,
    availability: '',
    location: '',
    priceRange: { min: 0, max: 0 },
    projectType: ''
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ContractorSearch />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ContractorFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
        <div className="lg:col-span-3">
          <ContractorGrid filters={filters} />
        </div>
      </div>
    </div>
  );
}