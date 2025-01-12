import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Pencil } from 'lucide-react';
import { TakeoffModal } from './TakeoffModal';

interface Takeoff {
  id: string;
  name: string;
  contractor: string;
  estimator: string;
  scope?: string;
  takeoff?: string;
  estimatorNotes?: string;
}

export function TakeoffList() {
  const [takeoffs, setTakeoffs] = useState<Takeoff[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTakeoff, setSelectedTakeoff] = useState<Takeoff | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    contractor: '',
    estimator: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all takeoffs on component mount
  useEffect(() => {
    const fetchTakeoffs = async () => {
      try {
        const response = await axios.get('https://epg-backend.onrender.com/api/project/takeoff/all');
        setTakeoffs(response.data);
      } catch (err) {
        setError('Failed to fetch takeoffs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTakeoffs();
  }, []);

  // Get unique contractors and estimators from the takeoffs
  const contractors = Array.from(new Set(takeoffs.map((takeoff) => takeoff.contractor)));
  const estimators = Array.from(new Set(takeoffs.map((takeoff) => takeoff.estimator)));

  // Handle editing a takeoff
  const handleEditClick = async (takeoff: Takeoff) => {
    try {
      // Fetch detailed data for the selected takeoff
      const response = await axios.get(`https://epg-backend.onrender.com/api/project/takeoff/${takeoff.id}`);
      setSelectedTakeoff(response.data);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to fetch takeoff details');
      console.error(err);
    }
  };

  // Handle saving changes
  const handleSaveChanges = async (updatedData: any) => {
    try {
      if (!selectedTakeoff) return;

      // Send the updated data to the backend
      const response = await axios.put(`https://epg-backend.onrender.com/api/project/takeoff/${selectedTakeoff.id}`, updatedData);

      // Update the local state with the new data
      setTakeoffs((prev) =>
        prev.map((takeoff) =>
          takeoff.id === selectedTakeoff.id ? { ...takeoff, ...response.data } : takeoff
        )
      );

      // Close the modal
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to update takeoff');
      console.error(err);
    }
  };

  // Filter takeoffs based on search and filters
  const filteredTakeoffs = takeoffs.filter((takeoff) => {
    const matchesSearch = takeoff.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesContractor = !filters.contractor || takeoff.contractor === filters.contractor;
    const matchesEstimator = !filters.estimator || takeoff.estimator === filters.estimator;
    return matchesSearch && matchesContractor && matchesEstimator;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
            {contractors.map((contractor, index) => (
              <option key={index} value={contractor}>
                {contractor}
              </option>
            ))}
          </select>

          <select
            className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            value={filters.estimator}
            onChange={(e) => setFilters({ ...filters, estimator: e.target.value })}
          >
            <option value="">All Estimators</option>
            {estimators.map((estimator, index) => (
              <option key={index} value={estimator}>
                {estimator}
              </option>
            ))}
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
                  {takeoff.name}
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
        onSave={handleSaveChanges}
      />
    </div>
  );
}