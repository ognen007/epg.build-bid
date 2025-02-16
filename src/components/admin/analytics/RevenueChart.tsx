import React, { useEffect, useState } from 'react';
import { DollarSign, ArrowRight } from 'lucide-react';
import { MetricHeader } from './MetricHeader';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchRevenueData } from '../../../services/admin/contractors/revenueEndpoint';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueData = await fetchRevenueData();
        setData(revenueData);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <Bar dataKey="revenue" fill="#25993C" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}