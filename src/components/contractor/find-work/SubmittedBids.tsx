import React from 'react';
import { Clock, DollarSign } from 'lucide-react';

interface Bid {
  id: string;
  jobTitle: string;
  proposedAmount: number;
  submitDate: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface SubmittedBidsProps {
  bids: Bid[];
}

export function SubmittedBids({ bids }: SubmittedBidsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Submitted Proposals</h2>
      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">{bid.jobTitle}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Clock className="h-4 w-4 mr-1" />
                Submitted {new Date(bid.submitDate).toLocaleDateString()}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-gray-900 font-medium">
                <DollarSign className="h-4 w-4" />
                {bid.proposedAmount.toLocaleString()}
              </div>
              <span className={`
                inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1
                ${bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${bid.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
                ${bid.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}