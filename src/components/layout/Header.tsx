import React from 'react';
import { ShieldCheck, Menu, X, Bell } from 'lucide-react';

interface HeaderProps {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  unreadAlertsCount: number;
  onAlertsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mobileSidebarOpen,
  setMobileSidebarOpen,
  unreadAlertsCount,
  onAlertsClick
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
      {/* Brand Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900 text-white p-2 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                RazorGuard
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 rounded">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">AI Finance Controller</p>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Demo Mode Badge */}
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100/80 border border-slate-200 rounded-full text-xs font-medium text-slate-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden xs:inline">Environment:</span>
          <span className="font-semibold text-slate-900">Demo Data</span>
        </div>

        {/* Notifications Icon Shortcut */}
        <button
          onClick={onAlertsClick}
          className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
          title="View Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          )}
        </button>
      </div>
    </header>
  );
};
