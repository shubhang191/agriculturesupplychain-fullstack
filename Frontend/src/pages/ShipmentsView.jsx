import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { StatusBadge } from '../components/common/StatusBadge';
import { useToast } from '../components/common/Toast';
import { shipmentApi, cropBatchApi, buyerApi } from '../services/api';

export const ShipmentsView = () => {
  const [shipments, setShipments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [formData, setFormData] = useState({
    shipmentId: '',
    date: new Date().toISOString().split('T')[0],
    qty: '',
    status: 'Pending',
    batchNo: '',
    buyerId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sData, bData, buyData] = await Promise.all([
        shipmentApi.getAll(),
        cropBatchApi.getAll(),
        buyerApi.getAll(),
      ]);
      setShipments(sData);
      setBatches(bData);
      setBuyers(buyData);
    } catch (err) {
      addToast(err.message || 'Failed to fetch shipments', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenCreate = () => {
    setSelectedShipment(null);
    setFormData({
      shipmentId: '',
      date: new Date().toISOString().split('T')[0],
      qty: '',
      status: 'Pending',
      batchNo: batches[0]?.batchNo || '',
      buyerId: buyers[0]?.buyerId || '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ship) => {
    setSelectedShipment(ship);
    setFormData({
      shipmentId: ship.shipmentId,
      date: ship.date || '',
      qty: ship.qty || '',
      status: ship.status || 'Pending',
      batchNo: ship.cropBatch?.batchNo || ship.batchNo || '',
      buyerId: ship.buyer?.buyerId || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        shipmentId: parseInt(formData.shipmentId),
        date: formData.date,
        qty: parseFloat(formData.qty),
        status: formData.status,
        batchNo: formData.batchNo,
        buyerId: formData.buyerId ? parseInt(formData.buyerId) : null,
      };

      if (selectedShipment) {
        await shipmentApi.update(selectedShipment.shipmentId, payload);
        addToast('Shipment updated successfully');
      } else {
        await shipmentApi.create(payload);
        addToast('Shipment created successfully');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedShipment) return;
    setSubmitting(true);
    try {
      await shipmentApi.delete(selectedShipment.shipmentId);
      addToast('Shipment deleted successfully');
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'shipmentId', label: 'ID' },
    { key: 'date', label: 'Date' },
    { key: 'qty', label: 'Qty (Tons)' },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'cropBatch', label: 'Crop Batch', render: (row) => row.cropBatch?.batchNo || 'N/A' },
    { key: 'buyer', label: 'Buyer', render: (row) => row.buyer?.buyerName || 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Shipments"
        data={shipments}
        columns={columns}
        searchKey="status"
        searchPlaceholder="Search shipment status..."
        loading={loading}
        onAdd={handleOpenCreate}
        onView={(s) => { setSelectedShipment(s); setIsViewModalOpen(true); }}
        onEdit={handleOpenEdit}
        onDelete={(s) => { setSelectedShipment(s); setIsDeleteModalOpen(true); }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedShipment ? 'Edit Shipment' : 'New Shipment'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Shipment ID</label>
            <input type="number" required disabled={selectedShipment !== null} value={formData.shipmentId} onChange={(e) => setFormData({ ...formData, shipmentId: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:opacity-60" placeholder="e.g. 500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Shipment Date</label>
              <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Quantity (Tons)</label>
              <input type="number" step="0.01" required value={formData.qty} onChange={(e) => setFormData({ ...formData, qty: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. 50" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option value="Pending">Pending</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Crop Batch</label>
              <select value={formData.batchNo} onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option value="">-- Select Batch --</option>
                {batches.map((b) => (
                  <option key={b.batchNo} value={b.batchNo}>{b.batchNo} ({b.cropType})</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Buyer</label>
            <select value={formData.buyerId} onChange={(e) => setFormData({ ...formData, buyerId: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
              <option value="">-- Select Buyer --</option>
              {buyers.map((bu) => (
                <option key={bu.buyerId} value={bu.buyerId}>{bu.buyerName}</option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Save Shipment</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Shipment Details">
        {selectedShipment && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
              <div><span className="text-slate-400 text-xs block uppercase">ID</span><strong>{selectedShipment.shipmentId}</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Date</span><strong>{selectedShipment.date}</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Quantity</span><strong>{selectedShipment.qty} Tons</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Status</span><StatusBadge status={selectedShipment.status} /></div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-xs font-bold text-emerald-900 uppercase">Logistics Routing</p>
              <p className="text-emerald-800 font-medium mt-1">Batch: {selectedShipment.cropBatch?.batchNo || 'N/A'}</p>
              <p className="text-emerald-800 font-medium">Buyer: {selectedShipment.buyer?.buyerName || 'N/A'} ({selectedShipment.buyer?.location})</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} title="Delete Shipment" message={`Delete shipment #${selectedShipment?.shipmentId}?`} loading={submitting} />
    </div>
  );
};
