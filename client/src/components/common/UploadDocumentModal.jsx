import React, { useState, useEffect } from "react";
import { FiX, FiUpload, FiInfo, FiCheckCircle } from "react-icons/fi";
import projectDocumentService from "../../services/projectDocumentService";
import apiClient from "../../services/apiClient";

const UploadDocumentModal = ({ isOpen, onClose, onSuccess, category = "lapangan", uploadedByRole, uploadedById }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    const [fetchingProjects, setFetchingProjects] = useState(false);

    const [formData, setFormData] = useState({
        projectId: "",
        title: "",
        description: "",
        visibility: "internal",
        stageId: "",
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchProjects();
        }
    }, [isOpen]);

    const fetchProjects = async () => {
        try {
            setFetchingProjects(true);
            // In dev mode we might want to see all projects or filter by persona
            const response = await apiClient.get('/projects');
            setProjects(response.data || []);
            if (response.data?.length > 0) {
                setFormData(prev => ({ ...prev, projectId: response.data[0].id }));
            }
        } catch (err) {
            console.error("Failed to fetch projects", err);
        } finally {
            setFetchingProjects(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            // Auto-fill title if empty
            if (!formData.title) {
                const fileName = e.target.files[0].name.split('.').slice(0, -1).join('.');
                setFormData(prev => ({ ...prev, title: fileName }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Silakan pilih file terlebih dahulu.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = new FormData();
            data.append("file", file);
            data.append("projectId", formData.projectId);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", category);
            data.append("visibility", formData.visibility);
            data.append("uploadedByRole", uploadedByRole);
            data.append("uploadedById", uploadedById);
            if (formData.stageId) data.append("stageId", formData.stageId);

            await projectDocumentService.uploadDocument(data);
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                projectId: projects[0]?.id || "",
                title: "",
                description: "",
                visibility: "internal",
                stageId: "",
            });
            setFile(null);
        } catch (err) {
            setError(err.response?.data?.error || err.message || "Gagal mengunggah dokumen");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-6 py-4 bg-[var(--dashboard-primary)] text-white flex items-center justify-between">
                    <h3 className="font-black uppercase tracking-widest text-sm">Unggah Dokumentasi</h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <FiX size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2 italic">
                            <FiInfo className="shrink-0" /> {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Proyek</label>
                        <select
                            required
                            disabled={fetchingProjects}
                            value={formData.projectId}
                            onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
                        >
                            {fetchingProjects ? (
                                <option>Memuat proyek...</option>
                            ) : projects.length === 0 ? (
                                <option>Tidak ada proyek aktif</option>
                            ) : (
                                projects.map(p => (
                                    <option key={p.id} value={p.id}>{p.projectCode} - {p.name}</option>
                                ))
                            )}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Judul Dokumentasi</label>
                        <input
                            required
                            type="text"
                            placeholder="Contoh: Pemasangan Bata Lt 1"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Catatan / Deskripsi</label>
                        <textarea
                            rows="2"
                            placeholder="Tambahkan catatan singkat..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none resize-none"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Visibilitas</label>
                            <select
                                value={formData.visibility}
                                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none"
                            >
                                <option value="internal">Internal Saja</option>
                                <option value="customer_visible">Terlihat Konsumen</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">File (Gambar/PDF)</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    accept="image/*,application/pdf"
                                />
                                <div className={`px-4 py-3 border-2 border-dashed rounded-xl text-center transition-all ${file ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50 group-hover:border-[var(--dashboard-primary)]/30'}`}>
                                    <span className="text-[10px] font-bold text-slate-500 truncate block">
                                        {file ? file.name : "Klik untuk pilih"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-slate-200 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading || fetchingProjects || projects.length === 0}
                            className="flex-1 px-6 py-3 bg-[var(--dashboard-primary)] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <><FiUpload /> Unggah Sekarang</>
                            )}
                        </button>
                    </div>
                </form>

                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <FiCheckCircle className="text-green-500" size={14} />
                    <span className="text-[9px] font-bold text-slate-400 italic">Adapter: Local Storage (Development Mode)</span>
                </div>
            </div>
        </div>
    );
};

export default UploadDocumentModal;
