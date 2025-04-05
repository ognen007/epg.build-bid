import { StatCardProps } from "../../../components/stats/StatCard"; // Import the type

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchStats(): Promise<StatCardProps[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/contractors/stats`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch stats');
    }
    const data = await response.json();

    // Transform the data to match StatCardProps structure
    const transformedData: StatCardProps[] = data.map((item: { title: string; value: number }) => ({
      title: item.title,
      value: item.value,
      icon: null, // Default to null since backend doesn't provide icons
      trend: { value: 0, isPositive: true }, // Default trend values
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
}