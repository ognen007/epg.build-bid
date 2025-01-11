import { ContractorRevenue } from '../../components/contractor/earnings/ContractorRevenue';
import { EarningsOverview } from '../../components/contractor/earnings/EarningsOverview';

const sampleData = {
  stats: {
    totalEarnings: 125000,
    pendingPayments: 15000,
    paidInvoices: 24
  },
  transactions: [
    {
      id: '1',
      clientName: 'ABC Corporation',
      projectTitle: 'Office Building Renovation',
      amount: 45000,
      date: '2024-03-01',
      status: 'paid',
      invoiceUrl: '/invoices/1'
    },
    {
      id: '2',
      clientName: 'XYZ Industries',
      projectTitle: 'Factory Maintenance',
      amount: 15000,
      date: '2024-03-15',
      status: 'pending'
    }
  ]
};

export function ContractorEarnings() {

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Earnings</h1>
      
      <EarningsOverview stats={sampleData.stats} />
  
  <ContractorRevenue/>
    </div>
  );
}