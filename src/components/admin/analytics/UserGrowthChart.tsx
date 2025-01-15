import React, { useEffect, useState } from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { MetricHeader } from './MetricHeader';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the structure of the monthly data
interface MonthlyData {
  month: string;
  clients: number;
  contractors: number;
}

// Define the structure of the API response
interface ApiResponse {
  totalUsers: number;
  growth: number;
  monthlyData: MonthlyData[];
}

export function UserGrowthChart() {
  const navigate = useNavigate();
  const [data, setData] = useState<ApiResponse>({
    totalUsers: 0,
    growth: 0,
    monthlyData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend API
        const response = await fetch('https://epg-backend.onrender.com/api/users');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching user growth data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate growth percentage based on monthlyData
  const calculateGrowth = (monthlyData: MonthlyData[]): number => {
    if (monthlyData.length < 2) {
      return 0; // Not enough data to calculate growth
    }

    const currentMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];

    const currentMonthUsers = currentMonth.clients + currentMonth.contractors;
    const previousMonthUsers = previousMonth.clients + previousMonth.contractors;

    if (previousMonthUsers === 0) {
      return 0; // Avoid division by zero
    }

    const growth = ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;
    return parseFloat(growth.toFixed(2)); // Round to 2 decimal places
  };

  const growth = calculateGrowth(data.monthlyData);

  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Metric Header Skeleton */}
        <div className="animate-pulse">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="mt-6 h-64 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <MetricHeader
          title="User Growth"
          total={data.totalUsers}
          growth={growth} // Use the calculated growth value
          icon={Users}
        />
        <button
          onClick={() => navigate('/admin/analytics/users')}
          className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
        >
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.monthlyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clients" fill="#1E90FF" name="Clients" />
            <Bar dataKey="contractors" fill="#F97316" name="Contractors" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}