import axios from 'axios';

const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchContractorId(): Promise<string> {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error('User not found');
  
      const { email } = JSON.parse(storedUser);
      const { data: contractors } = await axios.get(
        `${API_BASE_URL}/contractor/id`
      );
  
      const loggedInContractor = contractors.find(
        (contractor: any) => contractor.email === email
      );
  
      if (!loggedInContractor) throw new Error('Contractor not found');
  
      return loggedInContractor.id;
    } catch (err) {
      console.error('Error fetching contractor ID:', err);
      throw err; // Re-throw the error
    }
  }
  