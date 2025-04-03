import React, { useState, useEffect } from 'react';
import { DollarSign, Upload, X } from 'lucide-react';
import { ProjectType } from '../../../types/project';
import { createProjectModal, fetchContractorsProjectModal } from '../../../services/admin/projects/addProjectEndpoint';

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
    blueprintsFile: null as File | null,
  });

  const [contractors, setContractors] = useState<{ id: string; fullName: string }[]>([]);
  const [loadingContractors, setLoadingContractors] = useState(false);
  const [filteredContractors, setFilteredContractors] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createProjectTracker(projectName:string, description:string) {
    try {
      // Validate required fields
      if (!projectName || !description) {
        throw new Error("Missing required fields");
      }
  
      // Make a POST request to the backend API
      const response = await fetch(`https://epg-backend.onrender.com/api/project/create/${projectName}/${description}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectName, description }),
      });
  
      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create project");
      }
  
      // Parse and return the response data
      const data = await response.json();
      console.log("Project created successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error; // Re-throw the error for further handling
    }
  }

  useEffect(() => {
    async function loadContractors() {
      if (isOpen) {
        setLoadingContractors(true);
        try {
          const fetchedContractors = await fetchContractorsProjectModal();
          setContractors(fetchedContractors);
        } catch (error) {
          console.log(error)
        } finally {
          setLoadingContractors(false);
        }
      }
    }
    loadContractors();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      if (formData.blueprintsFile) {
        formDataToSend.append('blueprintsFile', formData.blueprintsFile);
      }

      const response = await fetch('https://epg-backend.onrender.com/api/project/create', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Failed to create project');
      createProjectTracker(formData.name, formData.description)
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Total Project Valuation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Project Valuation
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="block w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.valuation}
                  onChange={(e) => setFormData({ ...formData, valuation: e.target.value })}
                />
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
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
              />
            </div>

            {/* Bid Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Bid Amount</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="block w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.bidAmount}
                  onChange={(e) => setFormData({ ...formData, bidAmount: e.target.value })}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectType['status'] })}
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
                <option value="denied">Denied</option>
              </select>
            </div>

            {/* Bid Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Bid Type</label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.bidType}
                onChange={(e) => setFormData({ ...formData, bidType: e.target.value })}
              >
                <option value="gc_bidding">GC Bidding</option>
                <option value="sub_bidding">Sub Bidding</option>
              </select>
            </div>

            {/* High Intent */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="highIntent"
                className="h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                checked={formData.highIntent}
                onChange={(e) => setFormData({ ...formData, highIntent: e.target.checked })}
              />
              <label htmlFor="highIntent" className="ml-2 text-sm text-gray-700">
                High Intent
              </label>
            </div>

            {/* Blueprints */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blueprints</label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500">
                      <span>Upload blueprints</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
                  {formData.blueprintsFile && (
                    <p className="text-sm text-gray-700 mt-2">
                      Selected file: {formData.blueprintsFile.name}
                    </p>
                  )}
                </div>
              </div>
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