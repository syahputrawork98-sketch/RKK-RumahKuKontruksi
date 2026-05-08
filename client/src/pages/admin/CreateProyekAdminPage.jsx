import React, { useState, useEffect } from "react";
import { FiSave, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import customerService from "../../services/customerService";
import supervisorService from "../../services/supervisorService";
import foremanService from "../../services/foremanService";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";
import { useAdminPersona } from "../../context/AdminPersonaContext";

const CreateProyekAdminPage = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const { selectedAdminId, selectedAdmin } = useAdminPersona();
    const [loading, setLoading] = useState(false);
    
    const [options, setOptions] = useState({
        customers: [],
        supervisors: [],
        foremen: []
    });

    const [formData, setFormData] = useState({
        projectCode: `PRJ-${Date.now().toString().slice(-6)}`,
        name: "",
        customerId: "",
        adminId: selectedAdminId || "",
        supervisorId: "",
        foremanId: "",
        location: "",
        type: "Pembangunan",
        status: "Persiapan",
        budgetTotal: 0,
        startDate: "",
        estimatedEndDate: "",
        note: ""
    });

    useEffect(() => {
        if (selectedAdminId) {
            setFormData(prev => ({ ...prev, adminId: selectedAdminId }));
        }
    }, [selectedAdminId]);

    useEffect(() => {
        fetchOptions();
    }, []);

    if (!selectedAdminId) {
        return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    }

    const fetchOptions = async () => {
        try {
            setLoading(true);
            const [custRes, supRes, forRes] = await Promise.all([
                customerService.getAllCustomers(),
                supervisorService.getAllSupervisors(),
                foremanService.getAllForemen()
            ]);

            setOptions({
                customers: custRes.data || [],
                supervisors: supRes.data || [],
                foremen: forRes.data || []
            });
            setLoading(false);
        } catch (err) {
            console.error("Error fetching options:", err);
            setError("Gagal memuat data pilihan (Customer/Tim).");
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            
            // Convert types
            const payload = {
                ...formData,
                adminId: selectedAdminId,
                customerId: formData.customerId,
                supervisorId: formData.supervisorId || null,
                foremanId: formData.foremanId || null,
                budgetTotal: parseFloat(formData.budgetTotal),
                progress: parseInt(formData.progress),
                remainingAmount: parseFloat(formData.budgetTotal),
                paidAmount: 0
            };

            await projectService.createProject(payload);
            alert("Proyek Berhasil Dibuat!");
            navigate("/admin/proyek");
        } catch (err) {
            console.error("Error creating project:", err);
            alert("Gagal membuat proyek: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    if (!selectedAdminId) return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    if (loading) return <RoleDataState type="loading" message="Menyiapkan formulir..." />;

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate("/admin/proyek")}
                    className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                >
                    <FiArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Buat Proyek Baru</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] italic">Inisialisasi data proyek konstruksi baru.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="dashboard-card space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Kode Proyek</label>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.projectCode}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    onChange={(e) => setFormData({...formData, projectCode: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Nama Proyek</label>
                                <input 
                                    required
                                    type="text" 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    placeholder="Contoh: Renovasi Rumah Pak Agus"
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Customer</label>
                                <select 
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    onChange={(e) => setFormData({...formData, customerId: e.target.value})}
                                >
                                    <option value="">Pilih Customer...</option>
                                    {options.customers.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Estimasi Budget (Rp)</label>
                                <input 
                                    required
                                    type="number" 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    placeholder="Contoh: 500000000"
                                    value={formData.budgetTotal}
                                    onChange={(e) => setFormData({...formData, budgetTotal: e.target.value})}
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Pengawas (Supervisor)</label>
                                <select 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    onChange={(e) => setFormData({...formData, supervisorId: e.target.value})}
                                >
                                    <option value="">Belum Ditugaskan</option>
                                    {options.supervisors.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Mandor (Foreman)</label>
                                <select 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    onChange={(e) => setFormData({...formData, foremanId: e.target.value})}
                                >
                                    <option value="">Belum Ditugaskan</option>
                                    {options.foremen.map(f => (
                                        <option key={f.id} value={f.id}>{f.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Tanggal Estimasi Mulai</label>
                                <input 
                                    required
                                    type="date" 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Estimasi Selesai</label>
                                <input 
                                    type="date" 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[var(--dashboard-border)] flex justify-end">
                            <button 
                                type="submit"
                                disabled={submitting}
                                className={`
                                    flex items-center gap-2 px-8 py-3 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all
                                    ${submitting ? "opacity-50 cursor-not-allowed" : ""}
                                `}
                            >
                                <FiSave />
                                {submitting ? "Menyimpan..." : "Simpan Proyek"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card border-l-4 border-amber-500 bg-amber-500/5">
                        <div className="flex gap-3">
                            <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider">Penting</h4>
                                <p className="text-[10px] leading-relaxed text-amber-700 font-medium">
                                    Proyek ini akan otomatis didaftarkan di bawah kendali Admin: <b>{selectedAdmin?.name || "Persona Aktif"}</b>.
                                </p>
                                <p className="text-[10px] leading-relaxed text-amber-700 font-medium">
                                    Input budget hanya berupa estimasi kotor; RAB detail akan disusun di modul terpisah. Penugasan tim bisa diubah nanti di modul Penugasan Tim.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProyekAdminPage;
