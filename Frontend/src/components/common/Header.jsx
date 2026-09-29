import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

export const Header = ({ onToggleSidebar, title }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
          <p className="text-xs text-slate-500 font-medium">Agriculture Supply Chain Operations Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder="Quick search records..."
            className="w-64 pl-9 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none transition-all"
            readOnly
            onClick={() => alert('Use domain-specific search filters in tables')}
          />
        </div>

        <button className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
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
