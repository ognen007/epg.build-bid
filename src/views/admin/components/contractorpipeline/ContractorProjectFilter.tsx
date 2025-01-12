import { useState } from 'react';

interface Contractor {
  id: string;
  name: string;
}

interface ContractorFiltersProps {
  filters: {
    name: string;
  };
  onFilterChange: (filters: { name: string }) => void;
  contractors: Contractor[]; // List of contractors to filter from
}

export function ContractorFilters({ filters, onFilterChange, contractors }: ContractorFiltersProps) {
  const [showDropdown, setShowDropdown] = useState(false); // Control dropdown visibility
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]); // Filtered contractors

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onFilterChange({ ...filters, name: value }); // Update filters

    // Filter contractors based on input
    if (value) {
      const filtered = contractors.filter((contractor) =>
        contractor.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredContractors(filtered);
      setShowDropdown(true); // Show dropdown if there are matches
    } else {
      setFilteredContractors([]);
      setShowDropdown(false); // Hide dropdown if input is empty
    }
  };

  // Handle contractor selection
  const handleContractorSelect = (contractor: Contractor) => {
    onFilterChange({ ...filters, name: contractor.name }); // Update filters with selected contractor
    setShowDropdown(false); // Hide dropdown after selection
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <input
          type="text"
          placeholder="Search contractors..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.name}
          onChange={handleInputChange}
        />

        {/* Dropdown for filtered contractors */}
        {showDropdown && filteredContractors.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredContractors.map((contractor) => (
              <div
                key={contractor.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleContractorSelect(contractor)}
              >
                {contractor.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}