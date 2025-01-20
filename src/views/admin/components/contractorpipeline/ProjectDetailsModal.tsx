import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, ExternalLink } from "lucide-react";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: any; // Pass the task ID as a prop
}

export function ProjectDetailsModal({ isOpen, onClose, taskId }: ProjectDetailsModalProps) {
  const [project, setProject] = useState<any>(null);

  // Fetch project details when the taskId changes
  useEffect(() => {
    if (!taskId) return;

    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `https://epg-backend.onrender.com/api/project/fetch/${taskId}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [taskId]);

  // Don't render the modal if it's not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        {/* Modal content */}
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          {/* Modal header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6 space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <p className="mt-1 text-sm text-gray-900">{project?.name || "N/A"}</p>
            </div>

            {/* Valuation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Valuation</label>
              <p className="mt-1 text-sm text-gray-900">
                ${project?.valuation?.toLocaleString() || "N/A"}
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <p className="mt-1 text-sm text-gray-900">{project?.description || "N/A"}</p>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <p className="mt-1 text-sm text-gray-900">
                {project?.deadline ? new Date(project.deadline).toLocaleDateString() : "N/A"}
              </p>
            </div>

            {/* File Sections */}
            <div className="space-y-4">
              {/* Blueprints */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Blueprints</label>
                {project?.blueprints ? (
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

              {/* Takeoff */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Takeoff</label>
                {project?.takeoff ? (
                  <a
                    href={project.takeoff}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-orange-600 hover:text-orange-500"
                  >
                    <span>View Takeoff</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                ) : (
                  <p className="text-gray-500">No takeoff available</p>
                )}
              </div>

              {/* Proposal */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Proposal</label>
                {project?.proposal ? (
                  <a
                    href={project.proposal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-orange-600 hover:text-orange-500"
                  >
                    <span>View Proposal</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                ) : (
                  <p className="text-gray-500">No proposal available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}