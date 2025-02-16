import { ProjectRow } from './ProjectRow';
import { ProjectType } from '../../../types/project';
import { deleteProject } from '../../../services/admin/projects/projectTableEndpoint';

interface ProjectTableProps {
  projects: ProjectType[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  console.log('Projects:', projects); 
  
    const handleDeleteProject = async (projectId: string) => {
      try {
        await deleteProject(projectId); 
      } catch (error: any) {
      }
    };
  

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contractor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valuation
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectRow key={project.id} project={project} deleteProject={handleDeleteProject}/>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No projects available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
