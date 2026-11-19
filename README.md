# RazorGuard — AI Finance Controller

RazorGuard is a modern financial dashboard built to help small business owners monitor revenue, expenses, cash flow, transaction volume, and heuristic financial anomalies using Razorpay-style payment data.

---

## 1. Project Overview

Small business owners often process hundreds of transactions monthly across payments, refunds, subscriptions, and vendor payouts. RazorGuard simplifies financial monitoring by converting raw transaction logs into clear metric summaries, trend visualizations, automated risk alerts, and intelligent CFO recommendations.

The application features an explainable financial analysis engine—the **AI CFO Copilot**—that evaluates financial health, projects next-month cash flows, and offers data-driven cost optimization recommendations.

---

## 2. Key Features

- **AI CFO Copilot Centerpiece**: Integrated intelligence panel displaying Financial Health Score (0–100), Executive Financial Summaries, Data-Driven Recommendations, Next-Month Cash Flow Forecasts, and Alert Insights ("Why This Matters").
- **Financial Summary Cards**: Real-time display of Total Revenue, Total Expenses, Net Cash Flow, and Transaction Volume with month-over-month percentage change badges.
- **Revenue vs Expenses Trend Chart**: Visual area chart comparing monthly income and expenditure trends (Mar–Aug 2026).
- **Rule-Based Anomaly Detection**: "Needs Attention" alert engine that flags unusual financial behavior.
- **Recent Transactions Directory**: Comprehensive payment ledger with status indicators and payment method tags.
- **Instant Client-Side Search & Category Filter**: Fully case-insensitive search across Transaction ID, Description, and Customer Name, combined with category filter pills (*Payment, Refund, Subscription, Operations, Marketing*).
- **Responsive Layout & State Routing**: Desktop fixed sidebar, mobile slide-over drawer, and clean React state-based tab routing (*Overview, Transactions, Insights, Alerts, Settings*).

---

## 3. Financial Intelligence & Anomaly Detection Engine

RazorGuard uses a deterministic, explainable financial analysis engine to compute controller metrics and detect risk anomalies:

### Financial Health Score (0–100)
Calculated dynamically from 4 core metrics:
1. **Net Profit Margin Score** (Max 30 pts): Evaluates operating margin ratio.
2. **Revenue vs Expense Growth Score** (Max 25 pts): Rewards revenue growth exceeding expense growth.
3. **Refund Risk Score** (Max 20 pts): Evaluates refund rate against industry thresholds (<5%).
4. **Anomaly Risk Score** (Max 25 pts): Deducts risk penalties based on active high/medium alerts.

### Heuristic Risk Rules
1. **High Transaction Detection**:
   Calculates average transaction size across the dataset and flags inbound payments exceeding 2.5x the average (e.g., detecting a ₹78,500 enterprise payment against a ~₹24,037 average).
2. **Refund Surge**:
   Monitors refund transactions and triggers a warning when 4 or more refunds occur within a 48-hour window.
3. **Marketing Spend Warning**:
   Calculates total marketing expenditure for the current period and triggers an alert when spending increases by more than 20% over the baseline average.

### Cash Flow Forecasting
Computes next-month revenue, expense, and net cash flow projections using a 6-month weighted moving average trend model.

*Note: The engine uses deterministic, explainable financial logic and does not expose API keys or claim unverified LLM models. The interface is structured so a real LLM/API can be connected seamlessly.*

---

## 4. Tech Stack

- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts 3
- **Icons**: Lucide React

---

## 5. Project Structure

```
razorguard/
├── src/
│   ├── data/
│   │   └── demoData.ts           # Isolated demo transactions, trends & metrics
│   ├── utils/
│   │   └── aiControllerEngine.ts # Financial health score, forecast & recommendations engine
│   ├── components/
│   │   ├── AICFOCopilot.tsx      # AI CFO Copilot centerpiece card
│   │   ├── SummaryCards.tsx      # 4 financial summary metric cards
│   │   ├── FinancialChart.tsx    # Recharts monthly revenue vs expenses chart
│   │   ├── NeedsAttentionAlerts.tsx # Rule-based anomaly alert engine
│   │   ├── RecentTransactions.tsx  # Filterable & searchable transaction ledger
│   │   └── layout/
│   │       ├── Header.tsx        # Top header with Demo Mode indicator & mobile toggle
│   │       └── Sidebar.tsx       # Desktop & mobile drawer navigation
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces for data models
│   ├── App.tsx                   # Main layout container & tab routing state
│   └── main.tsx                  # Application entry point
├── index.html
├── package.json
└── tsconfig.json
```

---

## 6. Data Layer Architecture

All payment transactions, trend series, and financial summaries are isolated in `src/data/demoData.ts`. Financial intelligence calculations are decoupled in `src/utils/aiControllerEngine.ts`. This architecture keeps UI components clean and makes it simple to replace the local mock dataset with live Razorpay REST APIs or a backend database without modifying UI presentation.

---

## 7. Running Locally

Ensure Node.js (v20+) is installed, then run:

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

---

## 8. Production Build

To verify TypeScript type safety and compile production bundle assets:

```bash
npm run build
```

*(Executes `tsc -b && vite build`)*

---

## 9. Demo Data

This project currently uses local sample data formatted in Indian Rupees (₹). It is not connected to live Razorpay production accounts or real banking credentials.

---

## 10. Responsive Support

- **Desktop (1024px+)**: Full fixed sidebar with 4-column metric cards and expanded data tables.
- **Tablet (768px - 1023px)**: 2-column grid cards and compact spacing.
- **Mobile (< 768px)**: Collapsible slide-over drawer navigation, 1-column card stack, and horizontal scrollable table wrapper to prevent page-wide layout overflow.

---

## 11. Future Improvements

- Live Razorpay Webhook & REST API integration
- LLM API integration (OpenAI / Gemini) for natural language Q&A
- Database integration (PostgreSQL / MongoDB) for transaction history
- Authentication and role-based merchant management

---

## 12. Project Status

- **Status**: Feature-complete & verified with AI CFO Copilot intelligence layer
- **Build Verification**: `tsc -b && vite build` passing (0 errors)
- **Responsive Layout**: Verified across desktop, tablet, and mobile viewports
