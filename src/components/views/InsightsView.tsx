import React from 'react';
import { TrendingUp, PieChart, ShieldAlert, DollarSign } from 'lucide-react';
import { AICFOCopilot } from '../AICFOCopilot';
import type { FinancialSummary, Transaction } from '../../types';
import { formatCurrency, demoSummaryData, demoMonthlyTrends, demoAlerts } from '../../data/demoData';

interface InsightsViewProps {
  summary: FinancialSummary;
  transactions: Transaction[];
}

export const InsightsView: React.FC<InsightsViewProps> = ({ summary, transactions }) => {
  const categoryTotals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Financial Intelligence & Insights</span>
          <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
            AI Controller Engine
          </span>
        </h1>
        <p className="text-xs text-slate-500">Automated financial health audit, risk insights, and cash flow projections.</p>
      </div>

      {/* AI CFO Copilot Centerpiece */}
      <AICFOCopilot
        summary={summary as unknown as typeof demoSummaryData}
        trends={demoMonthlyTrends}
        transactions={transactions}
        alerts={demoAlerts}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Profit Margin</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {((summary.netCashFlow / summary.totalRevenue) * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-slate-500">Net operating margin for the current period.</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Transaction Size</span>
            <DollarSign className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {formatCurrency(summary.totalRevenue / summary.totalTransactionsCount)}
          </div>
          <p className="text-xs text-slate-500">Calculated across {summary.totalTransactionsCount} total payments.</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Refund Rate</span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">
            2.9%
          </div>
          <p className="text-xs text-slate-500">Within healthy industry threshold (&lt; 5%).</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Transaction Category Breakdown</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <div key={category} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                {category}
              </span>
              <div className="text-lg font-bold text-slate-900">{formatCurrency(amount)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
