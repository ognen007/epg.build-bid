import axios from "axios";

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    userType: any;
    fullName: string;
  } | null;
  error: string | null;
}

const USERS = {
  'client@epg.build': {
    password: 'epg.build123',
    userType: 'client',
    fullName: 'Client User'
  },
  'contractor@epg.build': {
    password: 'epg.build123',
    userType: 'contractor',
    fullName: 'Contractor User'
  },
  'admin@epg.build': {
    password: 'epg.build123',
    userType: 'admin',
    fullName: 'Admin User'
  }
};

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const userConfig = USERS[email as keyof typeof USERS];

  if (!userConfig || userConfig.password !== password) {
    return { user: null, error: 'Invalid credentials' };
  }

  return {
    user: {
      id: Math.random().toString(),
      email,
      userType: userConfig.userType,
      fullName: userConfig.fullName
    },
    error: null
  };
}

export async function loginUserEndpoint(email: string, password: string): Promise<{ email: string; role: string }> {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });

    if (response.status === 200) {
      return response.data;
    } else {
      // More detailed error handling:
      const errorMessage = response.data?.error || 'Login failed'; // Try to get error from API
      throw new Error(errorMessage); // Re-throw with error message
    }
  } catch (error: any) {
    // Better error handling:
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    console.error('Login error:', error); // Keep the console log for debugging
    throw new Error(errorMessage); // Re-throw the error
  }
}
