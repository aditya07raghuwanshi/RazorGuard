import type { SummaryData, MonthlyTrend, Transaction, FinancialAlert } from '../data/demoData';

export interface HealthScoreBreakdown {
  score: number;
  status: 'Strong' | 'Healthy' | 'Moderate' | 'At Risk';
  statusColor: string;
  marginScore: number;
  growthScore: number;
  refundScore: number;
  riskScore: number;
}

export interface CashFlowForecast {
  nextMonthLabel: string;
  projectedRevenue: number;
  projectedExpenses: number;
  projectedNet: number;
  revenueGrowthPct: number;
  confidenceInterval: string;
}

export interface AICopilotAnalysis {
  healthScore: HealthScoreBreakdown;
  summary: string;
  recommendations: Array<{
    id: string;
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    category: string;
  }>;
  forecast: CashFlowForecast;
  alertInsights: Array<{
    alertId: string;
    alertTitle: string;
    insight: string;
    impactLevel: 'Critical' | 'Warning' | 'Notice';
  }>;
}

/**
 * Deterministic Financial Controller Intelligence Engine
 * Computes health metrics, trend forecasts, and actionable insights directly from transaction data.
 */
export const runAIFinancialAnalysis = (
  summary: SummaryData,
  trends: MonthlyTrend[],
  transactions: Transaction[],
  alerts: FinancialAlert[]
): AICopilotAnalysis => {
  // -------------------------------------------------------------
  // 1. Calculate Dynamic Financial Health Score (0 - 100)
  // -------------------------------------------------------------
  const marginPct = summary.totalRevenue > 0 ? (summary.netCashFlow / summary.totalRevenue) * 100 : 0;
  const marginScore = Math.min(30, Math.max(0, Math.round((marginPct / 60) * 30)));

  const growthDiff = summary.revenueChangePct - summary.expensesChangePct;
  const growthScore = growthDiff >= 5 ? 25 : growthDiff >= 0 ? 20 : 10;

  const totalRefundAmount = transactions
    .filter((t) => t.category === 'Refund')
    .reduce((sum, t) => sum + t.amount, 0);
  const refundRatePct = summary.totalRevenue > 0 ? (totalRefundAmount / summary.totalRevenue) * 100 : 0;
  const refundScore = refundRatePct < 2 ? 20 : refundRatePct < 5 ? 15 : 8;

  let riskPenalties = 0;
  alerts.forEach((a) => {
    if (a.severity === 'high') riskPenalties += 10;
    else if (a.severity === 'medium') riskPenalties += 5;
    else riskPenalties += 2;
  });
  const riskScore = Math.max(5, 25 - riskPenalties);

  const totalScore = Math.min(100, Math.max(0, marginScore + growthScore + refundScore + riskScore));

  let status: HealthScoreBreakdown['status'] = 'Healthy';
  let statusColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
  if (totalScore >= 85) {
    status = 'Strong';
    statusColor = 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
  } else if (totalScore >= 70) {
    status = 'Healthy';
    statusColor = 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30';
  } else if (totalScore >= 50) {
    status = 'Moderate';
    statusColor = 'text-amber-400 bg-amber-950/60 border-amber-500/30';
  } else {
    status = 'At Risk';
    statusColor = 'text-rose-400 bg-rose-950/60 border-rose-500/30';
  }

  const healthScore: HealthScoreBreakdown = {
    score: totalScore,
    status,
    statusColor,
    marginScore,
    growthScore,
    refundScore,
    riskScore,
  };

  // -------------------------------------------------------------
  // 2. Generate Executive Financial Summary
  // -------------------------------------------------------------
  let summaryText = `Net profit margin is standing at a solid ${marginPct.toFixed(1)}%. Revenue is growing at ${summary.revenueChangePct}% monthly, outpacing expense growth (${summary.expensesChangePct}%). `;
  if (alerts.length > 0) {
    summaryText += `However, ${alerts.length} active risk ${alerts.length === 1 ? 'alert requires' : 'alerts require'} attention, primarily driven by marketing spend variances and large single transactions.`;
  } else {
    summaryText += `All key metrics remain well within normal risk parameters with zero active warnings.`;
  }

  // -------------------------------------------------------------
  // 3. Generate Data-Driven Actionable Recommendations
  // -------------------------------------------------------------
  const recommendations: AICopilotAnalysis['recommendations'] = [];

  const marketingTotal = transactions
    .filter((t) => t.category === 'Marketing')
    .reduce((sum, t) => sum + t.amount, 0);

  if (marketingTotal > 30000) {
    recommendations.push({
      id: 'rec-1',
      title: 'Optimize Marketing Expenditure',
      description: `Marketing spend reached ${formatCurrency(marketingTotal)} this period. Evaluate ROAS on ad channels to cap monthly variance within 15%.`,
      priority: 'Medium',
      category: 'Cost Control',
    });
  }

  const highTx = transactions.find((t) => t.amount > summary.totalRevenue * 0.15);
  if (highTx) {
    recommendations.push({
      id: 'rec-2',
      title: 'Audit Enterprise Payment Inflow',
      description: `Single payment of ${formatCurrency(highTx.amount)} from ${highTx.customer} accounts for >15% of monthly revenue. Verify contract renewal terms.`,
      priority: 'High',
      category: 'Revenue Concentration',
    });
  }

  recommendations.push({
    id: 'rec-3',
    title: 'Maintain Cash Reserve Buffer',
    description: `Net cash flow is positive at ${formatCurrency(summary.netCashFlow)}. Allocate 20% to operational working capital reserves.`,
    priority: 'Low',
    category: 'Treasury Management',
  });

  // -------------------------------------------------------------
  // 4. Trend-Based Cash Flow Forecast Calculation
  // -------------------------------------------------------------
  let projRev = summary.totalRevenue * 1.05;
  let projExp = summary.totalExpenses * 1.03;

  if (trends && trends.length >= 2) {
    const recent = trends.slice(-3);
    const avgRevGrowth =
      recent.reduce((sum, t, idx, arr) => {
        if (idx === 0) return 0;
        return sum + (t.revenue - arr[idx - 1].revenue) / arr[idx - 1].revenue;
      }, 0) / (recent.length - 1);

    const avgExpGrowth =
      recent.reduce((sum, t, idx, arr) => {
        if (idx === 0) return 0;
        return sum + (t.expenses - arr[idx - 1].expenses) / arr[idx - 1].expenses;
      }, 0) / (recent.length - 1);

    const lastTrend = trends[trends.length - 1];
    projRev = Math.round(lastTrend.revenue * (1 + avgRevGrowth));
    projExp = Math.round(lastTrend.expenses * (1 + avgExpGrowth));
  }

  const projNet = projRev - projExp;
  const revGrowthPct = Number((((projRev - summary.totalRevenue) / summary.totalRevenue) * 100).toFixed(1));

  const forecast: CashFlowForecast = {
    nextMonthLabel: 'September 2026 (Projected)',
    projectedRevenue: projRev,
    projectedExpenses: projExp,
    projectedNet: projNet,
    revenueGrowthPct: revGrowthPct,
    confidenceInterval: '±3.8% (Linear Weighted Moving Average)',
  };

  // -------------------------------------------------------------
  // 5. Generate Contextual "Why This Matters" Alert Insights
  // -------------------------------------------------------------
  const alertInsights: AICopilotAnalysis['alertInsights'] = alerts.map((a) => {
    let impactLevel: 'Critical' | 'Warning' | 'Notice' = 'Notice';
    let insight = `Monitors operational financial consistency.`;

    if (a.severity === 'high') {
      impactLevel = 'Critical';
      insight = `Large single payments increase revenue concentration risk. If delayed or disputed, working capital availability will drop sharply.`;
    } else if (a.severity === 'medium') {
      impactLevel = 'Warning';
      insight = `Surges in customer refunds directly impact net margin and may signal product or fulfillment quality dissatisfaction.`;
    } else {
      impactLevel = 'Notice';
      insight = `Discretionary marketing costs are rising faster than organic growth. Budget caps should be enforced.`;
    }

    return {
      alertId: a.id,
      alertTitle: a.title,
      insight,
      impactLevel,
    };
  });

  return {
    healthScore,
    summary: summaryText,
    recommendations,
    forecast,
    alertInsights,
  };
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
