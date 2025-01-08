import React from 'react';
import { Users, TrendingUp, ArrowRight } from 'lucide-react';
import { MetricHeader } from './MetricHeader';
import { useNavigate } from 'react-router-dom';

const data = {
  totalUsers: 2458,
  growth: 12.5,
  monthlyData: [
    { month: 'Jan', clients: 120, contractors: 85 },
    { month: 'Feb', clients: 150, contractors: 95 },
    { month: 'Mar', clients: 180, contractors: 110 },
    { month: 'Apr', clients: 210, contractors: 125 },
    { month: 'May', clients: 250, contractors: 145 },
    { month: 'Jun', clients: 280, contractors: 160 }
  ]
};

export function UserGrowthChart() {
  const navigate = useNavigate();
  const maxValue = Math.max(
    ...data.monthlyData.map(d => Math.max(d.clients, d.contractors))
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <MetricHeader 
          title="User Growth"
          total={data.totalUsers}
          growth={data.growth}
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
        <div className="h-full flex items-end space-x-2">
          {data.monthlyData.map((month) => (
            <div key={month.month} className="flex-1 space-y-2">
              <div className="relative h-full flex flex-col justify-end">
                <div 
                  className="w-full bg-orange-500 rounded-t"
                  style={{ height: `${(month.clients / maxValue) * 100}%` }}
                />
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(month.contractors / maxValue) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 text-center">{month.month}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
          <span className="text-sm text-gray-600">Clients</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
          <span className="text-sm text-gray-600">Contractors</span>
        </div>
      </div>
    </div>
  );
}