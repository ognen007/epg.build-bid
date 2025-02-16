import { ContractorDetails } from "../../../components/contractor/earnings/ContractorRevenue";


const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchContractorData(contractorId: string): Promise<ContractorDetails> {
  try {
    const response = await fetch(`${API_BASE_URL}/contractor-information/${contractorId}`);
    if (!response.ok) {
      const errorData = await response.json(); // Try to get a more specific error
      throw new Error(errorData.message || 'Failed to fetch data');
    }
    const data: ContractorDetails = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contractor data:', error);
    throw error; // Re-throw for component handling
  }
}
