import React from 'react';
import { 
  LayoutDashboard, 
  Receipt, 
  Sparkles, 
  AlertTriangle, 
  Settings, 
  ChevronRight,
  CreditCard
} from 'lucide-react';
import type { ActiveTab } from '../../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  alertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  alertsCount
}) => {
  const navItems = [
    { id: 'overview' as ActiveTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions' as ActiveTab, label: 'Transactions', icon: Receipt },
    { id: 'insights' as ActiveTab, label: 'Insights', icon: Sparkles },
    { 
      id: 'alerts' as ActiveTab, 
      label: 'Alerts', 
      icon: AlertTriangle, 
      badge: alertsCount > 0 ? alertsCount : undefined 
    },
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="p-4 flex-1">
        <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Main Menu
        </p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                
                {item.badge ? (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    isActive ? 'bg-amber-500 text-slate-950' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                ) : (
                  isActive && <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="rounded-lg p-3 bg-white border border-slate-200 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-800 mb-1">
            <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
            <span>Business Account</span>
          </div>
          <p className="text-slate-500 text-[11px]">Razorpay Demo MID: <code className="text-slate-700 font-mono">MID_89431X</code></p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:block w-60 shrink-0 min-h-[calc(100vh-57px)]">
        {navContent}
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-full bg-white shadow-xl z-50">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
