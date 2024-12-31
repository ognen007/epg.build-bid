import React, { useState } from 'react';
import { OngoingProjects } from '../../components/contractor/projects/OngoingProjects';
import { CompletedProjects } from '../../components/contractor/projects/CompletedProjects';
import { ProjectProposals } from '../../components/contractor/projects/ProjectProposals';
import { Project } from '../../types/project';

const sampleProjects = {
  ongoing: [
    {
      id: '1',
      title: 'City Center Mall Renovation',
      clientName: 'John Smith',
      status: 'in_progress',
      progress: 65,
      deadline: '2024-04-15',
      description: 'Interior renovation project'
    }
  ],
  completed: [
    {
      id: '2',
      title: 'Harbor Bridge Maintenance',
      rating: 4.5,
      paymentStatus: 'paid',
      description: 'Bridge maintenance and repairs'
    }
  ],
  proposals: [
    {
      id: '3',
      title: 'Downtown Park Redesign',
      description: 'Complete redesign of central park area',
      budget: 95000,
      deadline: '2024-05-20'
    }
  ]
};

export function ContractorProjects() {
  const [projects, setProjects] = useState(sampleProjects);

  const handleProjectClick = (project: Project) => {
    // Handle project click
    console.log('Project clicked:', project);
  };

  const handleAcceptProposal = (id: string) => {
    // Handle proposal acceptance
    console.log('Proposal accepted:', id);
  };

  const handleDeclineProposal = (id: string) => {
    // Handle proposal decline
    console.log('Proposal declined:', id);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <ProjectProposals
        proposals={projects.proposals}
        onAccept={handleAcceptProposal}
        onDecline={handleDeclineProposal}
      />
      
      <OngoingProjects
        projects={projects.ongoing}
        onProjectClick={handleProjectClick}
      />
      
      <CompletedProjects
        projects={projects.completed}
        onProjectClick={handleProjectClick}
      />
    </div>
  );
}