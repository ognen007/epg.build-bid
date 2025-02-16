import axios from 'axios';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchAllTasks() {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/hold/`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks"); // Re-throw for component handling
  }
}

export async function fetchContractorTasks(contractorId: string) {  // Accept contractorId as argument
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/hold/${contractorId}`); // Use contractorId in URL
    return response.data || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}

export async function fetchCommentsForTask(taskId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/projects/comment/pipeline/${taskId}/comments`
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments");
  }
}

export async function addCommentToTask(taskId: string, comment: string, author: string): Promise<Comment> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/projects/comment/pipeline/${taskId}/comments`,
        { content: comment, author: author }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw new Error("Failed to add comment");
    }
}

export async function updateTaskStatusFunction(taskId: string, newHold: string, newStatus?: string) {
  try {
    const status = newStatus || "won";
    const response = await axios.put(`${API_BASE_URL}/projects/pipeline/${taskId}`, {
      hold: newHold,
      status: status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw new Error("Failed to update task status");
  }
}
