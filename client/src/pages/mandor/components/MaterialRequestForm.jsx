import React, { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import projectService from '../../../services/projectService';
import materialRequestService from '../../../services/materialRequestService';
import { useForemanPersona } from '../../../context/ForemanPersonaContext';

const MaterialRequestForm = ({ onClose, onSuccess }) => {
  const { selectedForemanId, selectedForeman } = useForemanPersona();
  const [projects, setProjects] = useState([]);
  const [stages, setStages] = useState([]);
  const [rabItems, setRabItems] = useState([]);
  
  const [formData, setFormData] = useState({
    projectId: '',
    stageId: '',
    priority: 'medium',
    neededDate: '',
    reason: '',
    items: [{ materialName: '', requestedQty: '', unit: '', rabItemId: '', note: '', estimatedQty: 0 }]
  });

  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingStages, setLoadingStages] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!selectedForemanId) return;
      setLoadingProjects(true);
      try {
        const response = await projectService.getProjects({ foremanId: selectedForemanId });
        setProjects(response.data || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [selectedForemanId]);

  useEffect(() => {
    const fetchStages = async () => {
      if (!formData.projectId) {
        setStages([]);
        return;
      }
      setLoadingStages(true);
      try {
        const response = await projectService.getProjectStages(formData.projectId);
        setStages(response.data);
        
        // Fetch RAB Usage (includes total, approved, and remaining)
        try {
          const rabUsageResponse = await materialRequestService.getRabUsage(formData.projectId);
          if (rabUsageResponse.success && rabUsageResponse.data) {
            setRabItems(rabUsageResponse.data);
          } else {
            setRabItems([]);
          }
        } catch (rabErr) {
          console.log('RAB usage not found for this project.');
          setRabItems([]);
        }
      } catch (error) {
        console.error('Failed to fetch stages:', error);
      } finally {
        setLoadingStages(false);
      }
    };
    fetchStages();
  }, [formData.projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    // If rabItemId is selected, auto-fill materialName, unit, and usage info
    if (field === 'rabItemId' && value) {
      const selectedRab = rabItems.find(item => item.rabItemId === value);
      if (selectedRab) {
        newItems[index].materialName = selectedRab.description;
        newItems[index].unit = selectedRab.unit;
        newItems[index].totalRabQty = selectedRab.totalRabQty;
        newItems[index].remainingRabQty = selectedRab.remainingRabQty;
      }
    }

    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { materialName: '', requestedQty: '', unit: '', rabItemId: '', note: '', estimatedQty: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedForemanId) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        foremanId: selectedForemanId,
        supervisorId: projects.find(p => p.id === formData.projectId)?.supervisorId,
        items: formData.items.map(item => ({
          ...item,
          requestedQty: parseFloat(item.requestedQty),
          estimatedQtyFromRab: parseFloat(item.estimatedQty) || 0,
          isAdditionalMaterial: !item.rabItemId
        }))
      };

      const response = await materialRequestService.createRequest(payload);
      if (response.success) {
        onSuccess();
        onClose();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Submit failed:', error);
      alert('Gagal mengirim request material.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--dashboard-surface)] w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slideUp">
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-[var(--dashboard-border)] flex items-center justify-between bg-gradient-to-r from-[var(--dashboard-primary)]/5 to-transparent">
          <div>
            <h3 className="text-xl font-black tracking-tight uppercase">Buat Pengajuan Kebutuhan Material</h3>
            <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Lengkapi detail kebutuhan material lapangan untuk proyek Anda.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--dashboard-surface-soft)] rounded-full transition-colors">
            <FiX size={24} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PROJECT SELECT */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Pilih Proyek</label>
              <select
                name="projectId"
                value={formData.projectId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
              >
                <option value="">-- Pilih Proyek --</option>
                {(projects || []).map(p => {
                  if (!p) return null;
                  const isActive = p.status === 'active' || p.status === 'ongoing' || p.status === 'Berjalan';
                  return (
                    <option key={p.id} value={p.id}>
                      {p.projectCode} - {p.name} {!isActive ? `(${p.status === 'planning' || p.status === 'Perencanaan' ? 'Persiapan' : p.status})` : ''}
                    </option>
                  );
                })}
              </select>
              {formData.projectId && !projects.find(p => p.id === formData.projectId)?.status?.match(/active|ongoing|Berjalan/) && (
                <div className="mt-2 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-2 text-[10px] font-bold text-amber-700 animate-pulse">
                  <FiAlertCircle />
                  <span>Proyek masih tahap persiapan. Request material hanya bisa dikirim setelah proyek Aktif/Berjalan.</span>
                </div>
              )}
            </div>

            {/* STAGE SELECT */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Tahap / Stage Pekerjaan</label>
              <select
                name="stageId"
                value={formData.stageId}
                onChange={handleInputChange}
                required
                disabled={!formData.projectId || loadingStages}
                className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none disabled:opacity-50"
              >
                <option value="">{loadingStages ? 'Memuat...' : '-- Pilih Tahap --'}</option>
                {stages.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
            </div>

            {/* PRIORITY */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Prioritas</label>
              <div className="flex gap-4">
                {['low', 'medium', 'high'].map(p => (
                  <label key={p} className="flex-1">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={formData.priority === p}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="text-center py-2 px-4 rounded-xl border border-[var(--dashboard-border)] text-[10px] font-black uppercase cursor-pointer transition-all peer-checked:bg-[var(--dashboard-primary)] peer-checked:text-white peer-checked:border-[var(--dashboard-primary)] peer-checked:shadow-lg peer-checked:shadow-[var(--dashboard-primary)]/20">
                      {p}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* NEEDED DATE */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Tanggal Dibutuhkan</label>
              <input
                type="date"
                name="neededDate"
                value={formData.neededDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Alasan Utama Pengajuan</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Jelaskan secara singkat alasan pengajuan ini (misal: Stok semen untuk plester lantai 2 habis)"
              className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none min-h-[80px]"
            />
          </div>

          {/* MATERIAL ITEMS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Daftar Material</label>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 text-[10px] font-black uppercase text-[var(--dashboard-primary)] hover:underline"
              >
                <FiPlus /> Tambah Item
              </button>
            </div>

            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="p-6 bg-[var(--dashboard-surface-soft)]/50 border border-[var(--dashboard-border)] rounded-2xl space-y-4 animate-fadeIn">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter">Item #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* RAB ITEM SELECTION */}
                    <div className="md:col-span-4 space-y-1">
                      <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Ambil dari RAB (Opsional)</label>
                      <select
                        value={item.rabItemId}
                        onChange={(e) => handleItemChange(index, 'rabItemId', e.target.value)}
                        className="w-full px-3 py-2 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
                      >
                        <option value="">-- Manual / Material Tambahan --</option>
                        {rabItems.map(ri => (
                          <option key={ri.rabItemId} value={ri.rabItemId}>{ri.description} ({ri.categoryName})</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-4 space-y-1">
                      <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Nama Material</label>
                      <input
                        type="text"
                        value={item.materialName}
                        onChange={(e) => handleItemChange(index, 'materialName', e.target.value)}
                        placeholder="Contoh: Semen Gresik 40kg"
                        required
                        className="w-full px-3 py-2 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Jumlah</label>
                      <input
                        type="number"
                        step="any"
                        value={item.requestedQty}
                        onChange={(e) => handleItemChange(index, 'requestedQty', e.target.value)}
                        placeholder="Qty"
                        required
                        className="w-full px-3 py-2 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Satuan</label>
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        placeholder="Sak/Rit/Dll"
                        required
                        className="w-full px-3 py-2 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
                      />
                    </div>
                  </div>

                  {/* ESTIMATION WARNING */}
                  {item.rabItemId ? (
                    <div className={`flex flex-col gap-1 p-4 rounded-2xl border text-[10px] font-bold ${
                      parseFloat(item.requestedQty) > item.remainingRabQty 
                      ? "bg-red-500/5 border-red-500/20 text-red-600" 
                      : "bg-emerald-500/5 border-emerald-500/20 text-emerald-600"
                    }`}>
                      <div className="flex items-center gap-2">
                        {parseFloat(item.requestedQty) > item.remainingRabQty ? (
                          <>
                            <FiAlertCircle className="flex-shrink-0" />
                            <span className="uppercase tracking-tight">Melebihi Sisa Kuota RAB! (Tersedia: {item.remainingRabQty} {item.unit})</span>
                          </>
                        ) : (
                          <>
                            <FiCheckCircle className="flex-shrink-0" />
                            <span className="uppercase tracking-tight">Sesuai Alokasi RAB (Sisa setelah ini: {(item.remainingRabQty - (parseFloat(item.requestedQty) || 0)).toFixed(2)} {item.unit})</span>
                          </>
                        )}
                      </div>
                      <div className="mt-1 pl-5 text-[8px] opacity-60 flex gap-4 uppercase tracking-widest font-black">
                        <span>Total RAB: {item.totalRabQty} {item.unit}</span>
                        <span>Sisa Saat Ini: {item.remainingRabQty} {item.unit}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-[10px] font-black text-amber-600 uppercase tracking-tight italic">
                      <FiAlertCircle size={12} />
                      <span>Request Manual / Luar RAB. Mohon pastikan alasan tambahan diisi dengan jelas.</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Catatan Item</label>
                    <input
                      type="text"
                      value={item.note}
                      onChange={(e) => handleItemChange(index, 'note', e.target.value)}
                      placeholder="Catatan tambahan untuk item ini..."
                      className="w-full px-3 py-2 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-xs font-medium focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* FOOTER */}
        <div className="px-8 py-6 border-t border-[var(--dashboard-border)] bg-[var(--dashboard-surface-soft)] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] hover:bg-[var(--dashboard-border)] transition-all"
          >
            Batal
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !formData.projectId || !formData.stageId || !projects.find(p => p.id === formData.projectId)?.status?.match(/active|ongoing|Berjalan/)}
            className="px-8 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? 'Mengirim...' : 'Kirim Pengajuan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialRequestForm;
