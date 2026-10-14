import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  ArrowRight, 
  Building2, 
  Truck, 
  Users, 
  Sprout, 
  Warehouse, 
  PackageCheck, 
  ShoppingBag, 
  Send,
  Loader2,
  CornerDownLeft
} from 'lucide-react';
import { searchApi } from '../../services/api';

const TYPE_CONFIG = {
  COOP: {
    label: 'Regional Coop',
    route: '/coops',
    icon: Building2,
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  SUPPLIER: {
    label: 'Supplier',
    route: '/suppliers',
    icon: Truck,
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  FARMER: {
    label: 'Farmer',
    route: '/farmers',
    icon: Users,
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  FIELD: {
    label: 'Agricultural Field',
    route: '/fields',
    icon: Sprout,
    badgeBg: 'bg-lime-100 text-lime-800 border-lime-200',
  },
  STORAGE: {
    label: 'Storage Facility',
    route: '/storage',
    icon: Warehouse,
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  BATCH: {
    label: 'Crop Batch',
    route: '/batches',
    icon: PackageCheck,
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
  },
  BUYER: {
    label: 'Buyer',
    route: '/buyers',
    icon: ShoppingBag,
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  SHIPMENT: {
    label: 'Shipment',
    route: '/shipments',
    icon: Send,
    badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  },
};

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Focus input on open, clear state
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K and Escape listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via parent or event
          window.dispatchEvent(new CustomEvent('toggle-command-palette'));
        }
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search with 250ms and AbortController
  useEffect(() => {
    if (!isOpen) return;

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setSelectedIndex(0);
      return;
    }

    setLoading(true);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const data = await searchApi.search(trimmed, { signal: controller.signal });
        setResults(data);
        setSelectedIndex(0);
      } catch (err) {
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          console.error('Search error:', err);
        }
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(debounceTimerRef.current);
    };
  }, [query, isOpen]);

  // Arrow key navigation and Enter selection
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  const handleSelect = (item) => {
    const config = TYPE_CONFIG[item.type] || { route: '/' };
    navigate(config.route);
    onClose();
  };

  if (!isOpen) return null;

  // Group results by type while preserving ranked order
  const groupedResults = results.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  // Flat list index lookup for item
  let flatIndexCounter = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] z-10 animate-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search records or filter by type (e.g. type:farmer Iowa, type:coop)..."
            className="flex-1 bg-transparent text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none"
          />
          {loading && (
            <Loader2 className="w-4 h-4 text-emerald-600 animate-spin mr-2 shrink-0" />
          )}
          {query && (
            <button
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-200/60 border border-slate-300/80 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Quick Filter Token Suggestions */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-100/70 border-b border-slate-200/70 overflow-x-auto text-[11px] scrollbar-none">
          <span className="text-slate-400 font-medium shrink-0 mr-1">Quick Filters:</span>
          {['type:farmer', 'type:coop', 'type:buyer', 'type:batch', 'type:shipment', 'type:supplier', 'type:field', 'type:storage'].map((token) => (
            <button
              key={token}
              type="button"
              onClick={() => {
                setQuery(token + ' ');
                inputRef.current?.focus();
              }}
              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 font-mono text-[10px] whitespace-nowrap transition-colors"
            >
              {token}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {!query.trim() && (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-600">Global Supply Chain Search</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Type entity names, crops, locations, or grades. Use <code className="font-mono text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">type:farmer</code> to target specific domains.
              </p>
            </div>
          )}

          {query.trim() && !loading && results.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                ∅
              </div>
              <p className="text-sm font-semibold text-slate-700">No results found</p>
              <p className="text-xs text-slate-400 mt-1">
                No matching records for "{query}". Try checking the spelling or removing type filters.
              </p>
            </div>
          )}

          {Object.entries(groupedResults).map(([typeKey, items]) => {
            const config = TYPE_CONFIG[typeKey] || { label: typeKey, badgeBg: 'bg-slate-100 text-slate-700' };
            const Icon = config.icon || Search;

            return (
              <div key={typeKey} className="space-y-1">
                {/* Group Header Badge */}
                <div className="px-3 pt-2 pb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {config.label}
                    </span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${config.badgeBg}`}>
                    {items.length} {items.length === 1 ? 'match' : 'matches'}
                  </span>
                </div>

                {/* Items in Group */}
                {items.map((item) => {
                  const currentFlatIndex = flatIndexCounter++;
                  const isSelected = currentFlatIndex === selectedIndex;

                  return (
                    <div
                      key={`${item.type}-${item.id}`}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(currentFlatIndex)}
                      className={`
                        group flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-100
                        ${isSelected 
                          ? 'bg-emerald-600 text-white shadow-xs' 
                          : 'hover:bg-slate-100 text-slate-800'}
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                          ${isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-white'}
                        `}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className={`text-xs truncate ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pl-3 shrink-0">
                        <span className={`
                          text-[10px] font-semibold px-2 py-0.5 rounded-md
                          ${isSelected 
                            ? 'bg-emerald-500 text-white' 
                            : config.badgeBg}
                        `}>
                          {item.id}
                        </span>
                        <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-0.5 text-white' : 'text-slate-300'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">↵</kbd>
              Open Page
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">esc</kbd>
              Close
            </span>
          </div>
          <span className="font-medium text-emerald-700">
            AgriChain Search
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
