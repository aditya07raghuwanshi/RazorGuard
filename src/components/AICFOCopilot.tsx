import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';
import { runAIFinancialAnalysis } from '../utils/aiControllerEngine';
import type { AICopilotAnalysis } from '../utils/aiControllerEngine';
import { 
  demoSummaryData, 
  demoMonthlyTrends, 
  demoTransactions, 
  demoAlerts, 
  formatCurrency 
} from '../data/demoData';
import type { SummaryData, MonthlyTrend, Transaction, FinancialAlert } from '../data/demoData';

interface AICFOCopilotProps {
  summary?: SummaryData;
  trends?: MonthlyTrend[];
  transactions?: Transaction[];
  alerts?: FinancialAlert[];
}

export const AICFOCopilot: React.FC<AICFOCopilotProps> = ({
  summary = demoSummaryData,
  trends = demoMonthlyTrends,
  transactions = demoTransactions,
  alerts = demoAlerts,
}) => {
  const analysis: AICopilotAnalysis = runAIFinancialAnalysis(summary, trends, transactions, alerts);
  const { healthScore, summary: execSummary, recommendations, forecast, alertInsights } = analysis;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-2xl border border-slate-700/80 shadow-xl p-5 sm:p-6 w-full space-y-6">
      {/* 1. Header Bar — Command Center Hero Title & Circular Health Score */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold tracking-tight text-white">AI CFO Command Center</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 border border-indigo-700/50 rounded-md">
                Controller Engine v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Automated financial health audit, risk signals & trend projections
            </p>
          </div>
        </div>

        {/* Financial Health Progress Ring & Score Badge */}
        <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-xl self-start md:self-auto shadow-sm">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-700"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-1000 ease-out"
                strokeDasharray={`${healthScore.score}, 100`}
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-black text-white">{healthScore.score}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Financial Health</span>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${healthScore.statusColor}`}>
                {healthScore.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Margin {healthScore.marginScore}/30 • Growth {healthScore.growthScore}/25 • Risk {healthScore.riskScore}/25
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Executive Summary & Actionable Recommendations (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Executive Financial Summary */}
          <div className="bg-slate-800/60 border border-slate-700/80 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Executive Financial Summary</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {execSummary}
            </p>
          </div>

          {/* Actionable Recommendations */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>AI Recommendations ({recommendations.length})</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">Data-driven controller insights</span>
            </div>

            <div className="space-y-2.5">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 bg-slate-800/40 border border-slate-700/60 rounded-xl hover:border-slate-600 transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-100">{rec.title}</span>
                      <span className="px-1.5 py-0.2 text-[10px] font-semibold text-slate-400 bg-slate-900 border border-slate-700 rounded">
                        {rec.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{rec.description}</p>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded border shrink-0 ${
                      rec.priority === 'High'
                        ? 'bg-rose-950/60 text-rose-300 border-rose-800/60'
                        : rec.priority === 'Medium'
                        ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                        : 'bg-slate-900 text-slate-300 border-slate-700'
                    }`}
                  >
                    {rec.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Cash Flow Forecast & Alert Insights (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Trend-Based Cash Flow Forecast */}
          <div className="bg-slate-800/60 border border-slate-700/80 p-4.5 rounded-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Cash Flow Forecast</span>
              </div>
              <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-950/90 px-2.5 py-0.5 rounded-md border border-indigo-700/50">
                {forecast.nextMonthLabel}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60">
                <div className="text-[10px] font-medium text-slate-400">Proj. Revenue</div>
                <div className="text-xs font-bold text-emerald-400 mt-1">{formatCurrency(forecast.projectedRevenue)}</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60">
                <div className="text-[10px] font-medium text-slate-400">Proj. Expenses</div>
                <div className="text-xs font-bold text-slate-300 mt-1">{formatCurrency(forecast.projectedExpenses)}</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700/60">
                <div className="text-[10px] font-medium text-slate-400">Proj. Net Cash</div>
                <div className="text-xs font-bold text-indigo-300 mt-1">{formatCurrency(forecast.projectedNet)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                Rev Growth: <strong className="text-emerald-400 font-semibold">+{forecast.revenueGrowthPct}%</strong>
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{forecast.confidenceInterval}</span>
            </div>
          </div>

          {/* Contextual "Why This Matters" Alert Insights */}
          {alertInsights.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Why This Matters — Risk Insights</span>
                </span>
                <span className="text-[10px] text-slate-400">{alerts.length} active</span>
              </div>

              <div className="space-y-2">
                {alertInsights.map((insight, idx) => (
                  <div key={idx} className="p-3 bg-slate-800/40 border border-slate-700/60 rounded-xl text-xs space-y-1 hover:border-slate-600 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{insight.alertTitle}</span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                          insight.impactLevel === 'Critical'
                            ? 'text-rose-300 bg-rose-950/60 border-rose-800/50'
                            : 'text-amber-300 bg-amber-950/60 border-amber-800/50'
                        }`}
                      >
                        {insight.impactLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{insight.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Footer Status Bar */}
      <div className="pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Explainable Financial Analysis Engine (Deterministic Rule-Based Controller)</span>
        </div>
        <div className="text-slate-500 font-mono text-[10px]">
          System Status: <span className="text-slate-300">LLM API Connector Ready</span>
        </div>
      </div>
    </div>
  );
};

export default AICFOCopilot;
