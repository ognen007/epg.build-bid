import React, { useState, useEffect } from 'react';
import { DollarSign, Upload, X } from 'lucide-react';
import { ProjectType } from '../../../types/project';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Omit<ProjectType, 'id'>) => void;
}

export function AddProjectModal({ isOpen, onClose, onAdd }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    contractor: '',
    status: 'awaiting_approval' as ProjectType['status'],
    bidType: 'gc_bidding',
    bidAmount: '',
    deadline: '',
    valuation: '',
    description: '',
    highIntent: false,
    estimator: '',
    estimatorNotes: '',
    blueprintsFile: null as File | null,
  });

  const [contractors, setContractors] = useState<{ id: string; fullName: string }[]>([]);
  const [loadingContractors, setLoadingContractors] = useState(false);
  const [filteredContractors, setFilteredContractors] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setLoadingContractors(true);
      fetch('https://epg-backend.onrender.com/api/contractors/name')
        .then((response) => response.json())
        .then((data) => {
          setContractors(data);
          setLoadingContractors(false);
        })
        .catch((err) => {
          console.error('Error fetching contractors:', err);
          setLoadingContractors(false);
        });
    }
  }, [isOpen]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Required fields validation
    if (!formData.contractor.trim()) errors.contractor = 'Contractor is required';
    if (!formData.name.trim()) errors.name = 'Project name is required';
    if (!formData.deadline.trim()) errors.deadline = 'Deadline is required';
    if (!formData.description.trim()) errors.description = 'Project description is required';
    if (!formData.status.trim()) errors.status = 'Status is required';
    if (!formData.bidType.trim()) errors.bidType = 'Bid type is required';
    if (!formData.estimator.trim()) errors.estimator = 'Estimator is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('contractor', formData.contractor);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('bidType', formData.bidType);
      formDataToSend.append('bidAmount', formData.bidAmount);
      formDataToSend.append('deadline', formData.deadline);
      formDataToSend.append('valuation', formData.valuation);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('highIntent', String(formData.highIntent));
      formDataToSend.append('estimator', formData.estimator);
      formDataToSend.append('estimatorNotes', formData.estimatorNotes);
      if (formData.blueprintsFile) {
        formDataToSend.append('blueprintsFile', formData.blueprintsFile);
      }

      const response = await fetch('https://epg-backend.onrender.com/api/project/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to create project');

      const data = await response.json();
      onAdd(formData);
      setFormData({
        name: '',
        contractor: '',
        status: 'awaiting_approval',
        bidType: 'gc_bidding',
        bidAmount: '',
        deadline: '',
        valuation: '',
        description: '',
        highIntent: false,
        estimator: '',
        estimatorNotes: '',
        blueprintsFile: null,
      });
      setShowDropdown(false);
      onClose();
    } catch (err) {
      setError('Failed to create project. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleContractorInputChange = (input: string) => {
    setFormData({ ...formData, contractor: input });
    if (input.trim() === '') {
      setShowDropdown(false);
      return;
    }

    const matches = contractors
      .filter((contractor) =>
        contractor.fullName.toLowerCase().includes(input.toLowerCase())
      )
      .map((contractor) => contractor.fullName);

    setFilteredContractors(matches);
    setShowDropdown(matches.length > 0);
  };

  const handleSelectContractor = (contractor: string) => {
    setFormData({ ...formData, contractor });
    setShowDropdown(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, blueprintsFile: file });
  };

  if (!isOpen) return null;

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
            {/* Contractor */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">Contractor</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.contractor}
                onChange={(e) => handleContractorInputChange(e.target.value)}
                onFocus={() => setShowDropdown(filteredContractors.length > 0)}
                required
              />
              {validationErrors.contractor && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.contractor}</p>
              )}
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
              />
              {validationErrors.deadline && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.deadline}</p>
              )}
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Description</label>
              <textarea
                placeholder="Enter project description..."
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              {validationErrors.description && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectType['status'] })}
                required
              >
                <option value="awaiting_approval">Awaiting Approval</option>
                <option value="awaiting_takeoff">Awaiting Takeoff</option>
                <option value="takeoff_in_progress">Takeoff in Progress</option>
                <option value="takeoff_complete">Takeoff Complete</option>
                <option value="bid_recieved">Bid Received</option>
                <option value="bid_submitted">Bid Submitted</option>
                <option value="abandoned">Abandoned</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
              {validationErrors.status && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.status}</p>
              )}
            </div>

            {/* Bid Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Bid Type</label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.bidType}
                onChange={(e) => setFormData({ ...formData, bidType: e.target.value })}
                required
              >
                <option value="gc_bidding">GC Bidding</option>
                <option value="sub_bidding">Sub Bidding</option>
              </select>
              {validationErrors.bidType && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.bidType}</p>
              )}
            </div>

            {/* Estimator */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Estimator</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.estimator}
                onChange={(e) => setFormData({ ...formData, estimator: e.target.value })}
                required
              />
              {validationErrors.estimator && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.estimator}</p>
              )}
            </div>

            {/* Non-required fields (e.g., Bid Amount, Estimator Notes, High Intent, Blueprints) */}
            {/* ... (keep the existing code for non-required fields) ... */}

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