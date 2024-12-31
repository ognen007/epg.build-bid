export interface Contractor {
  id: string;
  name: string;
  location: string;
  expertise: string[];
  rating: number;
  completedProjects: number;
  hourlyRate: number;
  availability: 'immediate' | 'thisWeek' | 'nextWeek';
  projectTypes: ('residential' | 'commercial' | 'industrial')[];
  avatar: string;
}