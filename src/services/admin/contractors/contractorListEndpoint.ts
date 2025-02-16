import axios from 'axios';
import { Contractor } from '../../../views/admin/components/contractorpipeline/ContractorProjectFilter';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchContractorsList(): Promise<Contractor[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/contractors/name`);
      if (!Array.isArray(response.data)) {
        console.error('Invalid API response format:', response.data);
        throw new Error('Invalid API response format'); // Re-throw the error
      }
      return response.data;
    } catch (err: any) {
      console.error('Error fetching contractors:', err);
      throw err; // Re-throw the error
    }
  }
interface ContractorType {
  id: string;
  fullName: string;
}

export async function fetchContractors(): Promise<ContractorType[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/contractors/name`);
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('Invalid data format: Expected an array of contractors');
    }
  } catch (err: any) {
    console.error('Error fetching contractors:', err);
    throw err;
  }
}