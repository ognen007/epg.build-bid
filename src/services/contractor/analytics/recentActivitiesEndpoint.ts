import axios from "axios";

interface Activity {
    id: string;
    type: 'message' | 'update' | 'deadline';
    content: string;
    timestamp: string;
    project?: string;
  }
  
  const API_BASE_URL = 'https://epg-backend.onrender.com/api';
  
  export async function fetchRecentActivities(contractorId: string): Promise<Activity[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/contractor/recent/activity/${contractorId}`
      );
      const data = response.data;
  
      const formattedActivities: Activity[] = [];
  
      if (data.latestWonProject) {
        formattedActivities.push({
          id: '1',
          type: 'update',
          content: `Completed project: ${data.latestWonProject.name}`,
          timestamp: new Date(data.latestWonProject.deadline).toLocaleString(),
          project: data.latestWonProject.name,
        });
      }
  
      if (data.latestTask) {
        formattedActivities.push({
          id: '2',
          type: 'message',
          content: `New task: ${data.latestTask.title}`,
          timestamp: new Date(data.latestTask.createdAt).toLocaleString(),
          project: data.latestTask.title,
        });
      }
  
      if (data.latestDeadline) {
        formattedActivities.push({
          id: '3',
          type: 'deadline',
          content: `Upcoming deadline: ${data.latestDeadline.name}`,
          timestamp: new Date(data.latestDeadline.deadline).toLocaleString(),
          project: data.latestDeadline.name,
        });
      }
  
      return formattedActivities;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error('Failed to fetch activities'); // Re-throw the error
    }
  }
  