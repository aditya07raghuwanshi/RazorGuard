import React from 'react';
import { AICFOCopilot } from '../AICFOCopilot';
import { SummaryCards } from '../dashboard/SummaryCards';
import { FinancialChart } from '../dashboard/FinancialChart';
import { NeedsAttentionAlerts } from '../dashboard/NeedsAttentionAlerts';
import { RecentTransactions } from '../dashboard/RecentTransactions';
import type { FinancialSummary, MonthlyFinancialPoint, FinancialAlert, Transaction, ActiveTab } from '../../types';

interface OverviewViewProps {
  summary: FinancialSummary;
  chartData: MonthlyFinancialPoint[];
  alerts: FinancialAlert[];
  transactions: Transaction[];
  onDismissAlert: (id: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  summary,
  chartData,
  alerts,
  transactions,
  onDismissAlert,
  setActiveTab
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="text-xs text-slate-500">Real-time payment summary & automated controller metrics.</p>
        </div>
        <div className="text-xs text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          Last updated: <span className="font-semibold text-slate-800">Today, 4:45 PM</span>
        </div>
      </div>

      {/* AI CFO Copilot Centerpiece */}
      <AICFOCopilot
        summary={summary}
        trends={chartData}
        transactions={transactions}
        alerts={alerts}
      />

      {/* Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Main Grid: Chart & Needs Attention Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-8">
          <FinancialChart data={chartData} />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <NeedsAttentionAlerts
            alerts={alerts}
            onDismissAlert={onDismissAlert}
            onViewAllAlerts={() => setActiveTab('alerts')}
          />
        </div>
      </div>

      {/* Recent Transactions Directory */}
      <RecentTransactions
        transactions={transactions}
        onViewAllTransactions={() => setActiveTab('transactions')}
      />
    </div>
  );
};
