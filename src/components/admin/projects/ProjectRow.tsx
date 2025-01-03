import React from 'react';
import { Eye, Edit2, Trash2, UserPlus } from 'lucide-react';
import { ProjectStatus } from './ProjectStatus';
import { ProjectType } from '../../../types/project';

interface ProjectRowProps {
  project: ProjectType;
}

export function ProjectRow({ project }: ProjectRowProps) {
  return (
    <tr className="hover:bg-gray-50">
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
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button className="text-gray-400 hover:text-gray-500">
            <Eye className="h-4 w-4" />
          </button>
          <button className="text-gray-400 hover:text-gray-500">
            <Edit2 className="h-4 w-4" />
          </button>
          <button className="text-gray-400 hover:text-gray-500">
            <UserPlus className="h-4 w-4" />
          </button>
          <button className="text-gray-400 hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}