import { BookOpenText } from "lucide-react";
import { FC } from "react";
import { keyframes } from '@stitches/react';

interface NoProposalProps {
  label: string;
}

export const NoProposal: FC<NoProposalProps> = ({ label }) => {
  return (
    <div className="w-full h-auto flex justify-center items-center bg-gray-100 border-4 border-none p-10 rounded-lg">
      <div className="flex flex-col justify-center items-center">
        <div
          className="w-24 h-24 text-gray-500" >
          <BookOpenText className="w-full h-full" />
        </div>
        <h2 className="mt-4 font-semibold text-lg text-gray-500">{label}</h2>
      </div>
    </div>
  );
};
