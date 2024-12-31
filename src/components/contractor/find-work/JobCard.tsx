import React from 'react';
import { Calendar, DollarSign, User } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  clientName: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  description: string;
  industry: string;
}

interface JobCardProps {
  job: Job;
  onSubmitProposal: (jobId: string) => void;
}

export function JobCard({ job, onSubmitProposal }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <User className="h-4 w-4 mr-1" />
            {job.clientName}
          </div>
        </div>
        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
          {job.industry}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{job.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          ${job.budgetMin.toLocaleString()} - ${job.budgetMax.toLocaleString()}
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          Due {new Date(job.deadline).toLocaleDateString()}
        </div>
      </div>

      <button
        onClick={() => onSubmitProposal(job.id)}
        className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm font-medium"
      >
        Submit Proposal
      </button>
    </div>
  );
}