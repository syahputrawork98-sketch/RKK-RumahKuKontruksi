import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPrinter, FiDownload, FiPlus, FiAlertCircle } from "react-icons/fi";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";

const DetailRabAdminPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [rabItems, setRabItems] = useState([]);

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
                projectService.getProjectRab(projectId)
            ]);

            setProject(prjRes.data);
            setRabItems(rabRes.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching RAB data:", err);
            setError("Gagal memuat data RAB. Pastikan proyek sudah memiliki budget terdaftar.");
            setLoading(false);
        }
    };

    if (loading) return <RoleDataState type="loading" message="Memuat detail RAB..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;
    if (!project) return <RoleDataState type="empty" message="Proyek tidak ditemukan." />;

    // For now, group items by a virtual category if no category is provided
    const categories = rabItems.length > 0 ? [
        {
            name: "DETAIL PEKERJAAN PROYEK",
            items: rabItems
        }
    ] : [];

    const totalRab = rabItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/admin/rab")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-xl font-black tracking-tight">Detail RAB: {project.projectCode}</h2>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold uppercase tracking-wide">{project.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold"><FiPrinter /> Cetak</button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-bold shadow-lg shadow-[var(--dashboard-primary)]/20"><FiDownload /> Export Excel</button>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="flex justify-between items-center mb-8 bg-[var(--dashboard-surface-soft)] p-6 rounded-2xl border border-[var(--dashboard-border)]">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Total RAB (Database)</p>
                        <h3 className="text-3xl font-black text-emerald-600 mt-1">
                            {totalRab > 0 ? `Rp ${totalRab.toLocaleString("id-ID")}` : `Rp ${(project.budget || 0).toLocaleString("id-ID")}`}
                        </h3>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                        <FiPlus /> Tambah Item
                    </button>
                </div>

                {categories.length > 0 ? (
                    <div className="space-y-10">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="space-y-4">
                                <div className="flex items-center justify-between border-b-2 border-[var(--dashboard-primary)]/20 pb-2">
                                    <h4 className="text-sm font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{cat.name}</h4>
                                    <span className="text-xs font-black">Subtotal: Rp {cat.items.reduce((a, b) => a + (b.totalPrice || 0), 0).toLocaleString("id-ID")}</span>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-[10px] font-black uppercase tracking-tighter text-[var(--dashboard-text-soft)]">
                                                <th className="py-2 px-2">Nama Item Pekerjaan</th>
                                                <th className="py-2 px-2 text-center">Volume</th>
                                                <th className="py-2 px-2 text-center">Satuan</th>
                                                <th className="py-2 px-2 text-right">Harga Satuan</th>
                                                <th className="py-2 px-2 text-right">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cat.items.map((item, iidx) => (
                                                <tr key={iidx} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/30 transition-colors">
                                                    <td className="py-3 px-2 text-xs font-bold">{item.taskName || item.name}</td>
                                                    <td className="py-3 px-2 text-xs text-center font-bold">{item.volume || item.vol}</td>
                                                    <td className="py-3 px-2 text-xs text-center uppercase font-bold text-[var(--dashboard-text-soft)]">{item.unit || item.sat}</td>
                                                    <td className="py-3 px-2 text-xs text-right font-medium">Rp {(item.unitPrice || 0).toLocaleString("id-ID")}</td>
                                                    <td className="py-3 px-2 text-xs text-right font-black">Rp {(item.totalPrice || 0).toLocaleString("id-ID")}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-[var(--dashboard-surface-soft)]/30 rounded-3xl border border-dashed border-[var(--dashboard-border)]">
                        <FiAlertCircle size={48} className="text-amber-500 mb-4 opacity-50" />
                        <p className="text-sm font-bold text-[var(--dashboard-text-soft)]">RAB Detail belum disusun untuk proyek ini.</p>
                        <p className="text-[10px] mt-2 uppercase tracking-widest font-black text-[var(--dashboard-text-soft)] opacity-70">Gunakan tombol "Tambah Item" untuk memulai.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailRabAdminPage;
