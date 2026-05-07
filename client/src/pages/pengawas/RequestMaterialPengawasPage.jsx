import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiChevronRight, FiClock, FiCheckCircle, FiPackage, FiTruck, FiAlertCircle } from "react-icons/fi";
import materialRequestService from "../../services/materialRequestService";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";

const RequestMaterialPengawasPage = () => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    const fetchRequests = async () => {
        if (!selectedSupervisorId) return;
        setLoading(true);
        const params = {
            supervisorId: selectedSupervisorId,
            ...(activeTab !== 'all' && { status: activeTab })
        };
        const response = await materialRequestService.getAllRequests(params);
        if (response.success) {
            setRequests(response.data);
        }
        setLoading(false);
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
        const response = await materialRequestService.updateStatus(id, {
            status: 'approved_by_supervisor',
            actorId: selectedSupervisorId,
            actorRole: 'SUPERVISOR',
            note: 'Verifikasi lapangan oke.'
        });
        if (response.success) fetchRequests();
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Verifikasi Material</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pantau dan verifikasi permintaan logistik dari Mandor.</p>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari ID request atau material..." 
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'submitted', 'approved_by_supervisor'].map(t => (
                            <button 
                                key={t}
                                onClick={() => setActiveTab(t)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    activeTab === t 
                                    ? "bg-[var(--dashboard-primary)] text-white border-[var(--dashboard-primary)]" 
                                    : "bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] text-[var(--dashboard-text-soft)]"
                                }`}
                            >
                                {t === 'all' ? 'Semua' : t === 'submitted' ? 'Baru' : 'Approved'}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-[var(--dashboard-primary)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
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
                                {requests.map((req) => (
                                    <tr key={req.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                        <td className="py-4 px-2">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter">{req.requestCode}</span>
                                                <span className="text-xs font-bold truncate max-w-[120px]">{req.project?.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">{req.items?.[0]?.materialName}</span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)] font-black uppercase tracking-tighter">
                                                    {req.items?.[0]?.requestedQty} {req.items?.[0]?.unit}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${getStatusStyle(req.status)}`}>
                                                {req.status.replace(/_/g, ' ')}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">{req.foreman?.name}</td>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestMaterialPengawasPage;
