import axios from 'axios';

const BASE_URL = 'https://epg-backend.onrender.com/api';

export const fetchProjectMetrics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/projects/metrics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project metrics:', error);
    throw error;
  }
};
