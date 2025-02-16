import axios from 'axios';
import { Deadline } from '../../../components/contractor/dashboard/UpcomingDeadlines';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchUpcomingDeadlines(contractorId: string): Promise<Deadline[]> {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/contractor/upcoming/deadlines/${contractorId}`
    );

    return data.map((project: any) => { // Replace 'any' with the actual type of 'project'
      const deadlineDate = new Date(project.deadline);
      const today = new Date();
      const daysLeft = Math.ceil(
        (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return {
        id: project.id,
        project: project.name,
        task: project.description,
        date: project.deadline,
        daysLeft,
      };
    });
  } catch (err) {
    console.error("Error fetching deadlines:", err);
    throw new Error("Failed to load deadlines."); // Re-throw the error
  }
}
