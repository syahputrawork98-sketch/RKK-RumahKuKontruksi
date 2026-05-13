import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft,
    FiAlertCircle, 
    FiFileText,
    FiInfo,
    FiUpload
} from "react-icons/fi";
import projectService from "../../services/projectService";
import rabService from "../../services/rabService";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";

// Modular Components
import RabSummarySidebar from "../../components/admin/rab/RabSummarySidebar";
import RabCategorySection from "../../components/admin/rab/RabCategorySection";
import RabPlanModal from "../../components/admin/rab/RabPlanModal";
import RabCategoryModal from "../../components/admin/rab/RabCategoryModal";
import RabItemModal from "../../components/admin/rab/RabItemModal";
import RabImportCsvModal from "../../components/admin/rab/RabImportCsvModal";
import ConfirmActionModal from "../../components/admin/rab/ConfirmActionModal";

const DetailRabAdminPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { selectedAdminId } = useAdminPersona();
    
    // UI States
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showItemModal, setShowItemModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState({ show: false, title: "", message: "", onConfirm: null });
    
    // Data States
    const [project, setProject] = useState(null);
    const [rabPlan, setRabPlan] = useState(null);
    
    // Form States
    const [planForm, setPlanForm] = useState({ title: "Draft RAB", type: "Pembangunan", version: "1.0", notes: "" });
    const [categoryForm, setCategoryForm] = useState({ code: "", name: "", description: "", order: 0 });
    const [itemForm, setItemForm] = useState({ description: "", volume: 1, unit: "m2", unitPrice: 0, location: "", notes: "", categoryId: "" });
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
    
    const handleImportCsv = async (items) => {
        try {
            setSubmitting(true);
            setFormError(null);
            await rabService.importItems(rabPlan.id, items, { adminId: selectedAdminId });
            setShowImportModal(false);
            fetchData();
        } catch (err) {
            setFormError(err.response?.data?.message || "Gagal mengimport data CSV.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteCategory = (id) => {
        setFormError(null);
        setShowConfirmModal({
            show: true,
            title: "Hapus Kategori",
            message: "Hapus kategori kosong ini? Kategori yang masih memiliki item tidak dapat dihapus.",
            onConfirm: async () => {
                try {
                    setFormError(null);
                    setSubmitting(true);
                    await rabService.deleteRabCategory(id, { adminId: selectedAdminId });
                    fetchData();
                    setShowConfirmModal({ show: false });
                } catch (err) {
                    const msg = err.response?.data?.message || err.message;
                    setFormError(msg);
                } finally {
                    setSubmitting(false);
                }
            }
        });
    };

    const handleDeleteItem = (id) => {
        setFormError(null);
        setShowConfirmModal({
            show: true,
            title: "Hapus Item",
            message: "Hapus item pekerjaan ini? Item yang sudah digunakan dalam transaksi lapangan tidak dapat dihapus.",
            onConfirm: async () => {
                try {
                    setFormError(null);
                    setSubmitting(true);
                    await rabService.deleteRabItem(id, { adminId: selectedAdminId });
                    fetchData();
                    setShowConfirmModal({ show: false });
                } catch (err) {
                    const msg = err.response?.data?.message || err.message;
                    setFormError(msg);
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
                        Anda tidak memiliki izin untuk melihat RAB proyek ini. Proyek ini bukan di bawah tanggung jawab persona Anda.
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
                    <div className="flex flex-col items-end">
                        <span className="px-3 py-1 bg-amber-100 text-amber-600 text-[8px] font-black uppercase tracking-widest rounded-full border border-amber-200 flex items-center gap-1.5 mb-2">
                            <FiInfo /> Local Builder Mode
                        </span>
                        <p className="text-[9px] text-slate-400 font-bold italic text-right max-w-[200px] leading-tight">
                            RAB draft lokal, bukan kontrak final. Menjadi acuan scope pekerjaan lokal. Perubahan RAB tidak mengubah progress resmi proyek.
                        </p>
                    </div>
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
                        <button 
                            onClick={() => {
                                setFormError(null);
                                setPlanForm({ title: `RAB Plan - ${project.name}`, type: "Pembangunan", version: "1.0", notes: "" });
                                setShowPlanModal(true);
                            }}
                            className="w-full py-4 bg-[var(--dashboard-primary)] text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Buat RAB Plan Pertama
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <RabSummarySidebar 
                        rabPlan={rabPlan}
                        project={project}
                        onAddCategory={() => {
                            setFormError(null);
                            setIsEditing(false);
                            setCategoryForm({ code: "", name: "", description: "", order: (rabPlan.categories?.length || 0) + 1 });
                            setShowCategoryModal(true);
                        }}
                        onImportCsv={() => {
                            setFormError(null);
                            setShowImportModal(true);
                        }}
                        onRefresh={fetchData}
                    />

                    <div className="lg:col-span-3 space-y-6">
                        <RabCategorySection 
                            categories={rabPlan.categories}
                            onEditCategory={(cat) => {
                                setFormError(null);
                                setIsEditing(true);
                                setEditId(cat.id);
                                setCategoryForm({ code: cat.code, name: cat.name, description: cat.description || "", order: cat.order });
                                setShowCategoryModal(true);
                            }}
                            onDeleteCategory={handleDeleteCategory}
                            onAddItem={(catId) => {
                                setFormError(null);
                                setIsEditing(false);
                                setItemForm({ description: "", volume: 1, unit: "m2", unitPrice: 0, location: "", notes: "", categoryId: catId });
                                setShowItemModal(true);
                            }}
                            onEditItem={(item, catId) => {
                                setFormError(null);
                                setIsEditing(true);
                                setEditId(item.id);
                                setItemForm({ 
                                    description: item.description, 
                                    volume: parseFloat(item.volume), 
                                    unit: item.unit, 
                                    unitPrice: parseFloat(item.unitPrice), 
                                    location: item.location || "", 
                                    notes: item.notes || "", 
                                    categoryId: catId 
                                });
                                setShowItemModal(true);
                            }}
                            onDeleteItem={handleDeleteItem}
                            onAddCategoryFirst={() => {
                                setFormError(null);
                                setIsEditing(false);
                                setCategoryForm({ code: "01", name: "", description: "", order: 1 });
                                setShowCategoryModal(true);
                            }}
                        />
                    </div>
                </div>
            )}

            <RabPlanModal 
                isOpen={showPlanModal}
                onClose={() => setShowPlanModal(false)}
                planForm={planForm}
                setPlanForm={setPlanForm}
                onSubmit={handleCreatePlan}
                submitting={submitting}
                formError={formError}
                project={project}
            />

            <RabCategoryModal 
                isOpen={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                isEditing={isEditing}
                categoryForm={categoryForm}
                setCategoryForm={setCategoryForm}
                onSubmit={handleSaveCategory}
                submitting={submitting}
                formError={formError}
            />

            <RabItemModal 
                isOpen={showItemModal}
                onClose={() => setShowItemModal(false)}
                isEditing={isEditing}
                itemForm={itemForm}
                setItemForm={setItemForm}
                onSubmit={handleSaveItem}
                submitting={submitting}
                formError={formError}
            />

            <RabImportCsvModal 
                isOpen={showImportModal}
                onClose={() => setShowImportModal(false)}
                onImport={handleImportCsv}
                submitting={submitting}
            />

            <ConfirmActionModal 
                {...showConfirmModal}
                onClose={() => setShowConfirmModal({ show: false })}
                submitting={submitting}
                formError={formError}
            />
        </div>
    );
};

export default DetailRabAdminPage;
