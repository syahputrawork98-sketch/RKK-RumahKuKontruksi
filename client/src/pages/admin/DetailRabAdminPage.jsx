import React, { useState, useEffect } from "react";
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
import RoleDataState from "../../components/common/RoleDataState";

const DetailRabAdminPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    
    // UI States
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    
    // Data States
    const [project, setProject] = useState(null);
    const [rabPlan, setRabPlan] = useState(null);
    
    // Form States
    const [planForm, setPlanForm] = useState({ title: "Draft RAB", type: "Pembangunan", version: "1.0", notes: "" });
    const [categoryForm, setCategoryForm] = useState({ code: "", name: "", description: "", order: 0 });
    const [itemForm, setItemForm] = useState({ description: "", volume: 1, unit: "m2", unitPrice: 0, notes: "", categoryId: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        if (projectId) {
            fetchData();
        }
    }, [projectId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [prjRes, rabRes] = await Promise.all([
                projectService.getProjectById(projectId),
                rabService.getRabByProject(projectId).catch(() => ({ data: null }))
            ]);

            setProject(prjRes.data);
            setRabPlan(rabRes.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching RAB data:", err);
            setError("Gagal memuat data RAB. Pastikan server backend berjalan.");
            setLoading(false);
        }
    };

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
        try {
            await rabService.createRabPlan(projectId, planForm);
            setShowPlanModal(false);
            fetchData();
        } catch (err) {
            alert("Gagal membuat RAB Plan: " + (err.response?.data?.message || err.message));
        }
    };

    const handleSaveCategory = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await rabService.updateRabCategory(editId, categoryForm);
            } else {
                await rabService.createRabCategory(rabPlan.id, categoryForm);
            }
            setShowCategoryModal(false);
            setIsEditing(false);
            setEditId(null);
            fetchData();
        } catch (err) {
            alert("Gagal menyimpan kategori: " + (err.response?.data?.message || err.message));
        }
    };

    const handleSaveItem = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await rabService.updateRabItem(editId, itemForm);
            } else {
                await rabService.createRabItem(itemForm.categoryId, itemForm);
            }
            setShowItemModal(false);
            setIsEditing(false);
            setEditId(null);
            fetchData();
        } catch (err) {
            alert("Gagal menyimpan item: " + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Hapus kategori ini beserta seluruh item di dalamnya?")) return;
        try {
            await rabService.deleteRabCategory(id);
            fetchData();
        } catch (err) {
            alert("Gagal menghapus kategori: " + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm("Hapus item pekerjaan ini?")) return;
        try {
            await rabService.deleteRabItem(id);
            fetchData();
        } catch (err) {
            alert("Gagal menghapus item: " + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return <RoleDataState type="loading" message="Memuat detail RAB..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;
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
                        <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                            Kelola RAB: <span className="text-[var(--dashboard-primary)]">{project.projectCode}</span>
                        </h2>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold uppercase tracking-wide">{project.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[var(--dashboard-border)] rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[var(--dashboard-surface-soft)] transition-all shadow-sm">
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
                    <p className="text-sm text-[var(--dashboard-text-soft)] font-bold uppercase tracking-widest text-center max-w-md px-6 leading-relaxed">
                        Anda harus membuat Rencana Anggaran Biaya (RAB Plan) utama sebelum bisa memasukkan item pekerjaan.
                    </p>
                    <button 
                        onClick={() => setShowPlanModal(true)}
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
                                        <span className="opacity-70">JUMLAH KATEGORI</span>
                                        <span>{rabPlan.categories?.length || 0}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="opacity-70">TOTAL ITEM PEKERJAAN</span>
                                        <span>{rabPlan.categories?.reduce((a, b) => a + (b.items?.length || 0), 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold">
                                        <span className="opacity-70">STATUS RAB</span>
                                        <span className="bg-white/20 px-2 py-0.5 rounded-full uppercase">{rabPlan.status}</span>
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
                                        setIsEditing(false);
                                        setCategoryForm({ code: "", name: "", description: "", order: rabPlan.categories?.length || 0 });
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

                        <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                            <h4 className="text-[10px] font-black text-blue-700 uppercase mb-2 flex items-center gap-2"><FiInfo /> Sinkronisasi</h4>
                            <p className="text-[10px] text-blue-600 leading-relaxed font-medium">
                                Sistem akan otomatis mengupdate <b>Budget Total Proyek</b> di database setiap kali Anda mengubah item RAB.
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
                                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest">{formatCurrency(cat.subtotal)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => {
                                                        setItemForm({ ...itemForm, categoryId: cat.id, description: "", volume: 1, unit: "m2", unitPrice: 0 });
                                                        setIsEditing(false);
                                                        setShowItemModal(true);
                                                    }}
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors shadow-sm bg-white border border-emerald-100" title="Tambah Item"
                                                >
                                                    <FiPlus size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => {
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
                                                            <td className="py-4 px-6 text-xs font-bold leading-relaxed">{item.description}</td>
                                                            <td className="py-4 px-2 text-xs text-center font-black">{parseFloat(item.volume)}</td>
                                                            <td className="py-4 px-2 text-xs text-center uppercase font-bold text-[var(--dashboard-text-soft)]">{item.unit}</td>
                                                            <td className="py-4 px-6 text-xs text-right font-medium">{formatCurrency(item.unitPrice)}</td>
                                                            <td className="py-4 px-6 text-xs text-right font-black text-emerald-700">{formatCurrency(item.total)}</td>
                                                            <td className="py-4 px-6 text-right">
                                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <button 
                                                                        onClick={() => {
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
                                <p className="text-sm font-bold text-[var(--dashboard-text-soft)]">Daftar kategori kosong.</p>
                                <button 
                                    onClick={() => {
                                        setIsEditing(false);
                                        setCategoryForm({ code: "", name: "", description: "", order: 0 });
                                        setShowCategoryModal(true);
                                    }}
                                    className="mt-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-primary)] hover:underline"
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
                <Modal title="Buat RAB Plan" onClose={() => setShowPlanModal(false)}>
                    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                        <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-2">
                            <FiInfo /> Informasi Penting
                        </h4>
                        <ul className="text-[10px] text-amber-800 space-y-1 list-disc pl-4 font-medium leading-relaxed">
                            <li>RAB Plan adalah dokumen anggaran utama untuk proyek ini.</li>
                            <li>Setelah RAB Plan dibuat, Admin dapat menambahkan kategori dan item pekerjaan.</li>
                            <li>Total RAB akan dipakai sebagai budgetTotal project.</li>
                            <li>RAB ini masih Draft dan belum menjadi Change Order/final contract.</li>
                        </ul>
                    </div>
                    <form onSubmit={handleCreatePlan} className="space-y-4">
                        <Input 
                            label="Judul RAB" 
                            value={planForm.title} 
                            onChange={e => setPlanForm({...planForm, title: e.target.value})} 
                            placeholder={`Contoh: RAB Pembangunan - ${project?.name}`} 
                            required 
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Tipe" value={planForm.type} onChange={e => setPlanForm({...planForm, type: e.target.value})} placeholder="Pembangunan" />
                            <Input label="Versi" value={planForm.version} onChange={e => setPlanForm({...planForm, version: e.target.value})} placeholder="1.0" />
                        </div>
                        <TextArea label="Catatan (Opsional)" value={planForm.notes} onChange={e => setPlanForm({...planForm, notes: e.target.value})} placeholder="Tambahkan catatan jika diperlukan..." />
                        <SubmitButton label="Buat Plan Sekarang" />
                    </form>
                </Modal>
            )}

            {/* MODAL CATEGORY */}
            {showCategoryModal && (
                <Modal title={isEditing ? "Edit Kategori" : "Tambah Kategori"} onClose={() => setShowCategoryModal(false)}>
                    <form onSubmit={handleSaveCategory} className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <Input label="Kode" value={categoryForm.code} onChange={e => setCategoryForm({...categoryForm, code: e.target.value})} placeholder="01" required />
                            <div className="col-span-2">
                                <Input label="Nama Kategori" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} placeholder="Pekerjaan Persiapan" required />
                            </div>
                        </div>
                        <TextArea label="Deskripsi" value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} />
                        <SubmitButton label={isEditing ? "Perbarui" : "Simpan"} />
                    </form>
                </Modal>
            )}

            {/* MODAL ITEM */}
            {showItemModal && (
                <Modal title={isEditing ? "Edit Item" : "Tambah Item Pekerjaan"} onClose={() => setShowItemModal(false)}>
                    <form onSubmit={handleSaveItem} className="space-y-4">
                        <Input label="Deskripsi Pekerjaan" value={itemForm.description} onChange={e => setItemForm({...itemForm, description: e.target.value})} placeholder="Pemasangan Bowplank" required />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Volume" type="number" step="0.01" value={itemForm.volume} onChange={e => setItemForm({...itemForm, volume: e.target.value})} required />
                            <Input label="Satuan" value={itemForm.unit} onChange={e => setItemForm({...itemForm, unit: e.target.value})} placeholder="m2" required />
                        </div>
                        <Input label="Harga Satuan (Rp)" type="number" value={itemForm.unitPrice} onChange={e => setItemForm({...itemForm, unitPrice: e.target.value})} required />
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Total Item</span>
                            <span className="text-sm font-black text-emerald-700">{formatCurrency(itemForm.volume * itemForm.unitPrice)}</span>
                        </div>
                        <SubmitButton label={isEditing ? "Perbarui" : "Tambahkan"} />
                    </form>
                </Modal>
            )}
        </div>
    );
};

// UI HELPERS
const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-[var(--dashboard-border)]">
            <div className="p-6 border-b border-[var(--dashboard-border)] flex justify-between items-center bg-[var(--dashboard-surface-soft)]">
                <h3 className="font-black text-sm uppercase tracking-widest text-[var(--dashboard-primary)]">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all shadow-sm"><FiX /></button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

const Input = ({ label, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-1">{label}</label>
        <input {...props} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 transition-all font-bold" />
    </div>
);

const TextArea = ({ label, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 px-1">{label}</label>
        <textarea {...props} rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 transition-all font-bold" />
    </div>
);

const SubmitButton = ({ label }) => (
    <button type="submit" className="w-full py-4 bg-[var(--dashboard-primary)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4">
        <FiSave /> {label}
    </button>
);

export default DetailRabAdminPage;
