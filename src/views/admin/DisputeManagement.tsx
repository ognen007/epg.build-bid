import React, { useState } from 'react';
import { DisputeList } from '../../components/admin/disputes/DisputeList';
import { DisputeFilters } from '../../components/admin/disputes/DisputeFilters';
import { DisputeStats } from '../../components/admin/disputes/DisputeStats';

export function DisputeManagement() {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: ''
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dispute Management</h1>
      
      <DisputeStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <DisputeFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
        <div className="lg:col-span-3">
          <DisputeList filters={filters} />
        </div>
      </div>
    </div>
  );
}