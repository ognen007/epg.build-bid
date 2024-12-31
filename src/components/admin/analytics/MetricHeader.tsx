import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';

interface MetricHeaderProps {
  title: string;
  total: number;
  growth: number;
  icon: LucideIcon;
}

export function MetricHeader({ title, total, growth, icon: Icon }: MetricHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center mt-2">
          <Icon className="h-5 w-5 text-gray-500" />
          <span className="text-2xl font-bold text-gray-900 ml-2">
            {total}
          </span>
          <div className="flex items-center ml-3 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">{growth}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}