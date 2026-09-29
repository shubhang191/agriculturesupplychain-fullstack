import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useToast } from '../components/common/Toast';
import { buyerApi } from '../services/api';

export const BuyersView = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [formData, setFormData] = useState({ buyerId: '', buyerName: '', buyerType: '', phone: '', location: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await buyerApi.getAll();
      setBuyers(data);
    } catch (err) {
      addToast(err.message || 'Failed to fetch buyers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenCreate = () => {
    setSelectedBuyer(null);
    setFormData({ buyerId: '', buyerName: '', buyerType: '', phone: '', location: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setSelectedBuyer(b);
    setFormData({ buyerId: b.buyerId, buyerName: b.buyerName || '', buyerType: b.buyerType || '', phone: b.phone || '', location: b.location || '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        buyerId: parseInt(formData.buyerId),
        buyerName: formData.buyerName,
        buyerType: formData.buyerType,
        phone: formData.phone,
        location: formData.location,
      };

      if (selectedBuyer) {
        await buyerApi.update(selectedBuyer.buyerId, payload);
        addToast('Buyer updated successfully');
      } else {
        await buyerApi.create(payload);
        addToast('Buyer created successfully');
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
    if (!selectedBuyer) return;
    setSubmitting(true);
    try {
      await buyerApi.delete(selectedBuyer.buyerId);
      addToast('Buyer deleted successfully');
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'buyerId', label: 'ID' },
    { key: 'buyerName', label: 'Buyer Name' },
    { key: 'buyerType', label: 'Type' },
    { key: 'phone', label: 'Phone' },
    { key: 'location', label: 'Location' },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Buyers"
        data={buyers}
        columns={columns}
        searchKey="buyerName"
        searchPlaceholder="Search buyer name..."
        loading={loading}
        onAdd={handleOpenCreate}
        onView={(b) => { setSelectedBuyer(b); setIsViewModalOpen(true); }}
        onEdit={handleOpenEdit}
        onDelete={(b) => { setSelectedBuyer(b); setIsDeleteModalOpen(true); }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedBuyer ? 'Edit Buyer' : 'New Buyer'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Buyer ID</label>
            <input type="number" required disabled={selectedBuyer !== null} value={formData.buyerId} onChange={(e) => setFormData({ ...formData, buyerId: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:opacity-60" placeholder="e.g. 100" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Buyer Name</label>
            <input type="text" required value={formData.buyerName} onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. Global Foods Corp" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Buyer Type</label>
              <input type="text" value={formData.buyerType} onChange={(e) => setFormData({ ...formData, buyerType: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. Wholesaler" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Phone</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="Phone" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Location</label>
            <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="Location" />
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Save Buyer</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Buyer Details">
        {selectedBuyer && (
          <div className="space-y-3 text-sm p-4 bg-slate-50 rounded-xl">
            <p><strong>ID:</strong> {selectedBuyer.buyerId}</p>
            <p><strong>Name:</strong> {selectedBuyer.buyerName}</p>
            <p><strong>Type:</strong> {selectedBuyer.buyerType}</p>
            <p><strong>Phone:</strong> {selectedBuyer.phone}</p>
            <p><strong>Location:</strong> {selectedBuyer.location}</p>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} title="Delete Buyer" message={`Delete buyer #${selectedBuyer?.buyerId}?`} loading={submitting} />
    </div>
  );
};
