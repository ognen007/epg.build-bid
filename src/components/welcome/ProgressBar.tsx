import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-orange-500 transition-all duration-50 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}