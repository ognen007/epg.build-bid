import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Briefcase, DollarSign } from 'lucide-react';
import { StatCard } from './StatCard';
import { toast, ToastContainer } from 'react-toastify'; // For error notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles

export function PlatformStats() {
  const [totalUsers, setTotalUsers] = useState({ contractors: 0, clients: 0 });
  const [activeProjects, setActiveProjects] = useState({ awaitingBid: 0, bidSubmitted: 0 });
  const [totalEarnings, setTotalEarnings] = useState({ currentMonthValuation: 0, percentageIncrease: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users (contractors and clients)
        const usersResponse = await axios.get('https://epg-backend.onrender.com/api/clients/contractors');
        const { totalContractors, totalClients } = usersResponse.data.data;
        setTotalUsers({ contractors: totalContractors, clients: totalClients });

        // Fetch active projects
        const projectsResponse = await axios.get('https://epg-backend.onrender.com/api/project/number');
        const { awaitingBidCount, bidSubmittedCount } = projectsResponse.data.data;
        setActiveProjects({ awaitingBid: awaitingBidCount, bidSubmitted: bidSubmittedCount });

        // Fetch total earnings
        const earningsResponse = await axios.get('https://epg-backend.onrender.com/api/project/sum');
        const { currentMonthValuation, percentageIncrease } = earningsResponse.data.data;
        setTotalEarnings({ currentMonthValuation: parseFloat(currentMonthValuation), percentageIncrease: parseFloat(percentageIncrease) });
      } catch (err) {
        toast.error(`Error: ${err}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format the stats data
  const stats = [
    {
      title: 'Total Users',
      value: `${totalUsers.contractors + totalUsers.clients}`,
      details: `${totalUsers.contractors} contractors, ${totalUsers.clients} clients`,
      icon: Users,
    },
    {
      title: 'Active Projects',
      value: `${activeProjects.awaitingBid + activeProjects.bidSubmitted}`,
      details: `${activeProjects.awaitingBid} awaiting bid, ${activeProjects.bidSubmitted} bid submitted`,
      icon: Briefcase,
    },
    {
      title: 'Total Earnings',
      value: `$${totalEarnings.currentMonthValuation.toLocaleString()}`,
      details: `${totalEarnings.percentageIncrease.toFixed(2)}% from last month`,
      icon: DollarSign,
    },
  ];

  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  // Error state with toast notification
  if (error) {
    return (
      <>
        <ToastContainer />
        <div className="flex justify-center items-center h-64">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg animate-pulse">
            <p className="font-bold">Oops! Something went wrong.</p>
            <p>Please try again later.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </>
  );
}


function Skeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}