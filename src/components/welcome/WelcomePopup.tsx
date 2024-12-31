import React, { useEffect, useState } from 'react';
import { ProgressBar } from './ProgressBar';

interface WelcomePopupProps {
  onComplete: () => void;
}

export function WelcomePopup({ onComplete }: WelcomePopupProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const step = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 200); // Small delay before closing
          return 100;
        }
        return next;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg p-6 w-full max-w-sm cursor-pointer"
      onClick={onComplete}
    >
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome, {'User'}!
        </h2>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
}