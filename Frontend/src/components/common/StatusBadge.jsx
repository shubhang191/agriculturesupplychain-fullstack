import React from 'react';

export const StatusBadge = ({ status }) => {
  if (!status) return <span className="text-slate-400 italic text-xs">N/A</span>;

  const normalized = status.toString().toLowerCase().trim();

  let badgeStyles = 'bg-slate-100 text-slate-700 border-slate-200';

  if (['delivered', 'active', 'completed', 'verified', 'certified'].includes(normalized)) {
    badgeStyles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (['in transit', 'pending', 'processing', 'in_progress', 'transit'].includes(normalized)) {
    badgeStyles = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (['cancelled', 'rejected', 'failed', 'inactive', 'delayed'].includes(normalized)) {
    badgeStyles = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (['organic', 'grade a', 'premium'].includes(normalized)) {
    badgeStyles = 'bg-sky-50 text-sky-700 border-sky-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeStyles}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75"></span>
      {status}
    </span>
  );
};
