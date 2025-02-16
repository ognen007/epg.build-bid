import axios from 'axios';

interface ContractorProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
}

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchContractorProfile(email: string): Promise<ContractorProfile | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/contractor/settings/?email=${email}`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error fetching contractor profile:", response.statusText);
      return null; // Or throw an error if you prefer
    }
  } catch (error) {
    console.error("Error fetching contractor profile:", error);
    return null; // Or throw an error
  }
}

export async function updateContractorProfile(
  email: string,
  updatedProfile: Partial<ContractorProfile> // Use Partial<T> to allow partial updates
): Promise<ContractorProfile | null> {
  try {
    const payload = Object.fromEntries(
      Object.entries(updatedProfile).filter(([, value]) => value !== null && value !== undefined && value !== "")
    );

    const response = await axios.put(`${API_BASE_URL}/contractor/settings/?email=${email}`, payload);

    if (response.status === 200) {
      return response.data; // Or return the updated profile from the server
    } else {
      console.error("Error updating profile:", response.statusText);
      return null; // Or throw error
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return null; // Or throw error
  }
}