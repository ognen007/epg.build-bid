import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Contractor {
  id: string;
  fullName: string; // Updated to match the API response
}

interface ContractorFiltersProps {
  selectedContractorId?: string; // Optional selected contractor ID
  onSelect: (contractorId: string) => void; // Callback for contractor selection
}

export function ContractorFilters({ selectedContractorId, onSelect }: ContractorFiltersProps) {
  const [contractors, setContractors] = useState<Contractor[]>([]); // Initialize as empty array
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([]);

  // Fetch contractors from the backend
  useEffect(() => {
    axios.get('https://epg-backend.onrender.com/api/contractors/name')
      .then(response => {
        // Log the response to verify its structure
        console.log('API Response:', response.data);

        // Ensure the response is an array
        if (Array.isArray(response.data)) {
          setContractors(response.data);
        } else {
          console.error('Invalid API response format:', response.data);
          setContractors([]); // Fallback to empty array
        }
      })
      .catch(err => {
        console.error('Error fetching contractors:', err);
        setContractors([]); // Fallback to empty array
      });
  }, []);

  // Filter contractors based on search term
  useEffect(() => {
    if (searchTerm && Array.isArray(contractors)) {
      setFilteredContractors(
        contractors.filter(contractor =>
          contractor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredContractors([]);
    }
  }, [contractors, searchTerm]);

  // Handle input change in the search bar
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle contractor selection from the dropdown
  const handleContractorSelect = (contractor: Contractor) => {
    onSelect(contractor.id); // Notify parent component of the selected contractor
    setSearchTerm(''); // Clear the search term after selection
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <input
          type="text"
          placeholder="Search contractors..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {/* Dropdown for filtered contractors */}
        {searchTerm && filteredContractors.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredContractors.map(contractor => (
              <div
                key={contractor.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleContractorSelect(contractor)}
              >
                {contractor.fullName} {/* Updated to match the API response */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}