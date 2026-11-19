import React from 'react';
import { NeedsAttentionAlerts } from '../dashboard/NeedsAttentionAlerts';
import type { FinancialAlert } from '../../types';

interface AlertsViewProps {
  alerts: FinancialAlert[];
  onDismissAlert: (id: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({ alerts, onDismissAlert }) => {
  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Security & Risk Alerts</h1>
        <p className="text-xs text-slate-500">Heuristic anomaly detection log for unusual transactions, refund spikes, and budget variances.</p>
      </div>

      <div className="max-w-3xl">
        <NeedsAttentionAlerts alerts={alerts} onDismissAlert={onDismissAlert} />
      </div>
    </div>
  );
};
