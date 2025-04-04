import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ProjectType } from '../../../types/project';
import { fetchContractorsProjectModal } from '../../../services/admin/projects/addProjectEndpoint';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (project: Partial<ProjectType>) => void;
  projectId: string;
}

export function EditProjectModal({ isOpen, onClose, onUpdate, projectId }: EditProjectModalProps) {
  const [formData, setFormData] = useState<Partial<ProjectType>>({
    name: '',
    contractor: '',
    status: '',
    bidType: '',
    bidAmount: '',
    deadline: '',
    valuation: '',
    description: '',
    highIntent: false,
    blueprintsFile: null,
  });

  const [contractors, setContractors] = useState<{ id: string; fullName: string }[]>([]);
  const [loadingContractors, setLoadingContractors] = useState(false);
  const [filteredContractors, setFilteredContractors] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch contractors when the modal opens
  useEffect(() => {
    async function loadContractors() {
      if (isOpen) {
        setLoadingContractors(true);
        try {
          const fetchedContractors = await fetchContractorsProjectModal();
          console.log('Fetched Contractors:', fetchedContractors); // Debugging log
          setContractors(fetchedContractors);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingContractors(false);
        }
      }
    }
    loadContractors();
  }, [isOpen]);

  // Fetch project data when the modal opens or projectId changes
  useEffect(() => {
    async function fetchProjectData() {
      if (!projectId || !isOpen) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://epg-backend.onrender.com/api/project/display/${projectId}`);
        if (!response.ok) throw new Error('Failed to fetch project data');
        const projectData = await response.json();

        console.log('API Response:', projectData); // Debugging log

        // Ensure all fields are properly mapped and handle null/undefined values
        setFormData({
          name: projectData.name || '',
          contractor: projectData.contractor || '',
          status: projectData.status || 'awaiting_approval', // Default status
          bidType: projectData.bidType || 'gc_bidding', // Default bid type
          bidAmount: projectData.bidAmount?.toString() || '',
          deadline: projectData.deadline || '',
          valuation: projectData.valuation?.toString() || '',
          description: projectData.description || '',
          highIntent: projectData.highIntent || false,
          blueprintsFile: null,
        });
      } catch (err) {
        setError('Failed to fetch project data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjectData();
  }, [projectId, isOpen]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name || '');
      formDataToSend.append('contractor', formData.contractor || '');
      formDataToSend.append('status', formData.status || 'awaiting_approval');
      formDataToSend.append('bidType', formData.bidType || 'gc_bidding');
      formDataToSend.append('bidAmount', formData.bidAmount || '');
      formDataToSend.append('deadline', formData.deadline || '');
      formDataToSend.append('valuation', formData.valuation || '');
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('highIntent', String(formData.highIntent || false));
      if (formData.blueprintsFile) {
        formDataToSend.append('blueprintsFile', formData.blueprintsFile);
      }

      const response = await fetch(`https://epg-backend.onrender.com/api/project/update/${projectId}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to update project');

      onUpdate(formData as Partial<ProjectType>);
      onClose();
    } catch (err) {
      setError('Failed to update project. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle contractor input change and filter dropdown options
  const handleContractorInputChange = (input: string) => {
    setFormData({ ...formData, contractor: input });
    if (input.trim() === '') {
      setShowDropdown(false);
      return;
    }
    const matches = contractors
      .filter((contractor) => contractor.fullName.toLowerCase().includes(input.toLowerCase()))
      .map((contractor) => contractor.fullName);
    setFilteredContractors(matches);
    setShowDropdown(matches.length > 0);
  };

  // Handle contractor selection from dropdown
  const handleSelectContractor = (contractor: string) => {
    setFormData({ ...formData, contractor });
    setShowDropdown(false);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, blueprintsFile: file });
  };

  // Do not render if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Edit Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Contractor */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Contractor</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.contractor || ''}
                onChange={(e) => handleContractorInputChange(e.target.value)}
                onFocus={() => setShowDropdown(filteredContractors.length > 0)}
              />
              {loadingContractors && <p>Loading contractors...</p>}
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

            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.status || ''}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="awaiting_approval">Awaiting Approval</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Bid Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Bid Type</label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.bidType || ''}
                onChange={(e) => setFormData({ ...formData, bidType: e.target.value })}
              >
                <option value="gc_bidding">GC Bidding</option>
                <option value="subcontractor_bidding">Subcontractor Bidding</option>
              </select>
            </div>

            {/* Bid Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Bid Amount</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.bidAmount || ''}
                onChange={(e) => setFormData({ ...formData, bidAmount: e.target.value })}
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.deadline || ''}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>

            {/* Valuation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Valuation</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.valuation || ''}
                onChange={(e) => setFormData({ ...formData, valuation: e.target.value })}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* High Intent */}
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-orange-500 shadow-sm focus:ring-orange-500"
                  checked={!!formData.highIntent}
                  onChange={(e) => setFormData({ ...formData, highIntent: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-700">High Intent</span>
              </label>
            </div>

            {/* Blueprints File */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Blueprints File</label>
              <input
                type="file"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                onChange={handleFileChange}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
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
                {loading ? 'Updating Project...' : 'Update Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}