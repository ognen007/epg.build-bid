import React from 'react';
import { Clock, DollarSign } from 'lucide-react';

interface Bid {
  id: string;
  projectTitle: string;
  bidAmount: number;
  status: 'pending' | 'accepted' | 'rejected';
  submitDate: string;
  competingBids: number;
}

const bids: Bid[] = [
  {
    id: '1',
    projectTitle: 'City Center Mall Renovation',
    bidAmount: 2250000,
    status: 'pending',
    submitDate: '2024-02-15',
    competingBids: 8
  },
  // Add more sample bids
];

export function ContractorBids() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My Bids</h1>

      <div className="grid gap-6">
        {bids.map((bid) => (
          <div key={bid.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{bid.projectTitle}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Submitted {new Date(bid.submitDate).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  ${bid.bidAmount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  {bid.competingBids} competing bids
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className={`
                px-2 py-1 rounded-full text-sm font-medium
                ${bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                ${bid.status === 'accepted' ? 'bg-green-100 text-green-800' : ''}
                ${bid.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
              `}>
                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
              </span>
              <button className="text-orange-600 hover:text-orange-700 font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}