import axios from "axios";
import { AdminUser } from "../../../types/admin";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: AdminUser['role'];
  createdAt: string;
}

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>(`${API_BASE_URL}/admin/users`);
    return response.data;
  } catch (err: any) {
    const errorMessage =
      axios.isAxiosError(err) && err.response?.data?.message
        ? err.response.data.message
        : err instanceof Error
        ? err.message
        : 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
}

export async function addUser(userData: { email: string; fullName: string; role: AdminUser['role'] }): Promise<void> {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/register`, {
      fullName: userData.fullName,
      email: userData.email,
      role: userData.role,
    });
    if (response.status == 400) {
      const errorMessage =
        axios.isAxiosError(response) && response.data?.message
          ? response.data.message
          : 'Failed to add user. Please try again.';
      throw new Error(errorMessage);
    }
  } catch (err: any) {
    let errorMessage = 'Failed to add user. Please try again.';

    if (axios.isAxiosError(err) && err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    throw new Error(errorMessage);
  }
}



export async function fetchAdminNameByEmail(email: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/name-by-email?email=${email}`);
    if (!response.ok) {
        const errorData = await response.json(); // Try to get a more specific error
        throw new Error(errorData.message || 'Failed to fetch admin name');
      }
    const data = await response.json();
    return data.fullName || 'Admin User';
  } catch (error) {
    console.error('Error fetching full name:', error);
    return 'Admin User'; // Default value if API call fails
  }
}

interface User {
  id: string;
  fullName: string;
  email: string;
  role: AdminUser['role'];
  createdAt: string;
}

export async function updateAdminPassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/edit-password/${userId}`, { currentPassword, newPassword });

    if (response.status !== 200) {
      console.error("Error updating password:", response.status, response.statusText);
    }
    // No need to return anything if successful, 200 status is enough
  } catch (error: any) {
      console.error('Error updating password:', error);
      throw error; // Re-throw the error for the component to handle.
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/delete/${id}`);
    if (response.status !== 200) {
      throw new Error('Failed to delete user');
    }
  } catch (error: any) {
    console.error('Error deleting user:', error);
    throw error; // Re-throw the error
  }
}