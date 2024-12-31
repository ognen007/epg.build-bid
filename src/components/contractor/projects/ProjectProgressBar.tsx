import React from 'react';

interface ProjectProgressBarProps {
  progress: number;
}

export function ProjectProgressBar({ progress }: ProjectProgressBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Progress</span>
        <span className="text-gray-900 font-medium">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}