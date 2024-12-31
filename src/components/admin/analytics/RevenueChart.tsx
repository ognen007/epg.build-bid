import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';
import { MetricHeader } from './MetricHeader';

const data = {
  totalRevenue: 856000,
  growth: 15.8,
  distribution: {
    contractorFees: 684800,
    platformFees: 171200
  },
  monthlyData: [
    { month: 'Jan', revenue: 120000 },
    { month: 'Feb', revenue: 135000 },
    { month: 'Mar', revenue: 150000 },
    { month: 'Apr', revenue: 142000 },
    { month: 'May', revenue: 158000 },
    { month: 'Jun', revenue: 151000 }
  ]
};

export function RevenueChart() {
  const maxRevenue = Math.max(...data.monthlyData.map(d => d.revenue));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <MetricHeader 
        title="Revenue Overview"
        total={data.totalRevenue}
        growth={data.growth}
        icon={DollarSign}
      />

      <div className="mt-6">
        <div className="flex justify-between mb-4">
          <div>
            <div className="text-sm text-gray-500">Contractor Fees</div>
            <div className="text-lg font-semibold text-gray-900">
              ${data.distribution.contractorFees.toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Platform Fees</div>
            <div className="text-lg font-semibold text-gray-900">
              ${data.distribution.platformFees.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="h-48">
          <div className="h-full flex items-end space-x-2">
            {data.monthlyData.map((month) => (
              <div key={month.month} className="flex-1 space-y-2">
                <div 
                  className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t transition-all duration-300"
                  style={{ height: `${(month.revenue / maxRevenue) * 100}%` }}
                />
                <div className="text-xs text-gray-500 text-center">{month.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}