import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const activeBids = [
  {
    id: '1',
    projectTitle: 'City Center Mall Renovation',
    bidAmount: 2250000,
    status: 'pending',
    submitDate: '2024-02-15',
    competingBids: 8
  },
  {
    id: '2',
    projectTitle: 'Harbor Bridge Maintenance',
    bidAmount: 1650000,
    status: 'reviewing',
    submitDate: '2024-02-10',
    competingBids: 5
  }
];

export function ActiveBids() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Active Bids</h2>
        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center">
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {activeBids.map((bid) => (
          <div key={bid.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{bid.projectTitle}</h3>
              <span className="text-lg font-semibold text-gray-900">
                ${bid.bidAmount.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Submitted {new Date(bid.submitDate).toLocaleDateString()}
              </div>
              <div>{bid.competingBids} competing bids</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}