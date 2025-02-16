import axios from "axios";

interface ApiResponse {
    success: boolean;
    data: {
      currentMonthValuation: string;
      previousMonthValuation: string;
      percentageIncrease: string;
    };
  }
  
const API_BASE_URL = "https://epg-backend.onrender.com/api";

export const fetchContractorsRevenue = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contractor-information`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRevenueData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/project/sum`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result: ApiResponse = await response.json();
  
      const currentMonthValuation = parseFloat(result.data.currentMonthValuation);
      const previousMonthValuation = parseFloat(result.data.previousMonthValuation);
      const percentageIncrease = parseFloat(result.data.percentageIncrease);
  
      const monthlyData = [
        { month: 'Previous Month', revenue: previousMonthValuation },
        { month: 'Current Month', revenue: currentMonthValuation },
      ];
  
      return {
        totalRevenue: currentMonthValuation,
        growth: percentageIncrease,
        monthlyData,
      };
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      throw error;
    }
  };
  

  export const fetchContractorDetails = async (id: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contractor-information/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('An error occurred');
    }
  };