import React from 'react';
import { DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

const stats = {
  totalRevenue: 856000,
  platformFees: 128400,
  contractorPayouts: 684800,
  pendingPayments: 42800,
  growth: 15.8
};

export function RevenueOverview() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <div className="flex items-center mt-2">
            <DollarSign className="h-5 w-5 text-gray-500" />
            <span className="text-2xl font-bold text-gray-900">
              ${stats.totalRevenue.toLocaleString()}
            </span>
            <div className="flex items-center ml-3 text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">+{stats.growth}%</span>
            </div>
          </div>
        </div>
        <button className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center">
          View Details
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Platform Fees</div>
          <div className="text-lg font-semibold text-gray-900">
            ${stats.platformFees.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Contractor Payouts</div>
          <div className="text-lg font-semibold text-gray-900">
            ${stats.contractorPayouts.toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Pending Payments</div>
          <div className="text-lg font-semibold text-gray-900">
            ${stats.pendingPayments.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}