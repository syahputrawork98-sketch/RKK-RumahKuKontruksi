import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiPrinter, 
    FiPlus, 
    FiEdit2, 
    FiTrash2, 
    FiAlertCircle, 
    FiCheckCircle, 
    FiChevronDown, 
    FiChevronUp,
    FiFileText,
    FiPackage,
    FiTag,
    FiX,
    FiSave,
    FiInfo
} from "react-icons/fi";
import projectService from "../../services/projectService";
import rabService from "../../services/rabService";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";

const DetailRabAdminPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { selectedAdminId } = useAdminPersona();
    
    // UI States
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState({ show: false, title: "", message: "", onConfirm: null });
    
    // Data States
    const [project, setProject] = useState(null);
    const [rabPlan, setRabPlan] = useState(null);
    
    // Form States
    const [planForm, setPlanForm] = useState({ title: "Draft RAB", type: "Pembangunan", version: "1.0", notes: "" });
    const [categoryForm, setCategoryForm] = useState({ code: "", name: "", description: "", order: 0 });
    const [itemForm, setItemForm] = useState({ description: "", volume: 1, unit: "m2", unitPrice: 0, notes: "", categoryId: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const fetchData = useCallback(async () => {
        if (!selectedAdminId) return;
        try {
            setLoading(true);
            setError(null);
            const [prjRes, rabRes] = await Promise.all([
                projectService.getProjectById(projectId),
                rabService.getRabByProject(projectId, { adminId: selectedAdminId }).catch(() => ({ data: null }))
            ]);

            setProject(prjRes.data);
            setRabPlan(rabRes.data);
        } catch (err) {
            console.error("Error fetching RAB data:", err);
            setError("Gagal memuat data RAB. Pastikan server backend berjalan.");
        } finally {
            setLoading(false);
        }
    }, [projectId, selectedAdminId]);

    useEffect(() => {
        if (projectId && selectedAdminId) {
            fetchData();
        }
    }, [fetchData, projectId, selectedAdminId]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    // HANDLERS
    const handleCreatePlan = async (e) => {
        e.preventDefault();
        setFormError(null);
        if (!planForm.title || !planForm.type) {
            setFormError("Judul dan Tipe RAB wajib diisi.");
            return;
        }

        try {
            setSubmitting(true);
            await rabService.createRabPlan(projectId, planForm, { adminId: selectedAdminId });
            setShowPlanModal(false);
            fetchData();
        } catch (err) {
            setFormError(err.response?.data?.message || "Gagal membuat RAB Plan.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSaveCategory = async (e) => {
        e.preventDefault();
        setFormError(null);
        if (!categoryForm.code || !categoryForm.name) {
            setFormError("Kode dan Nama Kategori wajib diisi.");
            return;
        }

        try {
            setSubmitting(true);
            if (isEditing) {
                await rabService.updateRabCategory(editId, categoryForm, { adminId: selectedAdminId });
            } else {
                await rabService.createRabCategory(rabPlan.id, categoryForm, { adminId: selectedAdminId });
            }
            setShowCategoryModal(false);
            setIsEditing(false);
            setEditId(null);
            fetchData();
        } catch (err) {
            setFormError(err.response?.data?.message || "Gagal menyimpan kategori.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleSaveItem = async (e) => {
        e.preventDefault();
        setFormError(null);
        
        // Frontend Validations
        if (!itemForm.description) return setFormError("Deskripsi pekerjaan wajib diisi.");
        if (!itemForm.volume || itemForm.volume <= 0) return setFormError("Volume harus lebih besar dari 0.");
        if (!itemForm.unit) return setFormError("Satuan wajib diisi.");
        if (itemForm.unitPrice < 0) return setFormError("Harga satuan tidak boleh negatif.");

        try {
            setSubmitting(true);
            if (isEditing) {
                await rabService.updateRabItem(editId, itemForm, { adminId: selectedAdminId });
            } else {
                await rabService.createRabItem(itemForm.categoryId, itemForm, { adminId: selectedAdminId });
            }
            setShowItemModal(false);
            setIsEditing(false);
            setEditId(null);
            fetchData();
        } catch (err) {
            setFormError(err.response?.data?.message || "Gagal menyimpan item.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteCategory = (id) => {
        setShowConfirmModal({
            show: true,
            title: "Hapus Kategori",
            message: "Hapus kategori ini beserta seluruh item di dalamnya? Tindakan ini tidak dapat dibatalkan.",
            onConfirm: async () => {
                try {
                    setSubmitting(true);
                    await rabService.deleteRabCategory(id, { adminId: selectedAdminId });
                    fetchData();
                    setShowConfirmModal({ show: false });
                } catch (err) {
                    setError("Gagal menghapus kategori: " + (err.response?.data?.message || err.message));
                } finally {
                    setSubmitting(false);
                }
            }
        });
    };

    const handleDeleteItem = (id) => {
        setShowConfirmModal({
            show: true,
            title: "Hapus Item",
            message: "Hapus item pekerjaan ini?",
            onConfirm: async () => {
                try {
                    setSubmitting(true);
                    await rabService.deleteRabItem(id, { adminId: selectedAdminId });
                    fetchData();
                    setShowConfirmModal({ show: false });
                } catch (err) {
                    setError("Gagal menghapus item: " + (err.response?.data?.message || err.message));
                } finally {
                    setSubmitting(false);
                }
            }
        });
    };

    if (!selectedAdminId) return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    if (loading) return <RoleDataState type="loading" message="Memverifikasi data dan kepemilikan RAB..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;
    
    if (project && project.adminId !== selectedAdminId) {
        return (
            <div className="p-8 text-center space-y-6 bg-white rounded-3xl border border-red-100 animate-fadeIn max-w-md mx-auto my-20 shadow-xl shadow-red-500/5">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">
                    <FiAlertCircle size={40} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-slate-800">Akses Ditolak</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Forbidden Access</p>
                    <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                        Anda tidak memiliki izin untuk mengelola RAB proyek ini. Proyek ini bukan di bawah tanggung jawab persona Anda.
                    </p>
                </div>
                <button 
                    onClick={() => navigate("/admin/rab")} 
                    className="w-full py-3 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-slate-800/20"
                >
                    Kembali ke Daftar RAB
                </button>
            </div>
        );
    }

    if (!project) return <RoleDataState type="empty" message="Proyek tidak ditemukan." />;

    return (
        <div className="animate-fadeIn space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/admin/rab")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all shadow-sm"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-black tracking-tight">
                                Kelola RAB: <span className="text-[var(--dashboard-primary)]">{project.projectCode}</span>
                            </h2>
                            {rabPlan && (
                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${rabPlan.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                    {rabPlan.status}
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] text-[var(--dashboard-text-soft)] font-black uppercase tracking-widest mt-0.5">{project.name} • {project.customer?.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        disabled
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-not-allowed opacity-60"
                        title="Cetak RAB belum tersedia dalam mode ini"
                    >
                        <FiPrinter /> Cetak RAB
                    </button>
                </div>
            </div>

            {/* RAB CONTENT */}
            {!rabPlan ? (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-[var(--dashboard-border)] shadow-sm">
                    <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6">
                        <FiFileText size={40} />
                    </div>
                    <h3 className="text-xl font-black mb-2">Proyek Belum Memiliki RAB</h3>
                    <div className="text-center max-w-md px-6 space-y-4">
                        <p className="text-sm text-[var(--dashboard-text-soft)] font-bold uppercase tracking-widest leading-relaxed">
                            RAB Plan adalah dokumen anggaran utama. Setelah dibuat, Admin bisa menambahkan kategori dan item pekerjaan.
                        </p>
                        <p className="text-[10px] text-slate-400 italic">
                            RAB ini bersifat draft internal dan belum menjadi kontrak final atau Change Order.
                        </p>
                    </div>
                    <button 
                        onClick={() => {
                            setFormError(null);
                            setShowPlanModal(true);
                        }}
                        className="mt-8 px-8 py-4 bg-[var(--dashboard-primary)] text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[var(--dashboard-primary)]/30 hover:scale-105 transition-all"
                    >
                        Buat RAB Plan Pertama
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* SUMMARY SIDEBAR */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="dashboard-card bg-emerald-600 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Anggaran (RAB)</p>
                                <h3 className="text-2xl font-black mt-2">{formatCurrency(rabPlan.totalAmount)}</h3>
                                <div className="mt-6 pt-6 border-t border-white/20 space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="opacity-70 uppercase tracking-tighter">Budget Proyek</span>
                                        <span>{formatCurrency(project.budgetTotal)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="opacity-70 uppercase tracking-tighter">Jumlah Kategori</span>
                                        <span>{rabPlan.categories?.length || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="opacity-70 uppercase tracking-tighter">Status</span>
                                        <span className="bg-white/20 px-2 py-0.5 rounded-lg uppercase tracking-widest">{rabPlan.status}</span>
                                    </div>
                                </div>
                            </div>
                            <FiFileText className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 rotate-12" />
                        </div>

                        <div className="dashboard-card">
                            <h3 className="font-black text-[10px] uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-6">Aksi RAB</h3>
                            <div className="space-y-3">
                                <button 
                                    onClick={() => {
                                        setFormError(null);
                                        setIsEditing(false);
                                        setCategoryForm({ code: "", name: "", description: "", order: (rabPlan.categories?.length || 0) + 1 });
                                        setShowCategoryModal(true);
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-border)] transition-all shadow-sm"
                                >
                                    <FiPlus /> Tambah Kategori
                                </button>
                                <button 
                                    onClick={() => fetchData()}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-white text-[var(--dashboard-text-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-surface-soft)] transition-all shadow-sm"
                                >
                                    Refresh Data
                                </button>
                            </div>
                        </div>

                        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                            <h4 className="text-[10px] font-black text-indigo-700 uppercase mb-2 flex items-center gap-2"><FiInfo /> Real-time Sinkron</h4>
                            <p className="text-[10px] text-indigo-600 leading-relaxed font-bold">
                                Anggaran proyek (Project Budget) akan otomatis diperbarui setiap kali ada perubahan pada item RAB untuk menjaga akurasi laporan keuangan.
                            </p>
                        </div>
                    </div>

                    {/* MAIN RAB EDITOR */}
                    <div className="lg:col-span-3 space-y-6">
                        {rabPlan.categories?.length > 0 ? (
                            <div className="space-y-6">
                                {rabPlan.categories.map((cat) => (
                                    <div key={cat.id} className="dashboard-card p-0 overflow-hidden border-[var(--dashboard-border)] shadow-sm">
                                        <div className="p-6 bg-[var(--dashboard-surface-soft)] border-b border-[var(--dashboard-border)] flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white border border-[var(--dashboard-border)] flex items-center justify-center text-[var(--dashboard-primary)] font-black text-xs shadow-sm">
                                                    {cat.code}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black uppercase tracking-tight">{cat.name}</h4>
                                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{formatCurrency(cat.subtotal)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => {
                                                        setFormError(null);
                                                        setItemForm({ ...itemForm, categoryId: cat.id, description: "", volume: 1, unit: "m2", unitPrice: 0, notes: "" });
                                                        setIsEditing(false);
                                                        setShowItemModal(true);
                                                    }}
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors shadow-sm bg-white border border-emerald-100" title="Tambah Item"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        setFormError(null);
                                                        setCategoryForm({ code: cat.code, name: cat.name, description: cat.description || "", order: cat.order });
                                                        setIsEditing(true);
                                                        setEditId(cat.id);
                                                        setShowCategoryModal(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors shadow-sm bg-white border border-blue-100" title="Edit Kategori"
                                                >
                                                    <FiEdit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteCategory(cat.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-sm bg-white border border-red-100" title="Hapus Kategori"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] bg-slate-50/50">
                                                        <th className="py-3 px-6">Item Pekerjaan</th>
                                                        <th className="py-3 px-2 text-center">Vol</th>
                                                        <th className="py-3 px-2 text-center">Sat</th>
                                                        <th className="py-3 px-6 text-right">Harga Satuan</th>
                                                        <th className="py-3 px-6 text-right">Subtotal</th>
                                                        <th className="py-3 px-6 text-right">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cat.items?.map((item) => (
                                                        <tr key={item.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/30 transition-all group">
                                                            <td className="py-4 px-6 text-xs font-bold leading-relaxed text-slate-800">{item.description}</td>
                                                            <td className="py-4 px-2 text-xs text-center font-black text-slate-800">{parseFloat(item.volume)}</td>
                                                            <td className="py-4 px-2 text-xs text-center uppercase font-bold text-[var(--dashboard-text-soft)]">{item.unit}</td>
                                                            <td className="py-4 px-6 text-xs text-right font-medium text-slate-800">{formatCurrency(item.unitPrice)}</td>
                                                            <td className="py-4 px-6 text-xs text-right font-black text-emerald-700">{formatCurrency(item.total)}</td>
                                                            <td className="py-4 px-6 text-right">
                                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <button 
                                                                        onClick={() => {
                                                                            setFormError(null);
                                                                            setItemForm({ 
                                                                                categoryId: item.categoryId, 
                                                                                description: item.description, 
                                                                                volume: parseFloat(item.volume), 
                                                                                unit: item.unit, 
                                                                                unitPrice: parseFloat(item.unitPrice),
                                                                                notes: item.notes || ""
                                                                            });
                                                                            setIsEditing(true);
                                                                            setEditId(item.id);
                                                                            setShowItemModal(true);
                                                                        }}
                                                                        className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                                                                    >
                                                                        <FiEdit2 size={12} />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleDeleteItem(item.id)}
                                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                                    >
                                                                        <FiTrash2 size={12} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {(!cat.items || cat.items.length === 0) && (
                                                        <tr>
                                                            <td colSpan="6" className="py-8 text-center text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest italic">Belum ada item di kategori ini.</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-[var(--dashboard-border)] shadow-sm">
                                <FiTag size={48} className="text-[var(--dashboard-text-soft)] opacity-20 mb-4" />
                                <p className="text-sm font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest">Daftar kategori kosong</p>
                                <button 
                                    onClick={() => {
                                        setFormError(null);
                                        setIsEditing(false);
                                        setCategoryForm({ code: "", name: "", description: "", order: 1 });
                                        setShowCategoryModal(true);
                                    }}
                                    className="mt-4 px-6 py-3 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-primary)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--dashboard-border)] transition-all"
                                >
                                    Tambah Kategori Pertama
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MODAL PLAN */}
            {showPlanModal && (
                <Modal title="Buat RAB Plan Baru" onClose={() => !submitting && setShowPlanModal(false)}>
                    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                        <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-2">
                            <FiInfo /> Panduan Pengisian
                        </h4>
                        <ul className="text-[10px] text-amber-800 space-y-1 list-disc pl-4 font-bold leading-relaxed">
                            <li>RAB Plan adalah basis data anggaran utama proyek.</li>
                            <li>Judul minimal 5 karakter, Tipe (misal: Pembangunan/Renovasi).</li>
                            <li>Data ini akan mensinkronkan budgetTotal proyek secara real-time.</li>
                        </ul>
                    </div>
                    {formError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black text-red-600 uppercase flex items-center gap-2 animate-shake">
                            <FiAlertCircle /> {formError}
                        </div>
                    )}
                    <form onSubmit={handleCreatePlan} className="space-y-4">
                        <Input 
                            label="Judul RAB" 
                            value={planForm.title} 
                            onChange={e => setPlanForm({...planForm, title: e.target.value})} 
                            placeholder={`Contoh: RAB Pembangunan - ${project?.name}`} 
                            required 
                            disabled={submitting}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Tipe" value={planForm.type} onChange={e => setPlanForm({...planForm, type: e.target.value})} placeholder="Pembangunan" required disabled={submitting} />
                            <Input label="Versi" value={planForm.version} onChange={e => setPlanForm({...planForm, version: e.target.value})} placeholder="1.0" disabled={submitting} />
                        </div>
                        <TextArea label="Catatan (Opsional)" value={planForm.notes} onChange={e => setPlanForm({...planForm, notes: e.target.value})} placeholder="Tambahkan catatan jika diperlukan..." disabled={submitting} />
                        <SubmitButton label={submitting ? "Memproses..." : "Buat Plan Sekarang"} disabled={submitting} />
                    </form>
                </Modal>
            )}

            {/* MODAL CATEGORY */}
            {showCategoryModal && (
                <Modal title={isEditing ? "Edit Kategori" : "Tambah Kategori"} onClose={() => !submitting && setShowCategoryModal(false)}>
                    {formError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black text-red-600 uppercase flex items-center gap-2 animate-shake">
                            <FiAlertCircle /> {formError}
                        </div>
                    )}
                    <form onSubmit={handleSaveCategory} className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <Input label="Kode" value={categoryForm.code} onChange={e => setCategoryForm({...categoryForm, code: e.target.value})} placeholder="01" required disabled={submitting} />
                            <div className="col-span-2">
                                <Input label="Nama Kategori" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} placeholder="Pekerjaan Persiapan" required disabled={submitting} />
                            </div>
                        </div>
                        <TextArea label="Deskripsi (Opsional)" value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} disabled={submitting} />
                        <SubmitButton label={submitting ? "Menyimpan..." : (isEditing ? "Perbarui" : "Simpan Kategori")} disabled={submitting} />
                    </form>
                </Modal>
            )}

            {/* MODAL ITEM */}
            {showItemModal && (
                <Modal title={isEditing ? "Edit Item" : "Tambah Item Pekerjaan"} onClose={() => !submitting && setShowItemModal(false)}>
                    {formError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black text-red-600 uppercase flex items-center gap-2 animate-shake">
                            <FiAlertCircle /> {formError}
                        </div>
                    )}
                    <form onSubmit={handleSaveItem} className="space-y-4">
                        <Input label="Deskripsi Pekerjaan" value={itemForm.description} onChange={e => setItemForm({...itemForm, description: e.target.value})} placeholder="Pemasangan Bowplank" required disabled={submitting} />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Volume" type="number" step="0.01" value={itemForm.volume} onChange={e => setItemForm({...itemForm, volume: e.target.value})} required disabled={submitting} />
                            <Input label="Satuan" value={itemForm.unit} onChange={e => setItemForm({...itemForm, unit: e.target.value})} placeholder="m2" required disabled={submitting} />
                        </div>
                        <Input label="Harga Satuan (Rp)" type="number" value={itemForm.unitPrice} onChange={e => setItemForm({...itemForm, unitPrice: e.target.value})} required disabled={submitting} />
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Estimasi Total</span>
                            <span className="text-sm font-black text-emerald-700">{formatCurrency(itemForm.volume * itemForm.unitPrice)}</span>
                        </div>
                        <SubmitButton label={submitting ? "Menyimpan..." : (isEditing ? "Perbarui Item" : "Tambahkan Item")} disabled={submitting} />
                    </form>
                </Modal>
            )}

            {/* CONFIRMATION MODAL */}
            {showConfirmModal.show && (
                <Modal title={showConfirmModal.title} onClose={() => !submitting && setShowConfirmModal({ show: false })}>
                    <div className="space-y-6">
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{showConfirmModal.message}</p>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setShowConfirmModal({ show: false })}
                                disabled={submitting}
                                className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={showConfirmModal.onConfirm}
                                disabled={submitting}
                                className="flex-1 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                            >
                                {submitting ? "Menghapus..." : "Ya, Hapus"}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

// UI HELPERS
const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-[var(--dashboard-border)]">
            <div className="p-6 border-b border-[var(--dashboard-border)] flex justify-between items-center bg-[var(--dashboard-surface-soft)]">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all shadow-sm"><FiX /></button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

const Input = ({ label, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-1">{label}</label>
        <input {...props} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 transition-all font-bold disabled:opacity-50" />
    </div>
);

const TextArea = ({ label, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-1">{label}</label>
        <textarea {...props} rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 transition-all font-bold disabled:opacity-50" />
    </div>
);

const SubmitButton = ({ label, ...props }) => (
    <button type="submit" {...props} className="w-full py-4 bg-[var(--dashboard-primary)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
        <FiSave /> {label}
    </button>
);

export default DetailRabAdminPage;
