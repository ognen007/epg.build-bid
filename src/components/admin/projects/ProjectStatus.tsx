import React from 'react';

interface ProjectStatusProps {
  status: 'Active' | 'Completed' | 'pending';
}

export function ProjectStatus({ status }: ProjectStatusProps) {
  const colors = {
    active: 'bg-green-100 text-green-800',
    Completed: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}