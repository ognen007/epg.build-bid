import React, { useState } from 'react';
import { Search, Pencil } from 'lucide-react';
import { TakeoffModal } from './TakeoffModal';

interface Takeoff {
  id: string;
  projectName: string;
  contractor: string;
  estimator: string;
}

const sampleTakeoffs: Takeoff[] = [
  {
    id: '1',
    projectName: 'City Center Mall Renovation',
    contractor: 'ABC Construction',
    estimator: 'John Smith'
  },
  {
    id: '2',
    projectName: 'Harbor Bridge Maintenance',
    contractor: 'XYZ Contractors',
    estimator: 'Sarah Johnson'
  }
];

export function TakeoffList() {
  const [takeoffs, setTakeoffs] = useState(sampleTakeoffs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTakeoff, setSelectedTakeoff] = useState<Takeoff | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    estimator: '',
    contractor: ''
  });

  const handleEditClick = (takeoff: Takeoff) => {
    setSelectedTakeoff(takeoff);
    setIsModalOpen(true);
  };

  const filteredTakeoffs = takeoffs.filter(takeoff => {
    const matchesSearch = takeoff.projectName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesEstimator = !filters.estimator || takeoff.estimator === filters.estimator;
    const matchesContractor = !filters.contractor || takeoff.contractor === filters.contractor;
    return matchesSearch && matchesEstimator && matchesContractor;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          
          <select
            className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            value={filters.contractor}
            onChange={(e) => setFilters({ ...filters, contractor: e.target.value })}
          >
            <option value="">All Contractors</option>
            <option value="ABC Construction">ABC Construction</option>
            <option value="XYZ Contractors">XYZ Contractors</option>
          </select>

          <select
            className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            value={filters.estimator}
            onChange={(e) => setFilters({ ...filters, estimator: e.target.value })}
          >
            <option value="">All Estimators</option>
            <option value="John Smith">John Smith</option>
            <option value="Sarah Johnson">Sarah Johnson</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contractor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estimator
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTakeoffs.map((takeoff) => (
              <tr key={takeoff.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {takeoff.projectName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {takeoff.contractor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {takeoff.estimator}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditClick(takeoff)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TakeoffModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTakeoff(null);
        }}
        takeoff={selectedTakeoff}
      />
    </div>
  );
}