import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { ProjectProposals } from '../../components/contractor/projects/ProjectProposals';
import { ProjectWorkflowView } from '../../components/contractor/projectworkflow/ProjectWorkflowView';
import { ProjectSearch } from './ProjectSearch';
import { ProjectType } from '../../types/project';

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
  const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state
  const [loggedInContractor, setLoggedInContractor] = useState<any>(null); // Add logged-in contractor state

  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);
  const [selectedContractorId, setSelectedContractorId] = useState<string | undefined>();
  const [selectedView, setSelectedView] = useState<'pipeline' | 'tasks'>('pipeline');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all contractors and filter the logged-in contractor
  useEffect(() => {
    const fetchContractorData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("No User");
          setError("User not found");
          setLoading(false);
          return;
        }
        const user = JSON.parse(storedUser);
        const { email } = user;

        // Fetch all contractors from the backend
        const response = await axios.get('https://epg-backend.onrender.com/api/contractor/id');

        // Log the response for debugging
        console.log('All Contractors:', response.data);

        // Filter the contractor with the matching email
        const loggedInContractor = response.data.find(
          (contractor: any) => contractor.email === email
        );

        if (!loggedInContractor) {
          throw new Error('Logged-in contractor not found');
        }

        // Update the logged-in contractor state with the filtered data
        setLoggedInContractor(loggedInContractor);

        // Fetch projects specific to the logged-in contractor if needed
        // Set projects state with actual data
        // setProjects(loggedInContractor.projects);

      } catch (err) {
        console.error('Error fetching contractor data:', err);
        setError('Failed to fetch contractor data'); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchContractorData();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://epg-backend.onrender.com/api/project/display');
        if (response.data && Array.isArray(response.data.projects)) {
          setAllProjects(response.data.projects);
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

    // Filter projects based on selected contractor
    useEffect(() => {
      if (loggedInContractor) {
        const selectedContractor = loggedInContractor
        if (selectedContractor) {
          const filtered = allProjects.filter(project => project.contractor === selectedContractor.fullName);
          setFilteredProjects(filtered);
        } else {
          setFilteredProjects([]);
        }
      } else {
        setFilteredProjects(allProjects);
      }
    }, [selectedContractorId, allProjects]);

  const handleAcceptProposal = (id: string) => {
    // Handle proposal acceptance
    console.log('Proposal accepted:', id);
  };

  const handleDeclineProposal = (id: string) => {
    // Handle proposal decline
    console.log('Proposal declined:', id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <ProjectSearch onSearchChange={() => console.log("Hi")} searchQuery="Search Project" />
      {/* <ProjectProposals
        proposals={projects.proposals}
        onAccept={handleAcceptProposal}
        onDecline={handleDeclineProposal}
      /> */}

      <ProjectWorkflowView />
    </div>
  );
}