import axios from 'axios';
import { ApiResponse } from '../../../components/admin/analytics/UserGrowthChart';
import { Contractor } from '../../../components/admin/analytics/UserGrowthComponent';

const BASE_URL = 'https://epg-backend.onrender.com/api';


export const fetchUserGrowthData = async (): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error('An error occurred');
    }
  };


  export const fetchContractors = async () => {
    try {
      const response = await fetch(`${BASE_URL}/contractors`);
      if (!response.ok) {
        throw new Error('Failed to fetch contractors');
      }
      return await response.json();
    } catch (err) {
      throw new Error('Error fetching contractors. Please try again.');
    }
  };
  
  export const updateContractor = async (updatedUser: Contractor): Promise<Contractor> => {  // Pass the whole user object
    try {
      const response = await axios.put(`${BASE_URL}/contractors`, updatedUser); // Send the whole user object
      return response.data;
    } catch (error) {
      console.error("Error updating contractor:", error);
      throw error;
    }
  };
  