import React, { useState } from 'react';
import { JobCard } from '../../components/contractor/find-work/JobCard';
import { JobFilters } from '../../components/contractor/find-work/JobFilters';
import { SubmittedBids } from '../../components/contractor/find-work/SubmittedBids';

const sampleJobs = [
  {
    id: '1',
    title: 'Modern Office Building Renovation',
    clientName: 'ABC Corporation',
    budgetMin: 50000,
    budgetMax: 75000,
    deadline: '2024-05-15',
    description: 'Complete renovation of a 3-story office building including HVAC upgrades and interior remodeling.',
    industry: 'commercial'
  },
  // Add more sample jobs
];

const sampleBids = [
  {
    id: '1',
    jobTitle: 'Shopping Mall Expansion',
    proposedAmount: 85000,
    submitDate: '2024-03-01',
    status: 'pending'
  },
  // Add more sample bids
];

export function FindWorkView() {
  const [filters, setFilters] = useState({
    search: '',
    budgetRange: { min: 0, max: 0 },
    industry: '',
    deadline: ''
  });

  const handleSubmitProposal = (jobId: string) => {
    console.log('Submit proposal for job:', jobId);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Find Work</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <JobFilters
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          <div className="grid gap-4">
            {sampleJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSubmitProposal={handleSubmitProposal}
              />
            ))}
          </div>
          
          <SubmittedBids bids={sampleBids} />
        </div>
      </div>
    </div>
  );
}