import React from 'react';
import { Calendar, DollarSign, Clock } from 'lucide-react';
import { ProjectType } from '../../../../types/project';
import { NoProposal } from '../../../../components/contractor/components/holders/NoProposal';

interface ProjectProposalsProps {
  proposals?: ProjectType[]; // Make proposals optional
}

export function ProjectProposals({ proposals = [] }: ProjectProposalsProps) {
  const filteredProposals = proposals.filter(
    (proposal) => proposal.status === 'awaiting_takeoff'
  );

  return (
    <div className="space-y-4 pt-10 pb-10">
      <h2 className="text-2xl font-semibold text-gray-900">Sent to Contractor for Approval</h2>
      {filteredProposals.length === 0 ? (
        <NoProposal label='No Projects for Approval' /> // Render NoProposal if no filtered proposals
      ) : (
        <div className="grid gap-4">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className={`bg-white rounded-lg shadow-sm p-6 ${
                proposal.highIntent === true ? 'border-l-[5px] border-red-500' : ''
              }`}
            >
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
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Pending...
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
