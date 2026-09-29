import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Users, 
  Truck, 
  Building2, 
  PackageCheck, 
  Warehouse, 
  Send, 
  ShoppingBag, 
  ArrowUpRight, 
  RefreshCw, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  MapPin 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard } from '../components/common/StatsCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  agriculturalFieldApi, 
  buyerApi, 
  cropBatchApi, 
  farmerApi, 
  regionalCoopApi, 
  shipmentApi, 
  storageFacilityApi, 
  supplierApi 
} from '../services/api';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    fields: 0,
    farmers: 0,
    suppliers: 0,
    coops: 0,
    batches: 0,
    storage: 0,
    shipments: 0,
    buyers: 0,
  });
  const [recentShipments, setRecentShipments] = useState([]);
  const [recentBatches, setRecentBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        fieldsRes,
        farmersRes,
        suppliersRes,
        coopsRes,
        batchesRes,
        storageRes,
        shipmentsRes,
        buyersRes,
      ] = await Promise.all([
        agriculturalFieldApi.getAll().catch(() => []),
        farmerApi.getAll().catch(() => []),
        supplierApi.getAll().catch(() => []),
        regionalCoopApi.getAll().catch(() => []),
        cropBatchApi.getAll().catch(() => []),
        storageFacilityApi.getAll().catch(() => []),
        shipmentApi.getAll().catch(() => []),
        buyerApi.getAll().catch(() => []),
      ]);

      setStats({
        fields: fieldsRes.length,
        farmers: farmersRes.length,
        suppliers: suppliersRes.length,
        coops: coopsRes.length,
        batches: batchesRes.length,
        storage: storageRes.length,
        shipments: shipmentsRes.length,
        buyers: buyersRes.length,
      });

      setRecentShipments(shipmentsRes.slice(-5).reverse());
      setRecentBatches(batchesRes.slice(-5).reverse());
    } catch (err) {
      setError('Failed to fetch dashboard data. Make sure Spring Boot backend is running on port 8083.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5" /> Live Agriculture Supply Chain Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Enterprise Logistics & Traceability
          </h2>
          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed">
            Monitor agricultural fields, crop batches, storage silos, and global buyer shipments in real-time with full Spring Boot backend integration.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Stats</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3 shadow-xs">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Agricultural Fields" value={stats.fields} icon={Sprout} color="emerald" change="+12%" />
        <StatsCard title="Registered Farmers" value={stats.farmers} icon={Users} color="earth" change="+4%" />
        <StatsCard title="Active Suppliers" value={stats.suppliers} icon={Truck} color="sky" change="+8%" />
        <StatsCard title="Regional Co-ops" value={stats.coops} icon={Building2} color="indigo" change="Stable" />
        <StatsCard title="Crop Batches" value={stats.batches} icon={PackageCheck} color="emerald" change="+18%" />
        <StatsCard title="Storage Facilities" value={stats.storage} icon={Warehouse} color="earth" change="Full 82%" />
        <StatsCard title="Logistics Shipments" value={stats.shipments} icon={Send} color="sky" change="+24%" />
        <StatsCard title="Global Buyers" value={stats.buyers} icon={ShoppingBag} color="indigo" change="+15%" />
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Shipments */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-600" /> Recent Shipments
            </h3>
            <Link to="/shipments" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4 flex-1">
            {recentShipments.length === 0 ? (
              <p className="text-slate-400 text-sm py-8 text-center">No shipments recorded yet.</p>
            ) : (
              recentShipments.map((ship) => (
                <div key={ship.shipmentId} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                      #{ship.shipmentId}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">Batch: {ship.cropBatch?.batchNo || ship.batchNo || 'N/A'}</h4>
                      <p className="text-xs text-slate-500">Qty: {ship.qty} Tons • {ship.date}</p>
                    </div>
                  </div>
                  <StatusBadge status={ship.status} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Crop Batches */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-amber-600" /> Recent Harvest Batches
            </h3>
            <Link to="/batches" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4 flex-1">
            {recentBatches.length === 0 ? (
              <p className="text-slate-400 text-sm py-8 text-center">No crop batches recorded yet.</p>
            ) : (
              recentBatches.map((batch) => (
                <div key={batch.batchNo} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                      🌾
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{batch.batchNo} - {batch.cropType}</h4>
                      <p className="text-xs text-slate-500">Harvested: {batch.harvestDate} • ${batch.pricePerTon}/Ton</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    Grade {batch.qualityGrade || 'A'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
