import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useToast } from '../components/common/Toast';
import { farmerApi, supplierApi, regionalCoopApi } from '../services/api';

export const FarmersView = () => {
  const [farmers, setFarmers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [coops, setCoops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [formData, setFormData] = useState({
    farmerId: '',
    farmerName: '',
    email: '',
    phone: '',
    farmLocation: '',
    supplierId: '',
    coopId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fData, sData, cData] = await Promise.all([
        farmerApi.getAll(),
        supplierApi.getAll(),
        regionalCoopApi.getAll(),
      ]);
      setFarmers(fData);
      setSuppliers(sData);
      setCoops(cData);
    } catch (err) {
      addToast(err.message || 'Failed to fetch farmers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setSelectedFarmer(null);
    setFormData({ farmerId: '', farmerName: '', email: '', phone: '', farmLocation: '', supplierId: '', coopId: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (farmer) => {
    setSelectedFarmer(farmer);
    setFormData({
      farmerId: farmer.farmerId,
      farmerName: farmer.farmerName || '',
      email: farmer.email || '',
      phone: farmer.phone || '',
      farmLocation: farmer.farmLocation || '',
      supplierId: farmer.supplier?.supplierId || '',
      coopId: farmer.regionalCoop?.coopId || '',
    });
    setIsModalOpen(true);
  };

  const handleOpenView = (farmer) => {
    setSelectedFarmer(farmer);
    setIsViewModalOpen(true);
  };

  const handleOpenDelete = (farmer) => {
    setSelectedFarmer(farmer);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        farmerId: parseInt(formData.farmerId),
        farmerName: formData.farmerName,
        email: formData.email,
        phone: formData.phone,
        farmLocation: formData.farmLocation,
        supplierId: formData.supplierId ? parseInt(formData.supplierId) : null,
        coopId: formData.coopId ? parseInt(formData.coopId) : null,
      };

      if (selectedFarmer) {
        await farmerApi.update(selectedFarmer.farmerId, payload);
        addToast('Farmer updated successfully');
      } else {
        await farmerApi.create(payload);
        addToast('Farmer created successfully');
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
    if (!selectedFarmer) return;
    setSubmitting(true);
    try {
      await farmerApi.delete(selectedFarmer.farmerId);
      addToast('Farmer deleted successfully');
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'farmerId', label: 'ID' },
    { key: 'farmerName', label: 'Farmer Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'farmLocation', label: 'Farm Location' },
    { key: 'supplier', label: 'Supplier', render: (row) => row.supplier?.supplierName || 'None' },
    { key: 'regionalCoop', label: 'Co-op', render: (row) => row.regionalCoop?.coopName || 'None' },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Farmers"
        data={farmers}
        columns={columns}
        searchKey="farmerName"
        searchPlaceholder="Search farmer name..."
        loading={loading}
        onAdd={handleOpenCreate}
        onView={handleOpenView}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* Modal Create/Edit */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedFarmer ? 'Edit Farmer' : 'New Farmer'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Farmer ID</label>
            <input
              type="number"
              required
              disabled={selectedFarmer !== null}
              value={formData.farmerId}
              onChange={(e) => setFormData({ ...formData, farmerId: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none disabled:opacity-60"
              placeholder="e.g. 1"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Farmer Name</label>
            <input
              type="text"
              required
              value={formData.farmerName}
              onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                placeholder="+1 555-0192"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Farm Location</label>
            <input
              type="text"
              value={formData.farmLocation}
              onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
              placeholder="e.g. County Line, Iowa"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Supplier</label>
              <select
                value={formData.supplierId}
                onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="">-- None --</option>
                {suppliers.map((s) => (
                  <option key={s.supplierId} value={s.supplierId}>{s.supplierName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Regional Co-op</label>
              <select
                value={formData.coopId}
                onChange={(e) => setFormData({ ...formData, coopId: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="">-- None --</option>
                {coops.map((c) => (
                  <option key={c.coopId} value={c.coopId}>{c.coopName}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Save Farmer</button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Farmer Details">
        {selectedFarmer && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
              <div><span className="text-slate-400 text-xs block uppercase">ID</span><strong>{selectedFarmer.farmerId}</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Name</span><strong>{selectedFarmer.farmerName}</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Email</span><strong>{selectedFarmer.email}</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Phone</span><strong>{selectedFarmer.phone}</strong></div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-xs font-bold text-emerald-900 uppercase">Associations</p>
              <p className="text-emerald-800 font-medium mt-1">Supplier: {selectedFarmer.supplier?.supplierName || 'None'}</p>
              <p className="text-emerald-800 font-medium">Co-op: {selectedFarmer.regionalCoop?.coopName || 'None'}</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Farmer"
        message={`Are you sure you want to delete farmer #${selectedFarmer?.farmerId} (${selectedFarmer?.farmerName})?`}
        loading={submitting}
      />
    </div>
  );
};
