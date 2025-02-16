const API_BASE_URL = 'https://epg-backend.onrender.com/api';


export async function fetchProjectForTakeoff(projectId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/project/takeoff/${projectId}`);
    if (!response.ok) {
      const errorData = await response.json(); // Try to get more specific error message from the backend
      throw new Error(errorData.message || 'Failed to fetch project data'); // Use backend message or default
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching project for takeoff:', error);
    throw error; // Re-throw the error for component handling
  }
}

export async function updateProjectTakeoff(
    projectId: string,
    contractor: string,
    scope: any,
    file: File | null,
  ) {
    try {
      const formData = new FormData();
      formData.append('contractor', contractor);
      if (scope) { // Only append scope if it's defined
        formData.append('scope', scope);
      }
      if (file) {
        formData.append('takeoff', file);
      }
  
      const response = await fetch(`${API_BASE_URL}/project/takeoff/${projectId}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Get error from backend if available
        throw new Error(errorData.message || 'Failed to update project');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating project takeoff:', error);
      throw error;
    }
  }
  