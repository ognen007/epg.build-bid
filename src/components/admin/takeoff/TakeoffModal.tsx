import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

interface TakeoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  takeoff: {
    id: string;
    name: string;
    contractor: string;
    scope: string;
    estimator: string;
    takeoff: string;
    blueprints: string;
    estimatorNotes: string;
  } | null;
  onSave: (data: any) => void;
}

export function TakeoffModal({ isOpen, onClose, takeoff, onSave }: TakeoffModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    contractor: "",
    scope: "",
    estimator: "",
    blueprintsFile: null as File | null,
    takeoffFile: null as File | null,
    estimatorNotes: "",
  });

  // Update formData when takeoff prop changes
  useEffect(() => {
    if (takeoff) {
      setFormData({
        name: takeoff.name || "",
        contractor: takeoff.contractor || "",
        scope: takeoff.scope || "",
        estimator: takeoff.estimator || "",
        takeoffFile: null,
        blueprintsFile: null,
        estimatorNotes: takeoff.estimatorNotes || "",
      });
    }
  }, [takeoff]);

  if (!isOpen || !takeoff) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("contractor", formData.contractor);
      formDataToSend.append("scope", formData.scope);
      formDataToSend.append("estimator", formData.estimator);
      formDataToSend.append("estimatorNotes", formData.estimatorNotes);

      // Append files if they exist
      if (formData.takeoffFile) {
        formDataToSend.append("takeoffFile", formData.takeoffFile);
      }
      if (formData.blueprintsFile) {
        formDataToSend.append("blueprintsFile", formData.blueprintsFile);
      }

      // Log the FormData object for debugging
      for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      // Send the form data to the backend
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/takeoff/projects/${takeoff.id}`,
        formDataToSend
      );

      // Call the onSave callback with the updated data
      onSave(response.data);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating project:", error);
      if (error) {
        alert(`Failed to update project: ${error}`);
      } else {
        alert("Failed to update project. Please try again later.");
      }
    }
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
            {/* Form fields for name, contractor, scope, estimator */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contractor</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.contractor}
                onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Scope</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estimator</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.estimator}
                onChange={(e) => setFormData({ ...formData, estimator: e.target.value })}
              />
            </div>

            {/* File upload fields */}
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
                  <p className="text-xs text-gray-500">PDF, Excel files</p>
                </div>
              </div>
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
                        onChange={(e) => setFormData({ ...formData, blueprintsFile: e.target.files?.[0] || null })}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
                </div>
              </div>
            </div>

            {/* Estimator Notes */}
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

            {/* Buttons */}
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