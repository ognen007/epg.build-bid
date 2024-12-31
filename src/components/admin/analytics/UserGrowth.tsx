```tsx
import React from 'react';
import { Users, TrendingUp } from 'lucide-react';

export function UserGrowth() {
  const data = {
    totalUsers: 2458,
    growth: 12.5,
    newUsers: {
      clients: 156,
      contractors: 124
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
          <div className="flex items-center mt-2">
            <Users className="h-5 w-5 text-gray-500" />
            <span className="text-2xl font-bold text-gray-900 ml-2">
              {data.totalUsers.toLocaleString()}
            </span>
            <div className="flex items-center ml-3 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">{data.growth}%</span>
            </div>
          </div>
        </div>
        <select className="text-sm border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">New Clients</span>
            <span className="text-lg font-semibold text-gray-900">
              {data.newUsers.clients}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: '65%' }}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">New Contractors</span>
            <span className="text-lg font-semibold text-gray-900">
              {data.newUsers.contractors}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: '45%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```