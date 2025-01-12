import React from 'react';
import { Check, X, Calendar, DollarSign, Clock } from 'lucide-react';
import { ProjectType } from '../../../../types/project';

interface ProjectProposalsProps {
  proposals: ProjectType[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export function ProjectProposals({ proposals, onAccept, onDecline }: ProjectProposalsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Prospecting</h2>
      <div className="grid gap-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{proposal.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{proposal.description}</p>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                ${proposal.budget.toLocaleString()}
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
    </div>
  );
}