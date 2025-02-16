import axios from 'axios';

export async function fetchPlatformStats() {
  try {
    const usersResponse = await axios.get('https://epg-backend.onrender.com/api/clients/contractors');
    const { totalContractors, totalClients } = usersResponse.data.data;

    const projectsResponse = await axios.get('https://epg-backend.onrender.com/api/project/number');
    const { awaitingBidCount, bidSubmittedCount } = projectsResponse.data.data;

    const earningsResponse = await axios.get('https://epg-backend.onrender.com/api/project/sum');
    const { currentMonthValuation, percentageIncrease } = earningsResponse.data.data;

    return {
      totalUsers: { contractors: totalContractors, clients: totalClients },
      activeProjects: { awaitingBid: awaitingBidCount, bidSubmitted: bidSubmittedCount },
      totalEarnings: { currentMonthValuation: parseFloat(currentMonthValuation), percentageIncrease: parseFloat(percentageIncrease) },
    };
  } catch (error) {
    console.error("Error fetching platform stats:", error);
    throw error; // Important: Re-throw the error
  }
}
