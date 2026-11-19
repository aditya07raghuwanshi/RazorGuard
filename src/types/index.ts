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

export interface FinancialAlert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'info';
  category: string;
  timestamp: string;
  impact: string;
}

export interface MonthlyFinancialPoint {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface FinancialSummary {
  totalRevenue: number;
  revenueChangePct: number;
  totalExpenses: number;
  expensesChangePct: number;
  netCashFlow: number;
  cashFlowChangePct: number;
  totalTransactions: number;
  totalTransactionsCount: number;
  transactionsChangePct: number;
}

export type ActiveTab = 'overview' | 'transactions' | 'insights' | 'alerts' | 'settings';
