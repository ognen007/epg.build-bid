import { Edit2, Trash2 } from 'lucide-react';
import { ProjectStatus } from './ProjectStatus';
import { ProjectType } from '../../../types/project';

interface ProjectRowProps {
  project: ProjectType;
  deleteProject: (id: string) => void; // This should accept a function that takes an id
}

export function ProjectRow({ project, deleteProject }: ProjectRowProps) {
  // Handle delete button click (stop event propagation to prevent row click)
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the row click event from firing
    deleteProject(project.id); // Call the delete function
  };

  return (
    <tr
      className="hover:bg-gray-50 cursor-pointer" // Add cursor-pointer for better UX
    >
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
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={(e) => e.stopPropagation()} // Prevent row click
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            className="text-gray-400 hover:text-red-500"
            onClick={handleDeleteClick} // Use handleDeleteClick
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}