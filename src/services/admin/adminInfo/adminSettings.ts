import axios from 'axios';

interface AdminProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
}

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchAdminProfile(email: string): Promise<AdminProfile | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/settings/?email=${email}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error fetching admin profile:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return null;
  }
}

export async function updateAdminProfile(
  email: string,
  updatedProfile: Partial<AdminProfile>
): Promise<AdminProfile | null> {
  try {
    const payload = Object.fromEntries(
      Object.entries(updatedProfile).filter(([, value]) => value !== null && value !== undefined && value !== "")
    );

    const response = await axios.put(`${API_BASE_URL}/admin/settings/change/?email=${email}`, payload);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error updating profile:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return null;
  }
}

export async function adminLogin(email: string, password: string): Promise<{ email: string; role: string } | null> {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, { email, password });
  
      if (response.data && response.data.user) {
        return response.data.user;
      } else {
        console.error('Invalid response from server:', response.data); // Log the full response for debugging
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      throw err.response?.data?.message || new Error('Invalid credentials'); // Re-throw the error with a more specific message
    }
  }
  