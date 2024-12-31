import React from 'react';
import { DollarSign, Download } from 'lucide-react';

interface Transaction {
  id: string;
  clientName: string;
  projectTitle: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending';
  invoiceUrl?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  onDownloadInvoice: (transaction: Transaction) => void;
}

export function TransactionHistory({ transactions, onDownloadInvoice }: TransactionHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{transaction.projectTitle}</h3>
                <p className="text-sm text-gray-500">{transaction.clientName}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  ${transaction.amount.toLocaleString()}
                </p>
                <span className={`
                  inline-flex px-2 py-1 text-xs font-medium rounded-full
                  ${transaction.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                `}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
              {transaction.status === 'paid' && transaction.invoiceUrl && (
                <button
                  onClick={() => onDownloadInvoice(transaction)}
                  className="flex items-center text-orange-600 hover:text-orange-700"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Invoice
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}