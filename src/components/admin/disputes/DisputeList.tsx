```tsx
import React from 'react';
import { AlertTriangle, Clock, MessageSquare, MoreVertical } from 'lucide-react';

interface Dispute {
  id: string;
  title: string;
  projectTitle: string;
  client: string;
  contractor: string;
  status: 'open' | 'in_review' | 'resolved' | 'escalated';
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  lastUpdated: string;
}

interface DisputeListProps {
  filters: {
    status: string;
    priority: string;
    search: string;
  };
}

const sampleDisputes: Dispute[] = [
  {
    id: '1',
    title: 'Payment Delay Issue',
    projectTitle: 'City Center Mall Renovation',
    client: 'John Smith',
    contractor: 'ABC Construction',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-01',
    lastUpdated: '2024-03-02'
  },
  {
    id: '2',
    title: 'Work Quality Concern',
    projectTitle: 'Harbor Bridge Maintenance',
    client: 'Sarah Johnson',
    contractor: 'XYZ Contractors',
    status: 'in_review',
    priority: 'medium',
    createdAt: '2024-02-28',
    lastUpdated: '2024-03-01'
  }
];

export function DisputeList({ filters }: DisputeListProps) {
  const filteredDisputes = sampleDisputes.filter(dispute => {
    if (filters.status && dispute.status !== filters.status) return false;
    if (filters.priority && dispute.priority !== filters.priority) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        dispute.title.toLowerCase().includes(searchLower) ||
        dispute.projectTitle.toLowerCase().includes(searchLower) ||
        dispute.client.toLowerCase().includes(searchLower) ||
        dispute.contractor.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dispute
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parties
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDisputes.map((dispute) => (
              <tr key={dispute.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{dispute.title}</div>
                  <div className="text-sm text-gray-500">{dispute.projectTitle}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <div>Client: {dispute.client}</div>
                    <div>Contractor: {dispute.contractor}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(dispute.status)}`}>
                    {dispute.status.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(dispute.priority)}`}>
                    {dispute.priority.charAt(0).toUpperCase() + dispute.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {new Date(dispute.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(dispute.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```