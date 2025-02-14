import React, { useState, useEffect } from 'react';
import { Upload, X, ExternalLink } from 'lucide-react';
import { CommentSection } from './CommentSection';

interface Project {
  id: string;
  name: string;
  contractor: string;
  scope: string | null;
  takeoff: string | null;
  blueprints: string | null;
}

interface TicketDetailsModalProps {
  projectId: string; // Pass the project ID to fetch data
  onClose: () => void;
  onAddComment: (content: string) => void;
}

export const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({ projectId, onClose, onAddComment }) => {
  const [project, setProject] = useState<Project | null>(null); // State to hold the project data
  const [editedProject, setEditedProject] = useState<Project | null>(null); // State for edited data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [file, setFile] = useState<File | null>(null); // State for the uploaded file

  // Fetch project data on component mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`https://epg-backend.onrender.com/api/project/takeoff/${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const data = await response.json();
        setProject(data);
        setEditedProject(data); // Initialize editedProject with fetched data
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({
      ...(prev as Project),
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle save button click
  const handleSave = async () => {
    if (!editedProject) return;

    try {
      const formData = new FormData();
      formData.append('contractor', editedProject.contractor);
      formData.append('scope', editedProject.scope || '');

      if (file) {
        formData.append('takeoff', file);
      }

      const response = await fetch(`https://epg-backend.onrender.com/api/project/takeoff/${projectId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const updatedData = await response.json();
      setProject(updatedData); // Update the project state with the new data
      setFile(null); // Reset the file state
      alert('Project updated successfully!');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project || !editedProject) {
    return <div>No project data found.</div>;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Edit Project</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            {/* Input fields for project details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedProject.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  disabled // Name is not editable based on your backend
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contractor</label>
                <input
                  type="text"
                  name="contractor"
                  value={editedProject.contractor}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Scope</label>
                <input
                  type="text"
                  name="scope"
                  value={editedProject.scope || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Blueprints</label>
                {project.blueprints ? (
                  <a
                    href={project.blueprints}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-orange-600 hover:text-orange-500"
                  >
                    <span>View Blueprints</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                ) : (
                  <p className="text-gray-500">No blueprints available</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Takeoff</label>
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500">
                        <span>Upload Takeoff</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG</p>
                    {file && (
                      <p className="text-sm text-gray-700 mt-2">Selected file: {file.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="inline-flex justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};