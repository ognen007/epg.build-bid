import React from 'react';
import { Server, AlertTriangle } from 'lucide-react';

const metrics = [
  {
    name: 'Server Uptime',
    value: '99.9%',
    status: 'healthy'
  },
  {
    name: 'Error Rate',
    value: '0.02%',
    status: 'healthy'
  },
  {
    name: 'API Response Time',
    value: '245ms',
    status: 'warning',
    message: 'Higher than usual'
  }
];

export function SystemHealth() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
        <Server className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{metric.name}</span>
              <span className="text-sm font-medium text-gray-900">{metric.value}</span>
            </div>
            {metric.status === 'warning' && (
              <div className="flex items-center mt-2 text-sm text-yellow-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {metric.message}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}