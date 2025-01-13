import React, { useEffect, useState } from 'react';
import { DollarSign, ArrowRight } from 'lucide-react';
import { MetricHeader } from './MetricHeader';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the structure of the monthly data
interface MonthlyData {
  month: string;
  revenue: number;
}

// Define the structure of the API response
interface ApiResponse {
  success: boolean;
  data: {
    currentMonthValuation: string;
    previousMonthValuation: string;
    percentageIncrease: string;
  };
}

export function RevenueChart() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalRevenue: 0,
    growth: 0,
    monthlyData: [] as MonthlyData[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend API
        const response = await fetch('https://epg-backend.onrender.com/api/project/sum');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: ApiResponse = await response.json();

        // Parse the API response
        const currentMonthValuation = parseFloat(result.data.currentMonthValuation);
        const previousMonthValuation = parseFloat(result.data.previousMonthValuation);
        const percentageIncrease = parseFloat(result.data.percentageIncrease);

        // Generate monthly data for the chart
        const monthlyData = [
          { month: 'Previous Month', revenue: previousMonthValuation },
          { month: 'Current Month', revenue: currentMonthValuation },
        ];

        // Update state
        setData({
          totalRevenue: currentMonthValuation,
          growth: percentageIncrease,
          monthlyData,
        });
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <MetricHeader
          title="Revenue Overview"
          total={data.totalRevenue}
          growth={data.growth}
          icon={DollarSign}
        />
        <button
          onClick={() => navigate('/admin/analytics/revenue')}
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
            <Bar dataKey="revenue" fill="#1E90FF" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}