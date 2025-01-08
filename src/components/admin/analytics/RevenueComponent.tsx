import React, { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Revenue {
  id: string;
  contractor: {
    name: string;
    email: string;
    company: string;
  };
  totalRevenue: number;
  lastMonthRevenue: number;
  growth: number;
  projectsCompleted: number;
}

const sampleRevenue: Revenue[] = [
  {
    id: '1',
    contractor: {
      name: 'John Smith',
      email: 'john@example.com',
      company: 'Smith Construction'
    },
    totalRevenue: 450000,
    lastMonthRevenue: 45000,
    growth: 12.5,
    projectsCompleted: 15
  },
  {
    id: '2',
    contractor: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      company: 'Johnson Industries'
    },
    totalRevenue: 380000,
    lastMonthRevenue: 35000,
    growth: -5.2,
    projectsCompleted: 12
  }
];

export function RevenueComponent() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRevenue = sampleRevenue.filter(rev => 
    rev.contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rev.contractor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rev.contractor.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Revenue Analytics</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by contractor name, email, or company..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contractor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRevenue.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{rev.contractor.name}</div>
                    <div className="text-sm text-gray-500">{rev.contractor.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rev.contractor.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      ${rev.totalRevenue.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${rev.lastMonthRevenue.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${
                      rev.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {rev.growth >= 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(rev.growth)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rev.projectsCompleted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}