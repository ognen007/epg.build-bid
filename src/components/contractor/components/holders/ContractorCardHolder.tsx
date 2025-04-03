import { Hammer } from "lucide-react";
import { FC } from "react";
import { keyframes } from '@stitches/react';

interface ContractorCardHolderProps {
  label: string;
}

export const ContractorCardHolder: FC<ContractorCardHolderProps> = ({ label }) => {
  return (
    <div className="w-full h-auto flex justify-center items-center bg-gray-100 border-4 border-none p-10 rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <h2 className="mt-4 font-semibold text-lg text-gray-700">{label}</h2>
      </div>
    </div>
  );
};
