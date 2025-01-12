import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface TakeoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  takeoff: {
    id: string;
    projectName: string;
    contractor: string;
    estimator: string;
  } | null;
}

export function TakeoffModal({ isOpen, onClose, takeoff }: TakeoffModalProps) {
  const [formData, setFormData] = useState({
    contractor: takeoff?.contractor || '',
    scope: '',
    estimator: takeoff?.estimator || '',
    blueprints: null as File | null,
    takeoffFile: null as File | null,
    estimatorNotes: '', // Add estimatorNotes to formData
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Edit Takeoff</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contractor</label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.contractor}
                onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
              >
                <option value="">Select Contractor</option>
                <option value="ABC Construction">ABC Construction</option>
                <option value="XYZ Contractors">XYZ Contractors</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Scope</label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
              >
                <option value="">Select Scope</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="hvac">HVAC</option>
                <option value="structural">Structural</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estimator</label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.estimator}
                onChange={(e) => setFormData({ ...formData, estimator: e.target.value })}
              >
                <option value="">Select Estimator</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
              </select>
            </div>

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
                        onChange={(e) => setFormData({ ...formData, blueprints: e.target.files?.[0] || null })}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Takeoff File</label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500">
                      <span>Upload takeoff</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.xlsx,.xls"
                        onChange={(e) => setFormData({ ...formData, takeoffFile: e.target.files?.[0] || null })}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF, Excel files up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Estimator Notes Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimator Notes</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter estimator notes..."
                value={formData.estimatorNotes}
                onChange={(e) => setFormData({ ...formData, estimatorNotes: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}