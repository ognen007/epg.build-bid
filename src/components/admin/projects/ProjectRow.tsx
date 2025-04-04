import { Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ProjectStatus } from './ProjectStatus';
import { ProjectType } from '../../../types/project';
import { EditProjectModal } from './EditProjectModal'; // Import the modal component

interface ProjectRowProps {
  project: ProjectType;
  deleteProject: (id: string) => void; 
  editProject: (id:string) => void;
}

export function ProjectRow({ project, deleteProject, editProject }: ProjectRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Handle delete button click (stop event propagation to prevent row click)
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the row click event from firing
    deleteProject(project.id); // Call the delete function
  };

  // Open the modal
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the row click event from firing
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Handle project update
  const handleUpdateProject = (updatedProject: Partial<ProjectType>) => {
    console.log('Project updated:', updatedProject);
    editProject(project.id)
    setIsModalOpen(false); // Close the modal after updating
  };

  return (
    <>
      <tr className="hover:bg-gray-50 cursor-pointer">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{project.name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {project.contractor ? (
            <div className="text-sm text-gray-500">{project.contractor}</div>
          ) : (
            <span className="text-sm text-gray-400">Not assigned</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <ProjectStatus status={project.status} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {new Date(project.deadline).toLocaleDateString()}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">${project.valuation}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="flex items-center justify-end space-x-2">
            {/* Edit Button */}
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={handleEditClick} // Open the modal
            >
              <Edit2 className="h-4 w-4" />
            </button>

            {/* Delete Button */}
            <button
              className="text-gray-400 hover:text-red-500"
              onClick={handleDeleteClick} // Delete the project
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Edit Project Modal */}
      {isModalOpen && (
        <EditProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleUpdateProject}
          projectId={project.id} // Pass the project ID to the modal
        />
      )}
    </>
  );
}