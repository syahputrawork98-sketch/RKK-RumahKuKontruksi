import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiChevronRight, FiClock, FiCheckCircle, FiPackage, FiTruck, FiAlertCircle } from "react-icons/fi";
import materialRequestService from "../../services/materialRequestService";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import StatusBadge from "../../components/common/StatusBadge";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const RequestMaterialPengawasPage = () => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchRequests = async () => {
        if (!selectedSupervisorId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const params = {
                supervisorId: selectedSupervisorId,
                ...(activeTab !== 'all' && { status: activeTab })
            };
            const response = await materialRequestService.getAllRequests(params);
            if (response.success) {
                setRequests(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch material requests:", err);
            setError("Gagal memuat daftar permintaan material.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedSupervisorId, activeTab]);

    const getStatusStyle = (status) => {
        switch (status) {
            case "submitted": return "bg-blue-500/10 text-blue-500";
            case "approved_by_supervisor": return "bg-emerald-500/10 text-emerald-500";
            case "processing": return "bg-amber-500/10 text-amber-500";
            case "delivered": return "bg-indigo-500/10 text-indigo-500";
            case "received": return "bg-emerald-500 text-white";
            case "rejected": return "bg-red-500/10 text-red-500";
            default: return "bg-slate-500/10 text-slate-500";
        }
    };

    const handleApprove = async (id) => {
        if (!window.confirm("Setujui pengajuan material ini ke Admin?")) return;
        try {
            const response = await materialRequestService.updateStatus(id, {
                status: 'approved_by_supervisor',
                actorId: selectedSupervisorId,
                actorRole: 'SUPERVISOR',
                note: 'Verifikasi lapangan oke.'
            });
            if (response.success) fetchRequests();
        } catch (err) {
            alert(err.response?.data?.message || "Gagal menyetujui request.");
        }
    };

    const filteredRequests = (requests || []).filter(req => 
        (req.requestCode || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (req.project?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (req.items?.[0]?.materialName || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!selectedSupervisorId && !loading) {
        return (
            <RolePersonaEmptyState 
                description="Pilih akun Pengawas untuk memverifikasi permintaan material dari Mandor."
            />
        );
    }

    if (loading && requests.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={fetchRequests}
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Verifikasi Material</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pantau dan verifikasi permintaan logistik dari Mandor.</p>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari ID request, proyek, atau material..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {[
                            { id: 'all', label: 'Semua' },
                            { id: 'submitted', label: 'Baru' },
                            { id: 'approved_by_supervisor', label: 'Approved' }
                        ].map(t => (
                            <button 
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                                    activeTab === t.id 
                                    ? "bg-[var(--dashboard-primary)] text-white border-[var(--dashboard-primary)]" 
                                    : "bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] text-[var(--dashboard-text-soft)]"
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)]">
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">ID & Proyek</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Material / Qty</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Mandor</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.length > 0 ? filteredRequests.map((req) => (
                                <tr key={req.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter">{req.requestCode}</span>
                                            <span className="text-xs font-bold truncate max-w-[120px]">{req.project?.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">{req.items?.[0]?.materialName || 'N/A'}</span>
                                            <span className="text-[10px] text-[var(--dashboard-text-soft)] font-black uppercase tracking-tighter">
                                                {req.items?.[0]?.requestedQty || 0} {req.items?.[0]?.unit}
                                                {req.items?.length > 1 && ` (+${req.items.length - 1} lainnya)`}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <StatusBadge type="material" status={req.status} />
                                    </td>
                                    <td className="py-4 px-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">{req.foreman?.name || 'Mandor'}</td>
                                    <td className="py-4 px-2 text-right space-x-2">
                                        {req.status === 'submitted' && (
                                            <button 
                                                onClick={() => handleApprove(req.id)}
                                                className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        <button className="text-[10px] font-black text-[var(--dashboard-primary)] hover:underline uppercase">Detail</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-slate-400 font-medium italic border-2 border-dashed border-slate-50 rounded-2xl">
                                        Tidak ada permintaan material yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RequestMaterialPengawasPage;
