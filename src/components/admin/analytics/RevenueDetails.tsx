import React from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const monthlyData = [
  { month: 'Jan', wonProjects: 4, lostProjects: 2, totalRevenue: 12000 },
  { month: 'Feb', wonProjects: 3, lostProjects: 5, totalRevenue: 15000 },
  { month: 'Mar', wonProjects: 5, lostProjects: 2, totalRevenue: 18000 },
  { month: 'Apr', wonProjects: 6, lostProjects: 3, totalRevenue: 20000 },
  { month: 'May', wonProjects: 4, lostProjects: 1, totalRevenue: 14000 },
  { month: 'Jun', wonProjects: 7, lostProjects: 3, totalRevenue: 23000 },
];

export function RevenueDetails() {
  const { id } = useParams();
  const contractorName = 'John Smith'; // Replace with actual data fetch

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">{contractorName}'s Revenue Analytics</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue and Projects</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              
              {/* Primary Y-Axis for won/lost projects */}
              <YAxis yAxisId="left" />
              
              {/* Secondary Y-Axis for total revenue */}
              <YAxis yAxisId="right" orientation="right" />

              <Tooltip />
              <Legend />

              {/* Lines for projects won/lost (left Y-axis) */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="lostProjects"
                stroke="#e63946"
                name="Projects Lost"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="wonProjects"
                stroke="#2a9d8f"
                name="Projects Won"
              />

              {/* Line for total revenue (right Y-axis) */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalRevenue"
                stroke="#4A00E0"
                name="Total Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
