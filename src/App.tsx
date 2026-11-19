import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewView } from './components/views/OverviewView';
import { TransactionsView } from './components/views/TransactionsView';
import { InsightsView } from './components/views/InsightsView';
import { AlertsView } from './components/views/AlertsView';
import { SettingsView } from './components/views/SettingsView';
import type { ActiveTab, FinancialAlert } from './types';
import { 
  demoFinancialSummary, 
  demoChartData, 
  demoAlerts, 
  demoTransactions 
} from './data/demoData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState<FinancialAlert[]>(demoAlerts);

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewView
            summary={demoFinancialSummary}
            chartData={demoChartData}
            alerts={alerts}
            transactions={demoTransactions}
            onDismissAlert={handleDismissAlert}
            setActiveTab={setActiveTab}
          />
        );
      case 'transactions':
        return <TransactionsView transactions={demoTransactions} />;
      case 'insights':
        return (
          <InsightsView
            summary={demoFinancialSummary}
            transactions={demoTransactions}
          />
        );
      case 'alerts':
        return <AlertsView alerts={alerts} onDismissAlert={handleDismissAlert} />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <OverviewView
            summary={demoFinancialSummary}
            chartData={demoChartData}
            alerts={alerts}
            transactions={demoTransactions}
            onDismissAlert={handleDismissAlert}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        unreadAlertsCount={alerts.length}
        onAlertsClick={() => setActiveTab('alerts')}
      />

      <div className="flex-1 flex w-full">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
          alertsCount={alerts.length}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default App;
