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

    // Transform the data (important!):
    const transformedData: StatCardProps[] = data.map((item: any) => ({ // Replace 'any' with the actual type of 'item'
      title: item.title || '',
      value: item.value || 0,
      icon: item.icon || null, // Make sure your StatCard can handle null icons
      trend: { value: item.trend?.value || 0, isPositive: item.trend?.isPositive || true },
    }));

    return transformedData;

  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
}