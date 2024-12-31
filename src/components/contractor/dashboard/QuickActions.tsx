import React from 'react';
import { PlayCircle, FileText, MessageSquare } from 'lucide-react';

const actions = [
  {
    icon: PlayCircle,
    label: 'Start New Task',
    onClick: () => console.log('Start new task')
  },
  {
    icon: FileText,
    label: 'View Recent Proposals',
    onClick: () => console.log('View proposals')
  },
  {
    icon: MessageSquare,
    label: 'Check Messages',
    onClick: () => console.log('Check messages')
  }
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map(({ icon: Icon, label, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-colors"
          >
            <Icon className="h-5 w-5 text-orange-500 mr-2" />
            <span className="font-medium text-gray-700">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}