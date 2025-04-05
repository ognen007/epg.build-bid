import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ProjectType } from '../../../types/project';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (project: Partial<ProjectType>) => void;
  projectId: string;
}

export function EditProjectModal({ isOpen, onClose, onUpdate, projectId }: EditProjectModalProps) {
  const [projectData, setProjectData] = useState<Partial<ProjectType> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !projectId) return;

    const fetchProject = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://epg-backend.onrender.com/api/project/display/${projectId}`);
        if (!response.ok) throw new Error('Failed to fetch project');
        const data = await response.json();
        setProjectData(data.projects);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [isOpen, projectId]);

  const handleChange = (field: keyof ProjectType, value: string) => {
    if (!projectData) return;
    setProjectData({ ...projectData, [field]: value });
  };

  const handleUpdateProject = async () => {
    if (!projectData) return;

    console.log('Updating project with ID:', projectId);
    console.log('Updated data:', projectData);

    try {
      // Pass only the updated data, not the entire object
      const response = await fetch(`https://epg-backend.onrender.com/api/project/display/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData), // Send the updated data in the body
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update project');
      }

      console.log('Project successfully updated');
      onUpdate(projectData);  // Call the onUpdate function to notify parent component
      onClose();  // Close the modal after the update
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md z-10">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Edit Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <p>Loading project...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : projectData ? (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={projectData.name || ''}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={projectData.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Contractor</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={projectData.contractor || ''}
                    onChange={(e) => handleChange('contractor', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Bid Amount</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={projectData.bidAmount || ''}
                    onChange={(e) => handleChange('bidAmount', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Bid Type</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={projectData.bidType || ''}
                    onChange={(e) => handleChange('bidType', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Valuation</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2"
                    value={projectData.valuation || ''}
                    onChange={(e) => handleChange('valuation', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Deadline</label>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2"
                    value={
                      projectData.deadline
                        ? new Date(projectData.deadline).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) => handleChange('deadline', e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateProject} // Directly call handleUpdateProject
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <p>No project data found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
