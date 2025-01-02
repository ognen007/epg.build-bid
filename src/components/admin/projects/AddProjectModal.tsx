import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ProjectType } from '../../../types/project';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Omit<ProjectType, 'id'>) => void;
}

const contractorOptions = ['Contractor 1', 'Contractor 2', 'Contractor 3'];

export function AddProjectModal({ isOpen, onClose, onAdd }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    contractor: '',
    status: 'pending' as ProjectType['status'],
    deadline: '',
    dropboxLink: '',
    description: '',
  });

  const [filteredContractors, setFilteredContractors] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading state
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      // Send the data to your backend
      const response = await fetch('/api/project/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      // Parse response and trigger the onAdd callback
      const data = await response.json();
      onAdd(formData); // Notify the parent that the project was added

      // Reset form data
      setFormData({
        name: '',
        client: '',
        contractor: '',
        status: 'pending',
        deadline: '',
        dropboxLink: '',
        description: '',
      });
      setShowDropdown(false);

      // Close modal after successful submission
      onClose();
    } catch (err) {
      setError('Failed to create project. Please try again.');
      console.error(err);
    } finally {
      // Hide loading state
      setLoading(false);
    }
  };

  const handleContractorInputChange = (input: string) => {
    setFormData({ ...formData, contractor: input });
    if (input.trim() === '') {
      setShowDropdown(false);
      return;
    }

    const matches = contractorOptions.filter((option) =>
      option.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredContractors(matches);
    setShowDropdown(matches.length > 0);
  };

  const handleSelectContractor = (contractor: string) => {
    setFormData({ ...formData, contractor });
    setShowDropdown(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add New Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Contractor</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.contractor}
                onChange={(e) => handleContractorInputChange(e.target.value)}
                onFocus={() => setShowDropdown(filteredContractors.length > 0)}
              />
              {showDropdown && (
                <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                  {filteredContractors.map((contractor) => (
                    <li
                      key={contractor}
                      className="cursor-pointer px-4 py-2 hover:bg-orange-100"
                      onClick={() => handleSelectContractor(contractor)}
                    >
                      {contractor}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectType['status'] })}
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Attach Dropbox link</label>
              <input
                type="url"
                placeholder="https://example.com"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.dropboxLink}
                onChange={(e) => setFormData({ ...formData, dropboxLink: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Enter project description..."
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600"
              >
                {loading ? 'Adding Project...' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
