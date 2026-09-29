import React, { useState, useEffect } from 'react';
import { DataTable } from '../components/common/DataTable';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { useToast } from '../components/common/Toast';
import { agriculturalFieldApi, farmerApi } from '../services/api';

export const FieldsView = () => {
  const [fields, setFields] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [formData, setFormData] = useState({
    fieldId: '',
    fieldName: '',
    acreage: '',
    cropType: '',
    farmerId: '',
  });
  const [submitting, submittingSet] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fData, farmData] = await Promise.all([
        agriculturalFieldApi.getAll(),
        farmerApi.getAll(),
      ]);
      setFields(fData);
      setFarmers(farmData);
    } catch (err) {
      addToast(err.message || 'Failed to load agricultural fields', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setSelectedField(null);
    setFormData({ fieldId: '', fieldName: '', acreage: '', cropType: '', farmerId: farmers[0]?.farmerId || '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (field) => {
    setSelectedField(field);
    setFormData({
      fieldId: field.fieldId,
      fieldName: field.fieldName || '',
      acreage: field.acreage || '',
      cropType: field.cropType || '',
      farmerId: field.farmer?.farmerId || '',
    });
    setIsModalOpen(true);
  };

  const handleOpenView = (field) => {
    setSelectedField(field);
    setIsViewModalOpen(true);
  };

  const handleOpenDelete = (field) => {
    setSelectedField(field);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submittingSet(true);
    try {
      const payload = {
        fieldId: parseInt(formData.fieldId),
        fieldName: formData.fieldName,
        acreage: parseFloat(formData.acreage),
        cropType: formData.cropType,
        farmerId: formData.farmerId ? parseInt(formData.farmerId) : null,
      };

      if (selectedField) {
        await agriculturalFieldApi.update(selectedField.fieldId, payload);
        addToast('Agricultural field updated successfully');
      } else {
        await agriculturalFieldApi.create(payload);
        addToast('Agricultural field created successfully');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Operation failed', 'error');
    } finally {
      submittingSet(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedField) return;
    submittingSet(true);
    try {
      await agriculturalFieldApi.delete(selectedField.fieldId);
      addToast('Agricultural field deleted successfully');
      setIsDeleteModalOpen(false);
      fetchData();
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error');
    } finally {
      submittingSet(false);
    }
  };

  const columns = [
    { key: 'fieldId', label: 'Field ID' },
    { key: 'fieldName', label: 'Field Name' },
    { key: 'cropType', label: 'Crop Type' },
    { key: 'acreage', label: 'Acreage (Acres)' },
    { 
      key: 'farmer', 
      label: 'Assigned Farmer', 
      render: (row) => row.farmer?.farmerName || 'Unassigned' 
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Agricultural Fields"
        data={fields}
        columns={columns}
        searchKey="fieldName"
        searchPlaceholder="Search field name..."
        loading={loading}
        onAdd={handleOpenCreate}
        onView={handleOpenView}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
      />

      {/* Create / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedField ? 'Edit Agricultural Field' : 'New Agricultural Field'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Field ID</label>
            <input
              type="number"
              required
              disabled={selectedField !== null}
              value={formData.fieldId}
              onChange={(e) => setFormData({ ...formData, fieldId: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none disabled:opacity-60"
              placeholder="e.g. 101"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Field Name</label>
            <input
              type="text"
              required
              value={formData.fieldName}
              onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
              placeholder="e.g. North Valley Farm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Crop Type</label>
              <input
                type="text"
                required
                value={formData.cropType}
                onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                placeholder="e.g. Wheat"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Acreage</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.acreage}
                onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                placeholder="e.g. 150.5"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Assigned Farmer</label>
            <select
              value={formData.farmerId}
              onChange={(e) => setFormData({ ...formData, farmerId: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="">-- Select Farmer --</option>
              {farmers.map((f) => (
                <option key={f.farmerId} value={f.farmerId}>
                  {f.farmerId} - {f.farmerName}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-colors flex items-center gap-2"
            >
              {submitting ? 'Saving...' : 'Save Field'}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Field Details"
      >
        {selectedField && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <span className="text-slate-400 block text-xs font-bold uppercase">Field ID</span>
                <span className="font-bold text-slate-800 text-base">{selectedField.fieldId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold uppercase">Field Name</span>
                <span className="font-bold text-slate-800 text-base">{selectedField.fieldName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold uppercase">Crop Type</span>
                <span className="font-bold text-slate-800 text-base">{selectedField.cropType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold uppercase">Acreage</span>
                <span className="font-bold text-slate-800 text-base">{selectedField.acreage} Acres</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-2">Farmer Information</h4>
              <p className="text-emerald-800 font-medium">{selectedField.farmer?.farmerName || 'Unassigned'}</p>
              <p className="text-xs text-emerald-700/80 mt-0.5">{selectedField.farmer?.email} • {selectedField.farmer?.phone}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Agricultural Field"
        message={`Are you sure you want to delete field #${selectedField?.fieldId} (${selectedField?.fieldName})? This action cannot be undone.`}
        loading={submitting}
      />
    </div>
  );
};
