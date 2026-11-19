import React from 'react';
import { RecentTransactions } from '../dashboard/RecentTransactions';
import type { Transaction } from '../../types';
import { Download } from 'lucide-react';

interface TransactionsViewProps {
  transactions: Transaction[];
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({ transactions }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Transactions Directory</h1>
          <p className="text-xs text-slate-500">View and manage all demo payments, refunds, and business expenses.</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Demo export functionality - CSV format export ready.')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <RecentTransactions transactions={transactions} />
    </div>
  );
};
