import React, { useState } from 'react';
import { Search, Filter, Inbox } from 'lucide-react';
import { demoTransactions, formatCurrency } from '../data/demoData';
import type { Transaction, TransactionCategory } from '../data/demoData';

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onViewAllTransactions?: () => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions = demoTransactions,
  onViewAllTransactions
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: string[] = ['All', 'Payment', 'Refund', 'Subscription', 'Operations', 'Marketing'];

  // Fully case-insensitive client-side search & category filtering (AND logic)
  const filteredTransactions = transactions.filter((tx) => {
    const query = searchQuery.trim().toLowerCase();

    // Target fields for case-insensitive matching: Transaction ID, Description, Customer Name
    const idStr = String(tx.id || '').toLowerCase();
    const descStr = String(tx.description || '').toLowerCase();
    const customerStr = String(tx.customer || (tx as any).customerName || '').toLowerCase();

    const matchesSearch =
      query === '' ||
      idStr.includes(query) ||
      descStr.includes(query) ||
      customerStr.includes(query);

    const matchesCategory =
      selectedCategory === 'All' || tx.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryBadgeClass = (category: TransactionCategory) => {
    switch (category) {
      case 'Payment':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'Refund':
        return 'bg-rose-50 text-rose-800 border-rose-200/80';
      case 'Subscription':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200/80';
      case 'Operations':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'Marketing':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadgeClass = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'Refunded':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden w-full">
      {/* Header Controls: Search & Category Filter */}
      <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Recent Transactions</h2>
          <p className="text-xs text-slate-500 mt-0.5">Live payment directory & ledger</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search ID, description, customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Area (Scrollable on mobile) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Description / Customer</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <Inbox className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-700 text-xs">No transactions found</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      No records match your search &quot;{searchQuery}&quot; and category &quot;{selectedCategory}&quot;.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => {
                const isExpenseOrRefund = tx.category === 'Refund' || tx.category === 'Operations' || tx.category === 'Marketing';

                return (
                  <tr key={tx.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                      {tx.id}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-600 whitespace-nowrap">
                      {tx.date}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{tx.description}</div>
                      {(tx.customer || (tx as any).customerName) && (
                        <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                          {tx.customer || (tx as any).customerName}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getCategoryBadgeClass(tx.category)}`}>
                        {tx.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap font-medium">
                      {tx.paymentMethod}
                    </td>

                    <td className="py-3.5 px-4 text-right font-extrabold whitespace-nowrap">
                      <span className={isExpenseOrRefund ? 'text-slate-800' : 'text-emerald-700'}>
                        {isExpenseOrRefund ? '-' : '+'}{formatCurrency(tx.amount)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeClass(tx.status)}`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {onViewAllTransactions && (
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center">
          <button
            onClick={onViewAllTransactions}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View All Transactions →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
