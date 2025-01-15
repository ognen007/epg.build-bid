import React from 'react';
import { DollarSign, Clock, CheckCircle } from 'lucide-react';

interface EarningsStats {
  totalEarnings: number;
  pendingPayments: number;
  paidInvoices: number;
}

interface EarningsOverviewProps {
  stats: EarningsStats;
}

export function EarningsOverview({ stats }: EarningsOverviewProps) {
  const cards = [
    {
      title: 'Total Earnings',
      value: stats.totalEarnings,
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Loss',
      value: stats.pendingPayments,
      icon: Clock,
      color: 'bg-red-100 text-red-600',
    },
    {
      title: 'In Progress',
      value: stats.paidInvoices,
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">
                {card.title === 'Total Earnings' 
                  ? `$${card.value.toLocaleString()}`
                  : `${card.value.toLocaleString()}`}
              </p>
            </div>
            <div className={`p-3 rounded-full ${card.color}`}>
              <card.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}