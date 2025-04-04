import { ProjectType } from "../../../types/project";

export async function fetchContractorsProjectModal() {
    try {
      const response = await fetch('https://epg-backend.onrender.com/api/contractors/name');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // More informative error
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching contractors:', error);
      throw error; // Re-throw the error for the component to handle
    }
  }

  export async function fetchProject(id: string){
    try{
      const response = await fetch(`https://epg-backend.onrender.com/api/project/display/${id}`)
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json();
    } catch(error) {
      throw error
    }
  }
  
  export async function createProjectModal(projectData: Omit<ProjectType, 'id'>, blueprintsFile: File | null) {
    try {
      const formData = new FormData();
      for (const key in projectData) {
        formData.append(key, projectData[key as keyof Omit<ProjectType, 'id'>]);
      }
      if (blueprintsFile) {
        formData.append('blueprintsFile', blueprintsFile);
      }
  
      const response = await fetch('https://epg-backend.onrender.com/api/project/create', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      try {
        const errorData = await response.json(); // Try to parse JSON error response
        throw new Error(errorData.error || errorData.message || 'Failed to create project'); // Use error from backend
      } catch (jsonError) { // If JSON parsing fails (e.g., if it's still HTML)
        const errorText = await response.text(); // Get the HTML or text
        throw new Error(`Server Error: ${response.status} - ${errorText}`); // Throw a more general error
      }
    }

    return response.json();

  } catch (error: any) {
    console.error('Error creating project:', error);
    throw error;
  }
}

  