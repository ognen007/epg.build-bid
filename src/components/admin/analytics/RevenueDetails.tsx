import React from 'react';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', wonProjects: 4, totalProjects: 6 },
  { month: 'Feb', wonProjects: 3, totalProjects: 8 },
  { month: 'Mar', wonProjects: 5, totalProjects: 7 },
  { month: 'Apr', wonProjects: 6, totalProjects: 9 },
  { month: 'May', wonProjects: 4, totalProjects: 5 },
  { month: 'Jun', wonProjects: 7, totalProjects: 10 }
];

export function RevenueDetails() {
  const { id } = useParams();
  const contractorName = "John Smith"; // Replace with actual data fetch

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">{contractorName}'s Revenue Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Won Projects</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="wonProjects" fill="#f97316" name="Won Projects" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Total Monthly Projects</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalProjects" fill="#e65c00" name="Total Projects" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}