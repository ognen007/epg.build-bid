import React, { useState, useEffect } from 'react';
import { Calendar, X, Check } from 'lucide-react';
import { Skeleton } from '@radix-ui/themes';
import { ProjectType } from '../../../types/project';
import { NoProposal } from '../components/holders/NoProposal';

interface ProjectProposalsProps {
  proposals?: ProjectType[]; // Make proposals optional
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export function ProjectProposals({ onAccept, onDecline, proposals = [] }: ProjectProposalsProps) {
  const [loading, setLoading] = useState(true); // Internal loading state
  const [filteredProposals, setFilteredProposals] = useState<ProjectType[]>([]);

  // Simulate fetching proposals (if needed)
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        // Simulate a delay for fetching data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Filter proposals to only include projects with status "awaiting_takeoff"
        const filtered = proposals.filter(
          (proposal) => proposal.status === 'awaiting_takeoff'
        );

        setFilteredProposals(filtered);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [proposals]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Project Proposals</h2>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (filteredProposals.length === 0) {
    return (
      <>
        <h2 className="text-2xl font-semibold text-gray-900">Project Proposals</h2>
        <NoProposal label="No Proposal at the moment" />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Project Proposals</h2>
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
              <button
                onClick={() => onDecline(proposal.id)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <X className="h-4 w-4 inline-block mr-1" />
                Decline
              </button>
              <button
                onClick={() => onAccept(proposal.id)}
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