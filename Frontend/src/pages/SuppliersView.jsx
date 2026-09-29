import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useToast } from '../components/common/Toast';
import { supplierApi } from '../services/api';

export const SuppliersView = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({ supplierId: '', supplierName: '', type: '', phone: '', location: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await supplierApi.getAll();
      setSuppliers(data);
    } catch (err) {
      addToast(err.message || 'Failed to fetch suppliers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenCreate = () => {
    setSelectedSupplier(null);
    setFormData({ supplierId: '', supplierName: '', type: '', phone: '', location: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sup) => {
    setSelectedSupplier(sup);
    setFormData({ supplierId: sup.supplierId, supplierName: sup.supplierName || '', type: sup.type || '', phone: sup.phone || '', location: sup.location || '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        supplierId: parseInt(formData.supplierId),
        supplierName: formData.supplierName,
        type: formData.type,
        phone: formData.phone,
        location: formData.location,
      };
      if (selectedSupplier) {
        await supplierApi.update(selectedSupplier.supplierId, payload);
        addToast('Supplier updated successfully');
      } else {
        await supplierApi.create(payload);
        addToast('Supplier created successfully');
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
    if (!selectedSupplier) return;
    setSubmitting(true);
    try {
      await supplierApi.delete(selectedSupplier.supplierId);
      addToast('Supplier deleted successfully');
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'supplierId', label: 'ID' },
    { key: 'supplierName', label: 'Supplier Name' },
    { key: 'type', label: 'Type' },
    { key: 'phone', label: 'Phone' },
    { key: 'location', label: 'Location' },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Suppliers"
        data={suppliers}
        columns={columns}
        searchKey="supplierName"
        searchPlaceholder="Search supplier name..."
        loading={loading}
        onAdd={handleOpenCreate}
        onView={(sup) => { setSelectedSupplier(sup); setIsViewModalOpen(true); }}
        onEdit={handleOpenEdit}
        onDelete={(sup) => { setSelectedSupplier(sup); setIsDeleteModalOpen(true); }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedSupplier ? 'Edit Supplier' : 'New Supplier'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Supplier ID</label>
            <input type="number" required disabled={selectedSupplier !== null} value={formData.supplierId} onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:opacity-60" placeholder="e.g. 50" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Supplier Name</label>
            <input type="text" required value={formData.supplierName} onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. AgroCorp Seeds" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Type</label>
              <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. Seeds & Fertilizer" />
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
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Save Supplier</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Supplier Details">
        {selectedSupplier && (
          <div className="space-y-3 text-sm p-4 bg-slate-50 rounded-xl">
            <p><strong>ID:</strong> {selectedSupplier.supplierId}</p>
            <p><strong>Name:</strong> {selectedSupplier.supplierName}</p>
            <p><strong>Type:</strong> {selectedSupplier.type}</p>
            <p><strong>Phone:</strong> {selectedSupplier.phone}</p>
            <p><strong>Location:</strong> {selectedSupplier.location}</p>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} title="Delete Supplier" message={`Delete supplier #${selectedSupplier?.supplierId}?`} loading={submitting} />
    </div>
  );
};
