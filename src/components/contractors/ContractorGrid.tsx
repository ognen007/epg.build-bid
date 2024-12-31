import React from 'react';
import { ContractorCard } from './ContractorCard';
import { Contractor } from '../../types/contractor';
import { ContractorFilters } from './ContractorFilters';

interface ContractorGridProps {
  filters: ContractorFilters;
}

const sampleContractors: Contractor[] = [
  {
    id: '1',
    name: 'John Smith',
    location: 'New York, NY',
    expertise: ['Electrical', 'HVAC'],
    rating: 4.8,
    completedProjects: 127,
    hourlyRate: 85,
    availability: 'immediate',
    projectTypes: ['residential', 'commercial'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    location: 'Los Angeles, CA',
    expertise: ['Plumbing', 'Construction'],
    rating: 4.9,
    completedProjects: 93,
    hourlyRate: 75,
    availability: 'thisWeek',
    projectTypes: ['residential'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '3',
    name: 'Michael Chen',
    location: 'Chicago, IL',
    expertise: ['Carpentry', 'Painting'],
    rating: 4.7,
    completedProjects: 64,
    hourlyRate: 65,
    availability: 'nextWeek',
    projectTypes: ['commercial', 'industrial'],
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export function ContractorGrid({ filters }: ContractorGridProps) {
  const filteredContractors = sampleContractors.filter(contractor => {
    // Rating filter
    if (filters.rating && contractor.rating < filters.rating) {
      return false;
    }

    // Availability filter
    if (filters.availability && contractor.availability !== filters.availability) {
      return false;
    }

    // Location filter
    if (filters.location && !contractor.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // Price range filter
    if (filters.priceRange.min && contractor.hourlyRate < filters.priceRange.min) {
      return false;
    }
    if (filters.priceRange.max && contractor.hourlyRate > filters.priceRange.max) {
      return false;
    }

    // Project type filter
    if (filters.projectType && !contractor.projectTypes.includes(filters.projectType)) {
      return false;
    }

    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredContractors.map(contractor => (
        <ContractorCard key={contractor.id} contractor={contractor} />
      ))}
    </div>
  );
}