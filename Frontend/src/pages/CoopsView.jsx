import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useToast } from '../components/common/Toast';
import { regionalCoopApi } from '../services/api';

export const CoopsView = () => {
  const [coops, setCoops] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCoop, setSelectedCoop] = useState(null);
  const [formData, setFormData] = useState({ coopId: '', coopName: '', state: '', siloCapacityTons: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await regionalCoopApi.getAll();
      setCoops(data);
    } catch (err) {
      addToast(err.message || 'Failed to fetch regional co-ops', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenCreate = () => {
    setSelectedCoop(null);
    setFormData({ coopId: '', coopName: '', state: '', siloCapacityTons: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (coop) => {
    setSelectedCoop(coop);
    setFormData({ coopId: coop.coopId, coopName: coop.coopName || '', state: coop.state || '', siloCapacityTons: coop.siloCapacityTons || '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        coopId: parseInt(formData.coopId),
        coopName: formData.coopName,
        state: formData.state,
        siloCapacityTons: parseFloat(formData.siloCapacityTons),
      };
      if (selectedCoop) {
        await regionalCoopApi.update(selectedCoop.coopId, payload);
        addToast('Regional Co-op updated successfully');
      } else {
        await regionalCoopApi.create(payload);
        addToast('Regional Co-op created successfully');
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
    if (!selectedCoop) return;
    setSubmitting(true);
    try {
      await regionalCoopApi.delete(selectedCoop.coopId);
      addToast('Regional Co-op deleted successfully');
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'coopId', label: 'Co-op ID' },
    { key: 'coopName', label: 'Co-op Name' },
    { key: 'state', label: 'State' },
    { key: 'siloCapacityTons', label: 'Silo Capacity (Tons)' },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Regional Co-ops"
        data={coops}
        columns={columns}
        searchKey="coopName"
        searchPlaceholder="Search co-op name..."
        loading={loading}
        onAdd={handleOpenCreate}
        onView={(c) => { setSelectedCoop(c); setIsViewModalOpen(true); }}
        onEdit={handleOpenEdit}
        onDelete={(c) => { setSelectedCoop(c); setIsDeleteModalOpen(true); }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedCoop ? 'Edit Regional Co-op' : 'New Regional Co-op'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Co-op ID</label>
            <input type="number" required disabled={selectedCoop !== null} value={formData.coopId} onChange={(e) => setFormData({ ...formData, coopId: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:opacity-60" placeholder="e.g. 10" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Co-op Name</label>
            <input type="text" required value={formData.coopName} onChange={(e) => setFormData({ ...formData, coopName: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. Midwest Grain Growers" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">State</label>
              <input type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. Iowa" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Silo Capacity (Tons)</label>
              <input type="number" step="0.01" value={formData.siloCapacityTons} onChange={(e) => setFormData({ ...formData, siloCapacityTons: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. 50000" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Save Co-op</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Regional Co-op Details">
        {selectedCoop && (
          <div className="space-y-3 text-sm p-4 bg-slate-50 rounded-xl">
            <p><strong>ID:</strong> {selectedCoop.coopId}</p>
            <p><strong>Name:</strong> {selectedCoop.coopName}</p>
            <p><strong>State:</strong> {selectedCoop.state}</p>
            <p><strong>Silo Capacity:</strong> {selectedCoop.siloCapacityTons} Tons</p>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} title="Delete Regional Co-op" message={`Delete co-op #${selectedCoop?.coopId}?`} loading={submitting} />
    </div>
  );
};
