import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useToast } from '../components/common/Toast';
import { cropBatchApi, storageFacilityApi } from '../services/api';

export const BatchesView = () => {
  const [batches, setBatches] = useState([]);
  const [storageFacilities, setStorageFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [formData, setFormData] = useState({
    batchNo: '',
    cropType: '',
    qualityGrade: '',
    pricePerTon: '',
    harvestDate: '',
    storageId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bData, sData] = await Promise.all([
        cropBatchApi.getAll(),
        storageFacilityApi.getAll(),
      ]);
      setBatches(bData);
      setStorageFacilities(sData);
    } catch (err) {
      addToast(err.message || 'Failed to fetch crop batches', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleOpenCreate = () => {
    setSelectedBatch(null);
    setFormData({ batchNo: '', cropType: '', qualityGrade: 'A', pricePerTon: '', harvestDate: new Date().toISOString().split('T')[0], storageId: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (batch) => {
    setSelectedBatch(batch);
    setFormData({
      batchNo: batch.batchNo,
      cropType: batch.cropType || '',
      qualityGrade: batch.qualityGrade || 'A',
      pricePerTon: batch.pricePerTon || '',
      harvestDate: batch.harvestDate || '',
      storageId: batch.storageFacility?.storageId || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        batchNo: formData.batchNo,
        cropType: formData.cropType,
        qualityGrade: formData.qualityGrade,
        pricePerTon: parseFloat(formData.pricePerTon),
        harvestDate: formData.harvestDate,
        storageId: formData.storageId ? parseInt(formData.storageId) : null,
      };

      if (selectedBatch) {
        await cropBatchApi.update(selectedBatch.batchNo, payload);
        addToast('Crop batch updated successfully');
      } else {
        await cropBatchApi.create(payload);
        addToast('Crop batch created successfully');
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
    if (!selectedBatch) return;
    setSubmitting(true);
    try {
      await cropBatchApi.delete(selectedBatch.batchNo);
      addToast('Crop batch deleted successfully');
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'batchNo', label: 'Batch No' },
    { key: 'cropType', label: 'Crop Type' },
    { key: 'qualityGrade', label: 'Grade' },
    { key: 'pricePerTon', label: 'Price/Ton ($)', render: (row) => `$${row.pricePerTon}` },
    { key: 'harvestDate', label: 'Harvest Date' },
    { key: 'storageFacility', label: 'Storage', render: (row) => row.storageFacility?.storageName || 'None' },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Crop Batches"
        data={batches}
        columns={columns}
        searchKey="batchNo"
        searchPlaceholder="Search batch number..."
        loading={loading}
        onAdd={handleOpenCreate}
        onView={(b) => { setSelectedBatch(b); setIsViewModalOpen(true); }}
        onEdit={handleOpenEdit}
        onDelete={(b) => { setSelectedBatch(b); setIsDeleteModalOpen(true); }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedBatch ? 'Edit Crop Batch' : 'New Crop Batch'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Batch Number</label>
            <input type="text" required disabled={selectedBatch !== null} value={formData.batchNo} onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:opacity-60" placeholder="e.g. BATCH-2026-001" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Crop Type</label>
              <input type="text" required value={formData.cropType} onChange={(e) => setFormData({ ...formData, cropType: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. Corn" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Quality Grade</label>
              <select value={formData.qualityGrade} onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="Organic">Organic</option>
                <option value="Premium">Premium</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Price Per Ton ($)</label>
              <input type="number" step="0.01" required value={formData.pricePerTon} onChange={(e) => setFormData({ ...formData, pricePerTon: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" placeholder="e.g. 240.00" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Harvest Date</label>
              <input type="date" required value={formData.harvestDate} onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Storage Facility</label>
            <select value={formData.storageId} onChange={(e) => setFormData({ ...formData, storageId: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm">
              <option value="">-- None --</option>
              {storageFacilities.map((s) => (
                <option key={s.storageId} value={s.storageId}>{s.storageName} ({s.location})</option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Save Batch</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Crop Batch Details">
        {selectedBatch && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
              <div><span className="text-slate-400 text-xs block uppercase">Batch No</span><strong>{selectedBatch.batchNo}</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Crop Type</span><strong>{selectedBatch.cropType}</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Grade</span><strong>{selectedBatch.qualityGrade}</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Price/Ton</span><strong>${selectedBatch.pricePerTon}</strong></div>
              <div><span className="text-slate-400 text-xs block uppercase">Harvest Date</span><strong>{selectedBatch.harvestDate}</strong></div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <p className="text-xs font-bold text-emerald-900 uppercase">Storage Location</p>
              <p className="text-emerald-800 font-medium mt-1">{selectedBatch.storageFacility?.storageName || 'None'} - {selectedBatch.storageFacility?.location}</p>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} title="Delete Crop Batch" message={`Delete batch ${selectedBatch?.batchNo}?`} loading={submitting} />
    </div>
  );
};
