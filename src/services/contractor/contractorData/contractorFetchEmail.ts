const API_BASE_URL = 'https://epg-backend.onrender.com/api';

export async function fetchContractorNameByEmail(email: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/contractor/name-by-email?email=${email}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch contractor name');
      }
    const data = await response.json();
    return data.fullName || "Admin User";
  } catch (error) {
    console.error("Error fetching full name:", error);
    return "Admin User";
  }
}
