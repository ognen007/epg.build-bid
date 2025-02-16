import { useCallback, useEffect, useState } from 'react';
import { ContractorRevenue } from '../../components/contractor/earnings/ContractorRevenue';
import { EarningsOverview } from '../../components/contractor/earnings/EarningsOverview';
import { ProjectType } from '../../types/project';
import { LoadingCircle } from '../../components/contractor/components/holders/LoadingCircle';
import { fetchContractorId } from '../../services/contractor/contractorData/contractorIdEndpoint';
import { fetchContractorEarningsData } from '../../services/contractor/analytics/contractorEarnings';

export interface ContractorDetails {
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

  const loadContractorId = useCallback(async () => {
    try {
      const id = await fetchContractorId();
      setContractorId(id);
    } catch (err) {
      console.error('Error fetching contractor ID:', err);
      setError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    loadContractorId();
  }, [loadContractorId]);

  useEffect(() => {
    async function loadContractorEarningsData() {
      if (!contractorId) return;

      try {
        const data = await fetchContractorEarningsData(contractorId);
        setContractorData(data);

      } catch (error: any) {
        console.error('Error fetching contractor data:', error);
        setError(error.message || 'Failed to fetch contractor data');
      }
    }

    loadContractorEarningsData();
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