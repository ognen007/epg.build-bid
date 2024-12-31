import React from 'react';
import { User, ArrowRight } from 'lucide-react';

interface UserStats {
  type: 'clients' | 'contractors';
  count: number;
  growth: number;
  active: number;
}

const userStats: UserStats[] = [
  { type: 'clients', count: 1245, growth: 12, active: 856 },
  { type: 'contractors', count: 1213, growth: 8, active: 943 }
];

export function UserOverview() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">User Overview</h2>
        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center">
          View All Users
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {userStats.map((stat) => (
          <div key={stat.type} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    {stat.type.charAt(0).toUpperCase() + stat.type.slice(1)}
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">{stat.count}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-green-600">+{stat.growth}%</div>
                <div className="text-sm text-gray-500">{stat.active} active</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}