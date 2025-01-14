import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectProposals } from '../../components/contractor/projects/ProjectProposals';
import { ProjectWorkflowView } from '../../components/contractor/projectworkflow/ProjectWorkflowView';
import { ProjectSearch } from './ProjectSearch';
import { ProjectType } from '../../types/project';
import { useSearchParams } from 'react-router-dom';

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

  // Filter projects based on contractor fullName
  useEffect(() => {
    if (contractor && allProjects.length > 0) {
      const projectsForContractor = allProjects.filter(
        (project) => project.contractor === contractor.fullName
      );
      setFilteredProjects(projectsForContractor);
      console.log('Filtered Projects:', projectsForContractor);
    }
  }, [contractor, allProjects]);

  const handleAcceptProposal = () => {
    console.log('Proposal accepted:');
  };

  const handleDeclineProposal = () => {
    console.log('Proposal declined:');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <ProjectSearch onSearchChange={() => console.log('Hi')} searchQuery="Search Project" />
      <ProjectProposals
        proposals={filteredProjects}
        onAccept={handleAcceptProposal}
        onDecline={handleDeclineProposal}
      />
      <ProjectWorkflowView />
    </div>
  );
}