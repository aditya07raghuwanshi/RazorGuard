// ==========================================
// RazorGuard - Step 1: Data Layer (demoData.ts)
// ==========================================

export type TransactionCategory = 
  | 'Payment' 
  | 'Refund' 
  | 'Subscription' 
  | 'Operations' 
  | 'Marketing';

export type TransactionStatus = 'Completed' | 'Pending' | 'Refunded';

export type PaymentMethod = 'UPI' | 'NetBanking' | 'Card' | 'AutoPay';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  customer: string;
  category: TransactionCategory;
  amount: number;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
}

export interface MonthlyTrend {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface SummaryData {
  totalRevenue: number;
  totalExpenses: number;
  netCashFlow: number;
  totalTransactions: number;
  totalTransactionsCount: number;
  revenueChangePct: number;
  expensesChangePct: number;
  cashFlowChangePct: number;
  transactionsChangePct: number;
}

export interface FinancialAlert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'info';
  category: string;
  timestamp: string;
  impact: string;
}

// ------------------------------------------
// 1. Summary Metrics Data
// ------------------------------------------
export const demoSummaryData: SummaryData = {
  totalRevenue: 482500,
  totalExpenses: 194200,
  netCashFlow: 288300,
  totalTransactions: 342,
  totalTransactionsCount: 342,
  revenueChangePct: 12.4,
  expensesChangePct: 4.1,
  cashFlowChangePct: 18.7,
  transactionsChangePct: 8.2,
};

export const demoFinancialSummary = demoSummaryData;

// ------------------------------------------
// 2. Monthly Financial Trend Data
// ------------------------------------------
export const demoMonthlyTrends: MonthlyTrend[] = [
  { month: 'Mar', revenue: 390000, expenses: 165000, net: 225000 },
  { month: 'Apr', revenue: 420000, expenses: 175000, net: 245000 },
  { month: 'May', revenue: 410000, expenses: 180000, net: 230000 },
  { month: 'Jun', revenue: 450000, expenses: 185000, net: 265000 },
  { month: 'Jul', revenue: 465000, expenses: 190000, net: 275000 },
  { month: 'Aug', revenue: 482500, expenses: 194200, net: 288300 },
];

export const demoChartData = demoMonthlyTrends;

// ------------------------------------------
// 3. Demo Financial Alerts
// ------------------------------------------
export const demoAlerts: FinancialAlert[] = [
  {
    id: 'alt-101',
    title: 'Unusually high transaction',
    description: 'Inbound payout of ₹78,500 received from TechCorp Solutions, 3.3x higher than average transaction size.',
    severity: 'high',
    category: 'Payment Anomaly',
    timestamp: '2 hours ago',
    impact: '+₹78,500 Inflow'
  },
  {
    id: 'alt-102',
    title: 'Increased refund activity',
    description: '4 refunds totaling ₹14,200 were processed in the past 48 hours for annual plans.',
    severity: 'medium',
    category: 'Refund Surge',
    timestamp: 'Yesterday at 4:30 PM',
    impact: '-₹14,200 Outflow'
  },
  {
    id: 'alt-103',
    title: 'Expense category rising this month',
    description: 'Marketing expenditure reached ₹42,000 this month, up 22.5% compared to July.',
    severity: 'info',
    category: 'Budget Variance',
    timestamp: 'Aug 22, 2026',
    impact: '+22.5% Expense Growth'
  }
];

// ------------------------------------------
// 4. Realistic Demo Transactions List
// ------------------------------------------
export const demoTransactions: Transaction[] = [
  {
    id: 'tx_1001',
    date: '2026-08-23',
    description: 'Enterprise Retainer Fee - TechCorp',
    customer: 'TechCorp Solutions Pvt Ltd',
    category: 'Payment',
    amount: 78500,
    status: 'Completed',
    paymentMethod: 'UPI'
  },
  {
    id: 'tx_1002',
    date: '2026-08-23',
    description: 'Cloud Servers & Database Hosting',
    customer: 'Amazon Web Services India',
    category: 'Operations',
    amount: 18450,
    status: 'Completed',
    paymentMethod: 'Card'
  },
  {
    id: 'tx_1003',
    date: '2026-08-22',
    description: 'Customer Refund - Annual Pro Subscription',
    customer: 'Aarav Mehta',
    category: 'Refund',
    amount: 4500,
    status: 'Refunded',
    paymentMethod: 'UPI'
  },
  {
    id: 'tx_1004',
    date: '2026-08-22',
    description: 'Meta Ad Campaign Performance Spend',
    customer: 'Meta Ads India',
    category: 'Marketing',
    amount: 12500,
    status: 'Completed',
    paymentMethod: 'NetBanking'
  },
  {
    id: 'tx_1005',
    date: '2026-08-21',
    description: 'Monthly SaaS Premium License',
    customer: 'Priya Sharma',
    category: 'Subscription',
    amount: 2999,
    status: 'Completed',
    paymentMethod: 'AutoPay'
  },
  {
    id: 'tx_1006',
    date: '2026-08-21',
    description: 'Office Co-Working Space Lease',
    customer: 'WeWork India Management',
    category: 'Operations',
    amount: 35000,
    status: 'Completed',
    paymentMethod: 'NetBanking'
  },
  {
    id: 'tx_1007',
    date: '2026-08-20',
    description: 'Web Design Project Milestone Payment',
    customer: 'Nexus Global Logistics',
    category: 'Payment',
    amount: 45000,
    status: 'Completed',
    paymentMethod: 'UPI'
  },
  {
    id: 'tx_1008',
    date: '2026-08-20',
    description: 'Google Workspace & Business Mail',
    customer: 'Google Cloud India',
    category: 'Subscription',
    amount: 3800,
    status: 'Pending',
    paymentMethod: 'Card'
  },
  {
    id: 'tx_1009',
    date: '2026-08-19',
    description: 'Partial Refund - Service Fee Adjustment',
    customer: 'Vikram Singh',
    category: 'Refund',
    amount: 1200,
    status: 'Refunded',
    paymentMethod: 'UPI'
  },
  {
    id: 'tx_1010',
    date: '2026-08-18',
    description: 'Content Marketing & SEO Agency Retainer',
    customer: 'BrandBoost Digital Media',
    category: 'Marketing',
    amount: 25000,
    status: 'Completed',
    paymentMethod: 'NetBanking'
  },
  {
    id: 'tx_1011',
    date: '2026-08-17',
    description: 'Custom Mobile App Development Deposit',
    customer: 'Kavita Reddy',
    category: 'Payment',
    amount: 60000,
    status: 'Completed',
    paymentMethod: 'UPI'
  },
  {
    id: 'tx_1012',
    date: '2026-08-16',
    description: 'Automated Billing & Invoice Software',
    customer: 'Zoho Corporation',
    category: 'Subscription',
    amount: 1499,
    status: 'Completed',
    paymentMethod: 'AutoPay'
  }
];

// Helper Utility: INR Currency Formatter
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
