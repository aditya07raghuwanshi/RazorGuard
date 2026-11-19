import React from 'react';
import { IndianRupee, TrendingUp, TrendingDown, Layers, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { demoSummaryData, formatCurrency } from '../data/demoData';
import type { SummaryData } from '../data/demoData';

interface SummaryCardsProps {
  summary?: SummaryData;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ summary = demoSummaryData }) => {
  const cards = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: formatCurrency(summary.totalRevenue),
      change: `+${summary.revenueChangePct}%`,
      isPositive: true,
      subtitle: 'vs last month',
      icon: IndianRupee,
      iconColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    },
    {
      id: 'expenses',
      title: 'Total Expenses',
      value: formatCurrency(summary.totalExpenses),
      change: `+${summary.expensesChangePct}%`,
      isPositive: false,
      subtitle: 'vs last month',
      icon: TrendingDown,
      iconColor: 'bg-rose-50 text-rose-700 border-rose-200/60',
    },
    {
      id: 'net-cash-flow',
      title: 'Net Cash Flow',
      value: formatCurrency(summary.netCashFlow),
      change: `+${summary.cashFlowChangePct}%`,
      isPositive: true,
      subtitle: 'vs last month',
      icon: TrendingUp,
      iconColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    },
    {
      id: 'transaction-volume',
      title: 'Transaction Volume',
      value: (summary.totalTransactions ?? summary.totalTransactionsCount).toLocaleString('en-IN'),
      change: `+${summary.transactionsChangePct}%`,
      isPositive: true,
      subtitle: 'total processed',
      icon: Layers,
      iconColor: 'bg-slate-100 text-slate-700 border-slate-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2 rounded-lg border ${card.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mb-2">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {card.value}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium pt-1">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                  card.isPositive
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                    : 'bg-rose-50 text-rose-800 border-rose-200/80'
                }`}
              >
                {card.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 mr-0.5 text-emerald-600" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-0.5 text-rose-600" />
                )}
                {card.change}
              </span>
              <span className="text-slate-500 text-[11px]">{card.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
