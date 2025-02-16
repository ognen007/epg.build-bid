import axios from 'axios';
import { ProjectType } from '../../../types/project';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchProjects(): Promise<ProjectType[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/project/display`);
    const data = response.data.projects;

    if (!Array.isArray(data)) {
      throw new Error('Expected an array but got something else');
    }

    const formattedProjects: ProjectType[] = data.map((project: any) => ({ // Type 'any' should be replaced with the actual type from the backend
      id: project.id,
      name: project.name,
      contractor: project.contractor || null,
      status: project.status,
      stage: project.stage || '',
      valuation: project.valuation,
      deadline: new Date(project.deadline).toISOString(),
    }));

    return formattedProjects;
  } catch (error: any) {
      console.error('Error fetching projects:', error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error instanceof Error
          ? error.message
          : 'An unexpected error occurred';
      throw new Error(errorMessage); // Re-throw the error with a more specific message
  }
}
