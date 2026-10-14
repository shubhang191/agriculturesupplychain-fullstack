import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Send, 
  Users, 
  Warehouse, 
  ShoppingBag, 
  BarChart3, 
  RefreshCw,
  Code2,
  Database
} from 'lucide-react';
import { reportsApi } from '../services/api';
import { StatusBadge } from '../components/common/StatusBadge';
import { useToast } from '../components/common/Toast';

const REPORTS = [
  {
    id: 'shipment-details',
    label: 'Shipment Details',
    subtitle: 'Shipment + Crop Batch + Buyer (Inner Joins)',
    icon: Send,
    fetchFn: reportsApi.getShipmentDetails,
    jpql: `SELECT new com.example.agriculturesupplychain.dto.ShipmentDetailsReportDTO(
    s.shipmentId, s.date, s.qty, s.status,
    cb.batchNo, cb.cropType, cb.qualityGrade, cb.pricePerTon,
    b.buyerId, b.buyerName, b.buyerType, b.location)
FROM Shipment s
JOIN s.cropBatch cb
JOIN s.buyer b
ORDER BY s.shipmentId`,
    oracleSql: `SELECT s.shipment_id, s.shipment_date, s.quantity_tons, s.shipment_status,
       cb.batch_no, cb.crop_type, cb.quality_grade, cb.price_per_ton,
       b.buyer_id, b.buyer_name, b.buyer_type, b.location
FROM shipment s
INNER JOIN crop_batch cb ON s.batch_no = cb.batch_no
INNER JOIN buyer b ON s.buyer_id = b.buyer_id
ORDER BY s.shipment_id;`,
    columns: [
      { key: 'shipmentId', label: 'Shipment #' },
      { key: 'date', label: 'Date' },
      { key: 'cropType', label: 'Crop (Batch)', render: (r) => (
        <div>
          <span className="font-semibold text-slate-800">{r.cropType}</span>
          <span className="text-xs text-slate-500 block">Batch {r.batchNo} • {r.qualityGrade}</span>
        </div>
      )},
      { key: 'qty', label: 'Qty (Tons)', render: (r) => `${r.qty} T` },
      { key: 'pricePerTon', label: 'Rate ($/T)', render: (r) => `$${r.pricePerTon}` },
      { key: 'buyerName', label: 'Buyer', render: (r) => (
        <div>
          <span className="font-medium text-slate-800">{r.buyerName}</span>
          <span className="text-xs text-slate-500 block">{r.buyerType} • {r.buyerLocation}</span>
        </div>
      )},
      { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    ]
  },
  {
    id: 'farmer-network',
    label: 'Farmer Network',
    subtitle: 'Farmer + Supplier + Regional Coop',
    icon: Users,
    fetchFn: reportsApi.getFarmerNetwork,
    jpql: `SELECT new com.example.agriculturesupplychain.dto.FarmerNetworkReportDTO(
    f.farmerId, f.farmerName, f.email, f.phone, f.farmLocation,
    sup.supplierId, sup.supplierName, sup.type, sup.location,
    rc.coopId, rc.coopName, rc.state)
FROM Farmer f
JOIN f.supplier sup
JOIN f.regionalCoop rc
ORDER BY f.farmerId`,
    oracleSql: `SELECT f.farmer_id, f.farmer_name, f.email, f.phone, f.farm_location,
       sup.supplier_id, sup.supplier_name, sup.supplier_type, sup.location,
       rc.coop_id, rc.coop_name, rc.state
FROM farmer f
INNER JOIN supplier sup ON f.supplier_id = sup.supplier_id
INNER JOIN regional_coop rc ON f.coop_id = rc.coop_id
ORDER BY f.farmer_id;`,
    columns: [
      { key: 'farmerId', label: 'Farmer ID' },
      { key: 'farmerName', label: 'Farmer Name', render: (r) => (
        <div>
          <span className="font-semibold text-slate-800">{r.farmerName}</span>
          <span className="text-xs text-slate-500 block">{r.email} • {r.phone}</span>
        </div>
      )},
      { key: 'farmLocation', label: 'Farm Location' },
      { key: 'supplierName', label: 'Assigned Supplier', render: (r) => (
        <div>
          <span className="font-medium text-slate-800">{r.supplierName}</span>
          <span className="text-xs text-slate-500 block">{r.supplierType} • {r.supplierLocation}</span>
        </div>
      )},
      { key: 'coopName', label: 'Regional Coop', render: (r) => (
        <div>
          <span className="font-medium text-emerald-700">{r.coopName}</span>
          <span className="text-xs text-slate-500 block">State: {r.state}</span>
        </div>
      )},
    ]
  },
  {
    id: 'batch-storage',
    label: 'Batch Storage',
    subtitle: 'Crop Batch + Storage Facility + Regional Coop',
    icon: Warehouse,
    fetchFn: reportsApi.getBatchStorage,
    jpql: `SELECT new com.example.agriculturesupplychain.dto.BatchStorageReportDTO(
    cb.batchNo, cb.cropType, cb.qualityGrade, cb.pricePerTon, cb.harvestDate,
    sf.storageId, sf.storageName, sf.location, sf.capacityTons,
    rc.coopId, rc.coopName, rc.state)
FROM CropBatch cb
JOIN cb.storageFacility sf
JOIN sf.regionalCoop rc
ORDER BY cb.batchNo`,
    oracleSql: `SELECT cb.batch_no, cb.crop_type, cb.quality_grade, cb.price_per_ton, cb.harvest_date,
       sf.storage_id, sf.storage_name, sf.location, sf.capacity_tons,
       rc.coop_id, rc.coop_name, rc.state
FROM crop_batch cb
INNER JOIN storage_facility sf ON cb.storage_id = sf.storage_id
INNER JOIN regional_coop rc ON sf.coop_id = rc.coop_id
ORDER BY cb.batch_no;`,
    columns: [
      { key: 'batchNo', label: 'Batch #' },
      { key: 'cropType', label: 'Crop & Grade', render: (r) => (
        <div>
          <span className="font-semibold text-slate-800">{r.cropType}</span>
          <span className="text-xs text-slate-500 block">{r.qualityGrade} • ${r.pricePerTon}/Ton</span>
        </div>
      )},
      { key: 'harvestDate', label: 'Harvest Date' },
      { key: 'storageName', label: 'Facility', render: (r) => (
        <div>
          <span className="font-medium text-slate-800">{r.storageName}</span>
          <span className="text-xs text-slate-500 block">{r.storageLocation} (Cap: {r.capacityTons} T)</span>
        </div>
      )},
      { key: 'coopName', label: 'Operating Coop', render: (r) => (
        <div>
          <span className="font-medium text-emerald-700">{r.coopName}</span>
          <span className="text-xs text-slate-500 block">{r.state}</span>
        </div>
      )},
    ]
  },
  {
    id: 'buyer-shipments',
    label: 'Buyer Shipments (LEFT JOIN)',
    subtitle: 'All Buyers with Shipments, Including Buyers With None',
    icon: ShoppingBag,
    fetchFn: reportsApi.getBuyerShipments,
    jpql: `SELECT new com.example.agriculturesupplychain.dto.BuyerShipmentsReportDTO(
    b.buyerId, b.buyerName, b.buyerType, b.location,
    s.shipmentId, s.date, s.qty, s.status)
FROM Buyer b
LEFT JOIN Shipment s ON s.buyer = b
ORDER BY b.buyerId, s.shipmentId`,
    oracleSql: `SELECT b.buyer_id, b.buyer_name, b.buyer_type, b.location,
       s.shipment_id, s.shipment_date, s.quantity_tons, s.shipment_status
FROM buyer b
LEFT OUTER JOIN shipment s ON b.buyer_id = s.buyer_id
ORDER BY b.buyer_id, s.shipment_id;`,
    columns: [
      { key: 'buyerId', label: 'Buyer ID' },
      { key: 'buyerName', label: 'Buyer Name', render: (r) => (
        <div>
          <span className="font-semibold text-slate-800">{r.buyerName}</span>
          <span className="text-xs text-slate-500 block">{r.buyerType} • {r.location}</span>
        </div>
      )},
      { key: 'shipmentId', label: 'Shipment #', render: (r) => r.shipmentId ? (
        <span className="font-mono font-bold text-slate-800">#{r.shipmentId}</span>
      ) : (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
          No Shipments (LEFT JOIN)
        </span>
      )},
      { key: 'shipmentDate', label: 'Shipment Date', render: (r) => r.shipmentDate || '—' },
      { key: 'quantityTons', label: 'Quantity', render: (r) => r.quantityTons != null ? `${r.quantityTons} Tons` : '—' },
      { key: 'shipmentStatus', label: 'Status', render: (r) => r.shipmentStatus ? <StatusBadge status={r.shipmentStatus} /> : '—' },
    ]
  },
  {
    id: 'buyer-tonnage',
    label: 'Buyer Tonnage (GROUP BY)',
    subtitle: 'Total Tons Shipped Per Buyer (Aggregate Summary)',
    icon: BarChart3,
    fetchFn: reportsApi.getBuyerTonnage,
    jpql: `SELECT new com.example.agriculturesupplychain.dto.BuyerTonnageReportDTO(
    b.buyerId, b.buyerName, b.buyerType, b.location,
    COALESCE(SUM(s.qty), 0), COUNT(s.shipmentId))
FROM Buyer b
LEFT JOIN Shipment s ON s.buyer = b
GROUP BY b.buyerId, b.buyerName, b.buyerType, b.location
ORDER BY COALESCE(SUM(s.qty), 0) DESC`,
    oracleSql: `SELECT b.buyer_id, b.buyer_name, b.buyer_type, b.location,
       NVL(SUM(s.quantity_tons), 0) AS total_tons,
       COUNT(s.shipment_id) AS shipment_count
FROM buyer b
LEFT OUTER JOIN shipment s ON b.buyer_id = s.buyer_id
GROUP BY b.buyer_id, b.buyer_name, b.buyer_type, b.location
ORDER BY total_tons DESC;`,
    columns: [
      { key: 'buyerId', label: 'Buyer ID' },
      { key: 'buyerName', label: 'Buyer Name' },
      { key: 'buyerType', label: 'Type' },
      { key: 'location', label: 'Location' },
      { key: 'shipmentCount', label: 'Total Shipments', render: (r) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
          {r.shipmentCount} {r.shipmentCount === 1 ? 'shipment' : 'shipments'}
        </span>
      )},
      { key: 'totalTons', label: 'Total Tonnage', render: (r) => (
        <span className="font-bold text-emerald-700 text-sm">
          {r.totalTons} Tons
        </span>
      )},
    ]
  }
];

export const ReportsView = () => {
  const [activeTab, setActiveTab] = useState(REPORTS[0].id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSql, setShowSql] = useState(true);
  const [copiedType, setCopiedType] = useState(null);
  const { addToast } = useToast();

  const currentReport = REPORTS.find((r) => r.id === activeTab) || REPORTS[0];

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await currentReport.fetchFn();
      setData(res);
    } catch (err) {
      addToast(err.message || 'Failed to load report data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [activeTab]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    addToast(`${type} query copied to clipboard!`, 'info');
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-800">Relational Join & Analytical Reports</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            DBMS Lab Join queries, Left Outer Joins, and Group-By aggregations across Supply Chain entities.
          </p>
        </div>
        <button
          onClick={fetchReport}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 scrollbar-none">
        {REPORTS.map((report) => {
          const Icon = report.icon;
          const isActive = report.id === activeTab;
          return (
            <button
              key={report.id}
              onClick={() => setActiveTab(report.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-150
                ${isActive 
                  ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/80' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'}
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{report.label}</span>
            </button>
          );
        })}
      </div>

      {/* Report Info Banner */}
      <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl px-5 py-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-emerald-950">{currentReport.label}</h3>
          <p className="text-xs text-emerald-700">{currentReport.subtitle}</p>
        </div>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          {data.length} {data.length === 1 ? 'record' : 'records'}
        </span>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {currentReport.columns.map((col) => (
                  <th key={col.key} className="py-3.5 px-4 font-bold">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={currentReport.columns.length} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
                      <span className="text-xs font-medium">Executing SQL Join Query...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={currentReport.columns.length} className="py-12 text-center text-slate-400">
                    No records found for this query.
                  </td>
                </tr>
              ) : (
                data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    {currentReport.columns.map((col) => (
                      <td key={col.key} className="py-3.5 px-4 text-slate-700">
                        {col.render ? col.render(row) : (row[col.key] != null ? row[col.key] : '—')}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collapsible "Show SQL" Box */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 text-slate-200 shadow-md overflow-hidden">
        <button
          onClick={() => setShowSql(!showSql)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Code2 className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                SQL & JPQL Query Viewer
                <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                  DBMS Lab
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                Inspect the Spring Data JPQL and corresponding Oracle SQL executed for this report
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>{showSql ? 'Hide SQL' : 'Show SQL'}</span>
            {showSql ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showSql && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4">
            {/* JPQL Query */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  JPQL Query (Java Entity Relationships)
                </span>
                <button
                  onClick={() => copyToClipboard(currentReport.jpql, 'JPQL')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-800 transition-colors"
                >
                  {copiedType === 'JPQL' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'JPQL' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {currentReport.jpql}
              </pre>
            </div>

            {/* Oracle SQL Query */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60">
                <span className="text-xs font-mono font-bold text-sky-400 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  Native Oracle SQL Query (Database Schema)
                </span>
                <button
                  onClick={() => copyToClipboard(currentReport.oracleSql, 'Oracle SQL')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-md bg-slate-800/60 hover:bg-slate-800 transition-colors"
                >
                  {copiedType === 'Oracle SQL' ? <Check className="w-3.5 h-3.5 text-sky-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'Oracle SQL' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {currentReport.oracleSql}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsView;
