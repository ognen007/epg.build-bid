import { Hourglass } from "lucide-react";
import { FC } from "react";
import { keyframes } from '@stitches/react';

interface DeadlineProps {
  label: string;
}

// Floating and rotating keyframes
const floatAnimation = keyframes({
  '0%': { transform: 'translateY(20)' },
  '50%': { transform: 'translateY(-20px)' },
  '100%': { transform: 'translateY(20)' },
});

export const Deadline: FC<DeadlineProps> = ({ label }) => {
  return (
    <div className="w-full h-auto flex justify-center items-center bg-orange-50 border-4 border-none p-10 rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <div
          className="w-24 h-24 text-orange-400"
          style={{
            animation: `${floatAnimation} 2s ease-in-out infinite`
          }}
        >
          <Hourglass className="w-full h-full" />
        </div>
        <h2 className="mt-4 font-semibold text-lg text-gray-700">{label}</h2>
      </div>
    </div>
  );
};
