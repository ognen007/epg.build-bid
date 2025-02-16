import axios from 'axios';
import { ProjectType } from '../../../types/project'; // Import your ProjectType

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchProjects(): Promise<ProjectType[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`); // Adjust endpoint if needed
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}


export async function deleteProject(projectId: string): Promise<void> {
  const isConfirmed = window.confirm("Are you sure you want to delete this project?");

  if (isConfirmed) {
    try {
      await axios.delete(`${API_BASE_URL}/project/delete/${projectId}`);
      console.log('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error; // Re-throw the error so the component can handle it
    }
  }
}
