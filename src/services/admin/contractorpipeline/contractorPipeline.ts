import axios from 'axios';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchProjects() {
  try {
    const response = await axios.get(`${API_BASE_URL}/project/display`);
    if (response.data && Array.isArray(response.data.projects)) {
      return response.data.projects;
    } else {
      throw new Error('Invalid data format: Expected an array of projects');
    }
  } catch (err: any) {
    console.error('Error fetching projects:', err);
    throw err; // Re-throw the error
  }
}

export async function updateTaskStatusEndpoint(taskId: string, newHold: string, newStatus?: string): Promise<any> {
    try {
      const status = newStatus || "awaiting_takeoff";
      const response = await axios.put(`${API_BASE_URL}/projects/pipeline/${taskId}`, {
        hold: newHold,
        status: status,
      });
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Error response data:", error.response?.data);
      } else {
        console.error("Error updating task:", error);
      }
      throw error; // Re-throw the error
    }
  }

  export async function sendProjectToContractor(projectId: string): Promise<any> { // Replace 'any' with the actual return type from the backend
    try {
      const response = await axios.put(`${API_BASE_URL}/project/adminKanban/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error updating project status:', error);
      throw error; // Re-throw the error
    }
  }
  
  export async function fetchProjectDetails(taskId: string): Promise<any> { // Replace 'any' with the actual type from the backend
    try {
      const response = await axios.get(`${API_BASE_URL}/project/fetch/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching project details:", error);
      throw error; // Re-throw the error
    }
  }