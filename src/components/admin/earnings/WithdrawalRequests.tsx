import React from 'react';
import { Check, X, User } from 'lucide-react';

interface WithdrawalRequest {
  id: string;
  contractor: {
    name: string;
    email: string;
  };
  amount: number;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const withdrawalRequests: WithdrawalRequest[] = [
  {
    id: '1',
    contractor: {
      name: 'John Smith',
      email: 'john.smith@example.com'
    },
    amount: 5000,
    requestDate: '2024-03-01',
    status: 'pending'
  },
  {
    id: '2',
    contractor: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com'
    },
    amount: 7500,
    requestDate: '2024-03-02',
    status: 'pending'
  }
];

export function WithdrawalRequests() {
  const handleApprove = (id: string) => {
    console.log('Approve withdrawal:', id);
  };

  const handleReject = (id: string) => {
    console.log('Reject withdrawal:', id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Withdrawal Requests</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {withdrawalRequests.map((request) => (
          <div key={request.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {request.contractor.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {request.contractor.email}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${request.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  Requested {new Date(request.requestDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => handleReject(request.id)}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </button>
              <button
                onClick={() => handleApprove(request.id)}
                className="flex items-center px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
              >
                <Check className="h-4 w-4 mr-2" />
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}