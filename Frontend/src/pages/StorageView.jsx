import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useToast } from '../components/common/Toast';
import { storageFacilityApi, regionalCoopApi } from '../services/api';

export const StorageView = () => {
  const [storageList, setStorageList] = useState([]);
  const [coops, setCoops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [formData, setFormData] = useState({ storageId: '', storageName: '', location: '', capacityTons: '', coopId: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sData, cData] = await Promise.all([
        storageFacilityApi.getAll(),
        regionalCoopApi.getAll(),
      ]);
      setStorageList(sData);
      setCoops(cData);
    } catch (err) {
      addToast(err.message || 'Failed to fetch storage facilities', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenCreate = () => {
    setSelectedStorage(null);
    setFormData({ storageId: '', storageName: '', location: '', capacityTons: '', coopId: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setSelectedStorage(s);
    setFormData({ storageId: s.storageId, storageName: s.storageName || '', location: s.location || '', capacityTons: s.capacityTons || '', coopId: s.regionalCoop?.coopId || '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        storageId: parseInt(formData.storageId),
        storageName: formData.storageName,
        location: formData.location,
        capacityTons: parseFloat(formData.capacityTons),
        coopId: formData.coopId ? parseInt(formData.coopId) : null,
      };

      if (selectedStorage) {
        await storageFacilityApi.update(selectedStorage.storageId, payload);
        addToast('Storage facility updated successfully');
      } else {
        await storageFacilityApi.create(payload);
        addToast('Storage facility created successfully');
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
    if (!selectedStorage) return;
    setSubmitting(true);
    try {
      await storageFacilityApi.delete(selectedStorage.storageId);
      addToast('Storage facility deleted successfully');
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'storageId', label: 'ID' },
    { key: 'storageName', label: 'Storage Name' },
    { key: 'location', label: 'Location' },
    { key: 'capacityTons', label: 'Capacity (Tons)' },
    { key: 'regionalCoop', label: 'Regional Co-op', render: (row) => row.regionalCoop?.coopName || 'None' },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Storage Facilities"
        data={storageList}
        columns={columns}
        searchKey="storageName"
        searchPlaceholder="Search storage name..."
        loading={loading}
        onAdd={handleOpenCreate}
        onView={(s) => { setSelectedStorage(s); setIsViewModalOpen(true); }}
        onEdit={handleOpenEdit}
        onDelete={(s) => { setSelectedStorage(s); setIsDeleteModalOpen(true); }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedStorage ? 'Edit Storage Facility' : 'New Storage Facility'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Storage ID</label>
            <input type="number" required disabled={selectedStorage !== null} value={formData.storageId} onChange={(e) => setFormData({ ...formData, storageId: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:opacity-60" placeholder="e.g. 20" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Storage Name</label>
            <input type="text" required value={formData.storageName} onChange={(e) => setFormData({ ...formData, storageName: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. Central Silo #1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Location</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. Zone A" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Capacity (Tons)</label>
              <input type="number" step="0.01" value={formData.capacityTons} onChange={(e) => setFormData({ ...formData, capacityTons: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. 10000" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Regional Co-op</label>
            <select value={formData.coopId} onChange={(e) => setFormData({ ...formData, coopId: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
              <option value="">-- None --</option>
              {coops.map((c) => (
                <option key={c.coopId} value={c.coopId}>{c.coopName}</option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Save Storage</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Storage Facility Details">
        {selectedStorage && (
          <div className="space-y-3 text-sm p-4 bg-slate-50 rounded-xl">
            <p><strong>ID:</strong> {selectedStorage.storageId}</p>
            <p><strong>Name:</strong> {selectedStorage.storageName}</p>
            <p><strong>Location:</strong> {selectedStorage.location}</p>
            <p><strong>Capacity:</strong> {selectedStorage.capacityTons} Tons</p>
            <p><strong>Co-op:</strong> {selectedStorage.regionalCoop?.coopName || 'None'}</p>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} title="Delete Storage Facility" message={`Delete storage #${selectedStorage?.storageId}?`} loading={submitting} />
    </div>
  );
};
