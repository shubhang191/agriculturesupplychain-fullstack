import React from 'react';
import { Menu, Bell, Search, Command } from 'lucide-react';

export const Header = ({ onToggleSidebar, onOpenSearch, title }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <p className="text-xs text-slate-500 font-medium">Agriculture Supply Chain Operations Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Global Search Bar (Opens Command Palette) */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2 pl-3 pr-2.5 py-2 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 rounded-xl text-sm text-slate-500 hover:text-slate-800 transition-all cursor-pointer group"
          title="Open Search Palette (Ctrl+K)"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          <span className="hidden sm:inline font-medium text-xs text-slate-500 group-hover:text-slate-700">Quick search records...</span>
          <div className="flex items-center gap-0.5 ml-2">
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-300 rounded shadow-2xs">
              Ctrl+K
            </kbd>
          </div>
        </button>

        <button className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Notifications">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            SC
          </div>
          <div className="hidden sm:block text-left">
            <h4 className="text-sm font-bold text-slate-800 leading-tight">Supply Admin</h4>
            <p className="text-xs text-slate-500 font-medium">Logistics Controller</p>
          </div>
        </div>
      </div>
    </header>
  );
};
