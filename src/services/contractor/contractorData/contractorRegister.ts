import axios from 'axios';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function registerContractor(formData: FormData): Promise<any> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/contractors/register`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error: any) { // Type the error as any
    console.error('Registration error:', error);
    throw error; // Re-throw for component handling
  }
}
