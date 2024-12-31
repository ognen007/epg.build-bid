```tsx
import React from 'react';
import { MapPin } from 'lucide-react';

export function RegionalStats() {
  const regions = [
    { name: 'North America', projects: 85, revenue: 450000 },
    { name: 'Europe', projects: 65, revenue: 350000 },
    { name: 'Asia Pacific', projects: 35, revenue: 250000 },
    { name: 'Latin America', projects: 25, revenue: 150000 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Regional Statistics</h2>
        <select className="text-sm border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500">
          <option>All Regions</option>
          <option>Top Regions</option>
          <option>Growing Regions</option>
        </select>
      </div>

      <div className="space-y-4">
        {regions.map((region) => (
          <div key={region.name} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="ml-2 font-medium text-gray-900">{region.name}</span>
                </div>
                <span className="text-sm text-gray-500 mt-1">
                  {region.projects} projects
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${region.revenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Revenue</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```