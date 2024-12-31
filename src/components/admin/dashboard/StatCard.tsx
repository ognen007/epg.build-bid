import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  details: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, details, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{details}</p>
        </div>
        <div className="p-3 rounded-full bg-orange-100">
          <Icon className="h-6 w-6 text-orange-600" />
        </div>
      </div>
    </div>
  );
}