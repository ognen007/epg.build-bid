import React from 'react';
import { RevenueOverview } from '../../components/admin/earnings/RevenueOverview';
import { PaymentTransactions } from '../../components/admin/earnings/PaymentTransactions';
import { WithdrawalRequests } from '../../components/admin/earnings/WithdrawalRequests';

export function EarningsManagement() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Earnings Management</h1>
      
      <RevenueOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PaymentTransactions />
        </div>
        <div className="lg:col-span-1">
          <WithdrawalRequests />
        </div>
      </div>
    </div>
  );
}