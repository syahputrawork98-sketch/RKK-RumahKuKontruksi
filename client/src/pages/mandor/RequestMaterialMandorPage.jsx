import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiFilter, FiChevronRight, FiClock, FiCheckCircle, FiPackage, FiTruck, FiAlertCircle } from "react-icons/fi";
import MaterialRequestForm from "./components/MaterialRequestForm";
import materialRequestService from "../../services/materialRequestService";
import { useForemanPersona } from "../../context/ForemanPersonaContext";

const RequestMaterialMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [activeSubtab, setActiveSubtab] = useState("all");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const subtabs = [
        { id: "all", label: "Semua" },
        { id: "submitted", label: "Diajukan" },
        { id: "processing", label: "Diproses" },
        { id: "delivered", label: "Dikirim" },
        { id: "received", label: "Diterima" },
    ];

    const fetchRequests = async () => {
        if (!selectedForemanId) return;
        setLoading(true);
        const params = {
            foremanId: selectedForemanId,
            ...(activeSubtab !== 'all' && { status: activeSubtab })
        };
        const response = await materialRequestService.getAllRequests(params);
        if (response.success) {
            setRequests(response.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedForemanId, activeSubtab]);

    const getStatusInfo = (status) => {
        switch (status) {
            case 'draft': return { label: 'Draft', color: 'bg-slate-500/10 text-slate-500', icon: <FiClock /> };
            case 'submitted': return { label: 'Diajukan', color: 'bg-blue-500/10 text-blue-500', icon: <FiClock /> };
            case 'approved_by_supervisor': return { label: 'Disetujui Pengawas', color: 'bg-emerald-500/10 text-emerald-500', icon: <FiCheckCircle /> };
            case 'approved_by_admin': return { label: 'Disetujui Admin', color: 'bg-emerald-600/10 text-emerald-600', icon: <FiCheckCircle /> };
            case 'processing': return { label: 'Diproses', color: 'bg-amber-500/10 text-amber-500', icon: <FiPackage /> };
            case 'delivered': return { label: 'Dikirim', color: 'bg-indigo-500/10 text-indigo-500', icon: <FiTruck /> };
            case 'received': return { label: 'Diterima', color: 'bg-emerald-500 text-white', icon: <FiCheckCircle /> };
            case 'completed': return { label: 'Selesai', color: 'bg-emerald-700 text-white', icon: <FiCheckCircle /> };
            case 'rejected': return { label: 'Ditolak', color: 'bg-red-500/10 text-red-500', icon: <FiAlertCircle /> };
            default: return { label: status, color: 'bg-slate-500/10 text-slate-500', icon: <FiClock /> };
        }
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Request Material</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pengajuan kebutuhan logistik dan material ke Pengawas/Admin.</p>
                </div>
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                >
                    <FiPlus /> Buat Request Baru
                </button>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {subtabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubtab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            activeSubtab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="dashboard-card min-h-[400px]">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari material atau ID request..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold">
                        <FiFilter /> Filter
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-[var(--dashboard-primary)]/20 border-t-[var(--dashboard-primary)] rounded-full animate-spin"></div>
                        <p className="text-xs font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest">Memuat data...</p>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                        <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center text-[var(--dashboard-text-soft)]">
                            <FiPackage size={32} />
                        </div>
                        <div>
                            <p className="text-sm font-bold">Belum ada pengajuan material</p>
                            <p className="text-[10px] text-[var(--dashboard-text-soft)] mt-1">Gunakan tombol 'Buat Request Baru' untuk memulai.</p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-left">
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-4">ID & Proyek</th>
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-4">Material Utama</th>
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-4">Tgl Butuh</th>
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-4">Status</th>
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req) => {
                                    const statusInfo = getStatusInfo(req.status);
                                    return (
                                        <tr key={req.id} className="group transition-all">
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)]/50 rounded-l-2xl border-y border-l border-[var(--dashboard-border)] group-hover:border-[var(--dashboard-primary)]/30 group-hover:bg-[var(--dashboard-surface-soft)] transition-all">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter">{req.requestCode}</span>
                                                    <span className="text-xs font-bold text-[var(--dashboard-text)] truncate max-w-[150px]">{req.project?.name || 'Proyek'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)]/50 border-y border-[var(--dashboard-border)] group-hover:border-[var(--dashboard-primary)]/30 group-hover:bg-[var(--dashboard-surface-soft)] transition-all">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[var(--dashboard-text)]">
                                                        {req.items?.[0]?.materialName || 'Material'} 
                                                        {req.items?.length > 1 && <span className="ml-1 text-[10px] text-[var(--dashboard-primary)]">+{req.items.length - 1} lainnya</span>}
                                                    </span>
                                                    <span className="text-[10px] font-black text-[var(--dashboard-text-soft)] uppercase italic truncate max-w-[200px]">
                                                        "{req.reason || 'Tanpa alasan'}"
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)]/50 border-y border-[var(--dashboard-border)] group-hover:border-[var(--dashboard-primary)]/30 group-hover:bg-[var(--dashboard-surface-soft)] transition-all">
                                                <span className="text-xs font-bold">
                                                    {req.neededDate ? new Date(req.neededDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '-'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)]/50 border-y border-[var(--dashboard-border)] group-hover:border-[var(--dashboard-primary)]/30 group-hover:bg-[var(--dashboard-surface-soft)] transition-all">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${statusInfo.color}`}>
                                                    {statusInfo.icon}
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)]/50 rounded-r-2xl border-y border-r border-[var(--dashboard-border)] group-hover:border-[var(--dashboard-primary)]/30 group-hover:bg-[var(--dashboard-surface-soft)] transition-all text-right">
                                                <button className="p-2 hover:bg-[var(--dashboard-primary)]/10 rounded-full text-[var(--dashboard-primary)] transition-all">
                                                    <FiChevronRight size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL FORM */}
            {isFormOpen && (
                <MaterialRequestForm 
                    onClose={() => setIsFormOpen(false)} 
                    onSuccess={() => {
                        setIsFormOpen(false);
                        fetchRequests();
                    }}
                />
            )}
        </div>
    );
};

export default RequestMaterialMandorPage;
