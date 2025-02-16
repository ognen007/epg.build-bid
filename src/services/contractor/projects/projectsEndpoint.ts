import axios from 'axios';
import { ProjectType } from '../../../types/project';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchContractorIdByEmail(email: string): Promise<string | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/contractor/id`);
    const loggedInContractor = response.data.find((c: any) => c.email === email); // Type 'any' should be replaced with the actual type

    if (!loggedInContractor) {
      return null;
    }
    return loggedInContractor.id;
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

    if (response.status === 200) {
      return response.data.projects;
    } else if (response.status === 404) {
      console.warn("No projects found, setting an empty list.");
      return [];
    } else {
      console.error("Unexpected status code:", response.status); // Log unexpected status codes
      throw new Error("Failed to fetch projects"); // Re-throw the error
    }
  } catch (err: any) {
    console.error("Error fetching projects:", err);
    throw new Error("Failed to fetch projects"); // Re-throw the error
  }
}

export async function updateProjectStatus(taskId: string): Promise<any> { // Replace 'any' with a more specific type if possible
  try {
    const response = await axios.put(
      `${API_BASE_URL}/projects/hold/${taskId}`,
      { status: "takeoff_in_progress", hold: "takeoff_in_progress" }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw new Error("Failed to update task"); // Re-throw the error
  }
}

export async function fetchContractorDataByEmail(email: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/contractor/id`);
  
      if (!Array.isArray(response.data)) {
        console.error("Invalid data from /api/contractor/id:", response.data);
        return null;
      }
  
      const loggedInContractor = response.data.find((c) => c.email === email);
      return loggedInContractor || null; // Return null if not found
  
    } catch (err: any) {
      console.error("Error fetching contractor data:", err);
      return null; // Return null on error
    }
  }
  