import { useEffect, useState } from 'react';
import { ContractorRevenue } from '../../components/contractor/earnings/ContractorRevenue';
import { EarningsOverview } from '../../components/contractor/earnings/EarningsOverview';
import { ProjectType } from '../../types/project';
import { LoadingCircle } from '../../components/contractor/components/holders/LoadingCircle';

interface ContractorDetails {
  id: string;
  contractor: {
    name: string;
    email: string;
    company: string;
  };
  totalRevenue: number;
  lastMonthRevenue: number;
  growth: number;
  projectsCompleted: number;
  projects: ProjectType[];
}

export function ContractorEarnings({ loading }: { loading: boolean }) {
  const [contractorData, setContractorData] = useState<ContractorDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [contractorId, setContractorId] = useState<string>("");

  useEffect(() => {
    const fetchContractorId = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setError('User not found');
          return;
        }

        const user = JSON.parse(storedUser);
        const { email } = user;

        // Fetch all contractors from the backend
        const response = await fetch('https://epg-backend.onrender.com/api/contractor/id');
        if (!response.ok) {
          throw new Error('Failed to fetch contractors');
        }

        const contractors = await response.json();

        // Find the logged-in contractor by email
        const loggedInContractor = contractors.find(
          (contractor: any) => contractor.email === email
        );

        if (!loggedInContractor) {
          throw new Error('Logged-in contractor not found');
        }

        // Set the contractor ID in the state
        setContractorId(loggedInContractor.id);
      } catch (error) {
        console.error('Error fetching contractor ID:', error);
        setError('Failed to fetch contractor ID');
      }
    };

    fetchContractorId();
  }, []);

  useEffect(() => {
    const fetchContractorData = async () => {
      if (!contractorId) return;

      try {
        const response = await fetch(`https://epg-backend.onrender.com/api/contractor-information/${contractorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch contractor data');
        }

        const data = await response.json();
        setContractorData(data);
      } catch (error) {
        console.error('Error fetching contractor data:', error);
        setError('Failed to fetch contractor data');
      }
    };

    fetchContractorData();
  }, [contractorId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!contractorData) {
    return <LoadingCircle label='Loading....'/>
  }

  // Calculate stats for EarningsOverview
  const stats = {
    totalEarnings: contractorData.totalRevenue,
    pendingPayments: contractorData.lastMonthRevenue, // Assuming lastMonthRevenue represents pending payments
    paidInvoices: contractorData.projectsCompleted, // Assuming projectsCompleted represents paid invoices
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {loading ? (
        <>
          <LoadingCircle label='Loading....'/>
        </>
      ):(
        <>
        <h1 className="text-2xl font-semibold text-gray-900">Earnings</h1>
      
        {/* Pass the fetched stats to EarningsOverview */}
        <EarningsOverview stats={stats} />
    
        {/* Pass the fetched projects to ContractorRevenue */}
        <ContractorRevenue projects={contractorData.projects} />
        </>
      )}
    </div>
  );
}