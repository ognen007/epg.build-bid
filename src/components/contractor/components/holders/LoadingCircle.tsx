import { FC } from "react";
import { keyframes } from '@stitches/react';
import { CircleDashed } from "lucide-react";

interface LoadingCircleProps {
  label: string;
}

// Rotating keyframes
const rotateAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const LoadingCircle: FC<LoadingCircleProps> = ({ label }) => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-50">
      <div className="flex flex-col justify-center items-center">
        <div
          className="w-24 h-24 text-gray-400"
          style={{
            animation: `${rotateAnimation} 2s linear infinite`
          }}
        >
          <CircleDashed className="w-full h-full" />
        </div>
        <h2 className="mt-4 font-semibold text-xl text-gray-700">{label}</h2>
      </div>
    </div>
  );
};
