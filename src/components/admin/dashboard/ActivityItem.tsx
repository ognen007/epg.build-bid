import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActivityItemProps {
  activity: {
    id: string;
    type: string;
    content: string;
    timestamp: string;
    icon: LucideIcon;
  };
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const { icon: Icon, content, timestamp } = activity;
  
  return (
    <div className="flex items-start space-x-3">
      <div className="p-2 rounded-full bg-orange-100">
        <Icon className="h-4 w-4 text-orange-600" />
      </div>
      <div>
        <p className="text-gray-900">{content}</p>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
    </div>
  );
}