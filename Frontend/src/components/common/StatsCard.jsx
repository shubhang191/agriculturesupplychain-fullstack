import React from 'react';

export const StatsCard = ({ title, value, icon: Icon, change, changeType = 'positive', color = 'emerald' }) => {
  const colorStyles = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    earth: 'bg-amber-50 text-amber-600 border-amber-100',
    sky: 'bg-sky-50 text-sky-600 border-sky-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  }[color] || 'bg-emerald-50 text-emerald-600 border-emerald-100';

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">{value}</h3>
        {change && (
          <p className={`text-xs font-semibold flex items-center gap-1 ${changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600'}`}>
            <span>{change}</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </p>
        )}
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${colorStyles}`}>
        <Icon className="w-7 h-7" />
      </div>
    </div>
  );
};
