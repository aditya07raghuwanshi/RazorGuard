import React, { useState, useMemo } from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';
import { demoTransactions, formatCurrency } from '../data/demoData';
import type { Transaction, FinancialAlert } from '../data/demoData';

export interface AlertItem {
  id: string;
  ruleId: string;
  severity: 'high' | 'warning' | 'info';
  title: string;
  explanation: string;
  impact: string;
  actionLabel?: string;
}

interface NeedsAttentionAlertsProps {
  transactions?: Transaction[];
  alerts?: FinancialAlert[];
  onDismissAlert?: (id: string) => void;
  onViewAllAlerts?: () => void;
}

export const NeedsAttentionAlerts: React.FC<NeedsAttentionAlertsProps> = ({
  transactions = demoTransactions,
  alerts: externalAlerts,
  onDismissAlert: externalOnDismiss,
  onViewAllAlerts,
}) => {
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  // Dynamically evaluate business rules on given transactions
  const evaluatedAlerts = useMemo(() => {
    const generatedAlerts: AlertItem[] = [];

    if (!transactions || transactions.length === 0) return generatedAlerts;

    // -------------------------------------------------------------
    // RULE 1: Unusually High Transaction
    // Rule: Transaction amount > 2.5x average transaction size
    // -------------------------------------------------------------
    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
    const avgAmount = totalAmount / transactions.length;
    const highThreshold = avgAmount * 2.5;

    const highTx = transactions.find((t) => t.amount > highThreshold);

    if (highTx) {
      const multiplier = (highTx.amount / avgAmount).toFixed(1);
      generatedAlerts.push({
        id: `alert-high-tx-${highTx.id}`,
        ruleId: 'RULE_1',
        severity: 'high',
        title: 'Unusually High Transaction',
        explanation: `Inbound payment of ${formatCurrency(highTx.amount)} received from "${highTx.customer}" (${highTx.description}). This is ${multiplier}x higher than average size (${formatCurrency(Math.round(avgAmount))}).`,
        impact: `+${formatCurrency(highTx.amount)} Inflow`,
        actionLabel: 'Review Transaction',
      });
    }

    // -------------------------------------------------------------
    // RULE 2: Refund Surge
    // Rule: 4 or more refunds within a 48-hour window
    // -------------------------------------------------------------
    const timestamps = transactions.map((t) => new Date(t.date).getTime());
    const maxTime = Math.max(...timestamps);
    const fortyEightHoursMs = 48 * 60 * 60 * 1000;

    const recentRefunds = transactions.filter((t) => {
      if (t.category !== 'Refund') return false;
      const txTime = new Date(t.date).getTime();
      return maxTime - txTime <= fortyEightHoursMs;
    });

    if (recentRefunds.length >= 4) {
      const refundTotal = recentRefunds.reduce((sum, r) => sum + r.amount, 0);
      generatedAlerts.push({
        id: 'alert-refund-surge',
        ruleId: 'RULE_2',
        severity: 'warning',
        title: 'Refund Surge Detected',
        explanation: `${recentRefunds.length} refunds totaling ${formatCurrency(refundTotal)} occurred within the last 48-hour window.`,
        impact: `-${formatCurrency(refundTotal)} Outflow`,
        actionLabel: 'Inspect Refund Logs',
      });
    }

    // -------------------------------------------------------------
    // RULE 3: Marketing Spend Warning
    // Rule: Marketing spend increases by more than 20% compared to baseline
    // -------------------------------------------------------------
    const marketingTxList = transactions.filter((t) => t.category === 'Marketing');
    const currentMarketingSpend = marketingTxList.reduce((sum, t) => sum + t.amount, 0);
    const baselineMarketingSpend = 30000;

    if (currentMarketingSpend > 0) {
      const percentIncrease = Math.round(
        ((currentMarketingSpend - baselineMarketingSpend) / baselineMarketingSpend) * 100
      );

      if (percentIncrease > 20) {
        generatedAlerts.push({
          id: 'alert-marketing-warning',
          ruleId: 'RULE_3',
          severity: 'info',
          title: 'Marketing Spend Warning',
          explanation: `Marketing expenditure reached ${formatCurrency(currentMarketingSpend)} this period, representing a ${percentIncrease}% increase over the baseline average.`,
          impact: `+${percentIncrease}% Spend Variance`,
          actionLabel: 'View Marketing Breakdown',
        });
      }
    }

    return generatedAlerts;
  }, [transactions]);

  // Combine or convert external alerts if provided, fallback to dynamically evaluated rules
  const displayAlerts: AlertItem[] = useMemo(() => {
    if (externalAlerts && externalAlerts.length > 0) {
      return externalAlerts.map((a) => ({
        id: a.id,
        ruleId: 'EXTERNAL',
        severity: a.severity === 'medium' ? 'warning' : a.severity,
        title: a.title,
        explanation: a.description,
        impact: a.impact,
      }));
    }
    return evaluatedAlerts;
  }, [externalAlerts, evaluatedAlerts]);

  // Filter out session-dismissed alerts
  const activeAlerts = displayAlerts.filter((a) => !dismissedIds.includes(a.id));

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => [...prev, id]);
    if (externalOnDismiss) {
      externalOnDismiss(id);
    }
  };

  const getSeverityStyle = (severity: AlertItem['severity']) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-rose-50/70 border-rose-200/90 text-rose-950',
          icon: AlertCircle,
          iconColor: 'text-rose-600',
          badge: 'bg-rose-100 text-rose-800 border-rose-200',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50/70 border-amber-200/90 text-amber-950',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
          badge: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      case 'info':
      default:
        return {
          bg: 'bg-slate-50 border-slate-200 text-slate-900',
          icon: Info,
          iconColor: 'text-slate-600',
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs w-full flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
            <h2 className="text-base font-bold text-slate-900">Needs Attention</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded-md">
              {activeAlerts.length} Active
            </span>
          </div>
          {onViewAllAlerts && (
            <button
              onClick={onViewAllAlerts}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View All →
            </button>
          )}
        </div>

        {/* Alert List */}
        {activeAlerts.length === 0 ? (
          <div className="py-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700">No active alerts</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              All financial activity is within normal risk thresholds.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => {
              const style = getSeverityStyle(alert.severity);
              const Icon = style.icon;

              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-all ${style.bg} relative`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.iconColor}`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h3 className="text-xs font-bold text-slate-900 leading-snug">
                            {alert.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${style.badge}`}
                          >
                            {alert.severity}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-2">
                          {alert.explanation}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium pt-2 border-t border-slate-200/60">
                          <span className="font-bold text-slate-800">Impact: {alert.impact}</span>

                          {alert.actionLabel && (
                            <span className="text-indigo-600 font-semibold text-[11px]">
                              {alert.actionLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dismiss Button */}
                    <button
                      onClick={() => handleDismiss(alert.id)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors shrink-0"
                      title="Dismiss alert"
                      aria-label="Dismiss alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Rule Engine: <strong className="text-slate-700 font-semibold">Heuristics v1.0</strong></span>
        <span className="text-[11px] text-slate-400 font-mono">Deterministic Rules</span>
      </div>
    </div>
  );
};

export default NeedsAttentionAlerts;
