import { ContractorDetails } from "../../../views/contractor/ContractorEarnings";

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchContractorEarningsData(contractorId: string): Promise<ContractorDetails | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/contractor-information/${contractorId}`);
    if (!response.ok) {
      const errorData = await response.json(); // Try to get a more specific error
      throw new Error(errorData.message || 'Failed to fetch contractor earnings data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contractor earnings data:', error);
    return null; // Return null on error
  }
}
