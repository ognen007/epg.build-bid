import axios from 'axios';
import { ProjectType } from '../../../types/project';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchContractorIdByEmail(email: string): Promise<string | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/contractor/id`);

    if (!Array.isArray(response.data)) {
      console.error("Unexpected response format:", response.data);
      return null;
    }

    const loggedInContractor = response.data.find((c: any) => c.email === email);
    return loggedInContractor?.id || null; // Ensure null is returned if not found
  } catch (err) {
    console.error("Error fetching contractor ID:", err);
    return null;
  }
}

export async function fetchProjectsByContractor(fullName: string): Promise<ProjectType[]> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/project/contractor/${encodeURIComponent(fullName)}`
    );

    if (response.status === 200 && response.data?.projects) {
      return response.data.projects;
    }

    console.warn("No projects found or invalid response, returning empty list.");
    return [];
  } catch (err: any) {
    console.error("Error fetching projects:", err);
    return []; // Return an empty array instead of throwing an error
  }
}

export async function updateProjectStatus(taskId: string): Promise<any> { 
  try {
    const response = await axios.put(
      `${API_BASE_URL}/projects/hold/${taskId}`,
      { status: "takeoff_in_progress", hold: "takeoff_in_progress" }
    );

    return response.data ?? {}; // Return empty object if response is missing
  } catch (error) {
    console.error("Error updating task status:", error);
    return { error: "Failed to update task" }; // Return an error object instead of throwing
  }
}

export async function denyProjectStatus(taskId: string): Promise<any> { 
  try {
    const response = await axios.put(
      `${API_BASE_URL}/projects/hold/${taskId}`,
      { status: "denied", hold: "denied" }
    );

    return response.data ?? {}; // Return empty object if response is missing
  } catch (error) {
    console.error("Error updating task status:", error);
    return { error: "Failed to update task" }; // Return an error object instead of throwing
  }
}

export async function fetchContractorDataByEmail(email: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/contractor/id`);

    if (!Array.isArray(response.data)) {
      console.error("Unexpected response format:", response.data);
      return null;
    }

    const loggedInContractor = response.data.find((c) => c.email === email);
    return loggedInContractor || null;
  } catch (err: any) {
    console.error("Error fetching contractor data:", err);
    return null;
  }
}
