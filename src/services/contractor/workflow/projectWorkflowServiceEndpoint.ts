import axios from 'axios';
import { Task, Comment } from '../../../components/contractor/projectworkflow/ProjectWorkflowView';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchProjects(contractorName: string): Promise<Task[]> {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/project/contractor/${encodeURIComponent(contractorName)}`
    );

    if (Array.isArray(response.data.projects)) {
      return response.data.projects;
    } else {
      return [];
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      console.warn("No projects found, continuing without error.");
      return [];
    } else {
      console.error("Error fetching projects:", err);
      throw new Error("Failed to fetch projects"); // Re-throw the error
    }
  }
}

export async function fetchProjectsById(contractorId: string): Promise<Task[]> {
    try {
      const response = await axios.get(
        `https://epg-backend.onrender.com/api/project/contractor/${encodeURIComponent(contractorId)}`
      );
  
      if (response.status === 200) {
        return response.data.projects;
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      return []; // Ensure tasks are empty instead of throwing an error
    }
  }

export async function fetchComments(taskId: string): Promise<Comment[]> {
  try {
    const response = await axios.get<Comment[]>(
      `${API_BASE_URL}/projects/comment/pipeline/${taskId}/comments`
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return []; // Return empty array in case of error
  }
}

export async function addComment(taskId: string, comment: string): Promise<Comment> {
  try {
    const response = await axios.post<Comment>(
      `${API_BASE_URL}/projects/comment/pipeline/${taskId}/comments`,
      { content: comment, author: "User" } // Replace "User" with the actual author
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error; // Re-throw the error
  }
}

export async function uploadProposal(projectId: string, file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await axios.post(
        `${API_BASE_URL}/project/upload-proposal/${projectId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      return response.data; // Return the response data
  
    } catch (error) {
      console.error("Error uploading proposal:", error);
      throw error; // Re-throw the error for component handling
    }
  }
  