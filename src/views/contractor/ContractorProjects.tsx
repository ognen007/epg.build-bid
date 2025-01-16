import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectProposals } from '../../components/contractor/projects/ProjectProposals';
import { ProjectWorkflowView } from '../../components/contractor/projectworkflow/ProjectWorkflowView';
import { ProjectSearch } from './ProjectSearch';
import { ProjectType } from '../../types/project';

// Define ContractorType interface
export interface ContractorType {
  id: string;
  fullName: string; // Add fullName to match the backend response
  email: string;
}

export function ContractorProjects() {
  const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
  const [contractor, setContractor] = useState<ContractorType | null>(null); // Fix: Single contractor or null
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(''); // Add searchQuery state

  // Fetch contractor data
  useEffect(() => {
    const fetchContractorData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          console.error('No User');
          setError('User not found');
          setLoading(false);
          return;
        }

        const user = JSON.parse(storedUser);
        const { email } = user;

        // Fetch all contractors
        const response = await axios.get('https://epg-backend.onrender.com/api/contractor/id');
        console.log('All Contractors:', response.data);

        // Find the logged-in contractor by email
        const loggedInContractor = response.data.find(
          (contractor: ContractorType) => contractor.email === email
        );

        if (!loggedInContractor) {
          throw new Error('Logged-in contractor not found');
        }

        // Set the contractor state
        setContractor(loggedInContractor);
        console.log('Logged-in Contractor:', loggedInContractor);
      } catch (err) {
        console.error('Error fetching contractor data:', err);
        setError('Failed to fetch contractor data');
      } finally {
        setLoading(false);
      }
    };

    fetchContractorData();
  }, []);

  // Fetch all projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://epg-backend.onrender.com/api/project/display');
        if (response.data && Array.isArray(response.data.projects)) {
          setAllProjects(response.data.projects);
          console.log('All Projects:', response.data.projects);
        } else {
          throw new Error('Invalid data format: Expected an array of projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on contractor fullName and search query
  useEffect(() => {
    if (contractor && allProjects.length > 0) {
      let projectsForContractor = allProjects.filter(
        (project) => project.contractor === contractor.fullName
      );

      // Apply search query filter
      if (searchQuery) {
        projectsForContractor = projectsForContractor.filter((project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProjects(projectsForContractor);
      console.log('Filtered Projects:', projectsForContractor);
    }
  }, [contractor, allProjects, searchQuery]);

  // Handle accepting a proposal
  const handleAcceptProposal = async (taskId: string) => {
    if (!contractor) {
      console.error('Contractor not found');
      return;
    }

    try {
      // Call the endpoint to update the task's hold and status
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/projects/hold/${taskId}`
      );

      console.log('Task updated:', response.data);

      // Refresh the projects list
      const updatedProjects = allProjects.map((project) =>
        project.id === taskId
          ? {
              ...project,
              hold: 'takeoff_in_progress', // Ensure this matches the expected type
              status: 'takeoff_in_progress', // Ensure this matches the expected type
            }
          : project
      );

      // Update the state with the new projects list
      setAllProjects(updatedProjects);
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again later.');
    }
  };

  const handleDeclineProposal = () => {
    console.log('Proposal declined:');
  };

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  // Skeleton loader for loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ProjectSearch Skeleton */}
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-full max-w-md"></div>
        </div>

        {/* ProjectProposals Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="flex space-x-4">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>

        {/* ProjectWorkflowView Skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-red-600 p-6">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <ProjectSearch
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange} // Pass the search handler
      />
      <ProjectProposals
        proposals={filteredProjects}
        onAccept={handleAcceptProposal}
        onDecline={handleDeclineProposal}
      />
      <ProjectWorkflowView contractorId={contractor?.id || ''} />
    </div>
  );
}