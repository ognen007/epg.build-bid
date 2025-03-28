import axios from 'axios';
import { Activity } from '../../../components/admin/dashboard/RecentActivities';
import { UserPlus, DollarSign, CheckCircle } from 'lucide-react';

export async function fetchRecentActivities(): Promise<Activity[]> {
  try {
    const response = await axios.get('https://epg-backend.onrender.com/api/recent/activity');
    const data = response.data;

    const formattedActivities: Activity[] = [];

    if (data.newestContractor) {
      formattedActivities.push({
        id: '1',
        type: 'user_signup',
        content: `New contractor ${data.newestContractor.fullName} joined the platform`,
        timestamp: new Date(data.newestContractor.createdAt).toLocaleString(),
        icon: UserPlus, // Make sure UserPlus is imported in this file as well
      });
    }

    if (data.latestTakeoffProject) {
      formattedActivities.push({
        id: '2',
        type: 'project',
        content: `Project "${data.latestTakeoffProject.name}" is in takeoff in progress`,
        timestamp: new Date(data.latestTakeoffProject.deadline).toLocaleString(),
        icon: CheckCircle, // Import CheckCircle
      });
    }

    if (data.latestWonProject) {
      formattedActivities.push({
        id: '3',
        type: 'project',
        content: `Project "${data.latestWonProject.name}" marked as won`,
        timestamp: new Date(data.latestWonProject.deadline).toLocaleString(),
        icon: DollarSign, // Import DollarSign
      });
    }

    return formattedActivities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw new Error('Error fetching recent activities.'); // Re-throw a more generic error
  }
}
