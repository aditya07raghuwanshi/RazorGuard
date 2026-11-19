import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { demoMonthlyTrends, formatCurrency } from '../data/demoData';
import type { MonthlyTrend } from '../data/demoData';

interface FinancialChartProps {
  data?: MonthlyTrend[];
}

export const FinancialChart: React.FC<FinancialChartProps> = ({
  data = demoMonthlyTrends
}) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-2xs w-full">
      {/* Chart Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Financial Overview</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 rounded-md">
              6M Trend
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Monthly revenue vs expenses comparison (Mar – Aug 2026)</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2 bg-indigo-50/70 border border-indigo-100 px-2.5 py-1 rounded-md">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="text-indigo-950 font-bold">Revenue</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100/70 border border-slate-200 px-2.5 py-1 rounded-md">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
            <span className="text-slate-800 font-bold">Expenses</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: unknown) => [formatCurrency(Number(value)), '']}
              labelFormatter={(label: unknown) => `Month: ${label}`}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#cbd5e1',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.08)',
                fontSize: '12px',
                fontWeight: 600,
                padding: '8px 12px'
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#64748b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialChart;
