import React from 'react';
import { Calendar, X, Check } from 'lucide-react';
import { ProjectType } from '../../../types/project';

interface ProjectProposalsProps {
  proposals?: ProjectType[]; // Make proposals optional
    onAccept: () => void;
  onDecline: () => void;
}

export function ProjectProposals({ onAccept, onDecline, proposals = [] }: ProjectProposalsProps) {
  // Log the incoming proposals
  console.log('Incoming Proposals:', proposals);

  // Filter proposals to only include projects with status "awaiting_bid"
  const filteredProposals = proposals.filter(
    (proposal) => proposal.status === 'awaiting_bid'
  );

  // Log the filtered proposals
  console.log('Filtered Proposals:', filteredProposals);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Project Proposals</h2>
      <div className="grid gap-4">
        {filteredProposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{proposal.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{proposal.description}</p>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                ${proposal.valuation?.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              Due {new Date(proposal.deadline).toLocaleDateString()}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => onDecline()}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <X className="h-4 w-4 inline-block mr-1" />
                Decline
              </button>
              <button
                onClick={() => onAccept()}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium"
              >
                <Check className="h-4 w-4 inline-block mr-1" />
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}