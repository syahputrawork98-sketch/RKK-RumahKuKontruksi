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

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [note, setNote] = useState("");

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

    const handleOpenDetail = async (id) => {
        try {
            setLoading(true);
            const response = await materialRequestService.getRequestById(id);
            if (response.success) {
                setSelectedRequest(response.data);
                setNote("");
            }
        } catch (err) {
            console.error("Failed to fetch detail:", err);
            alert("Gagal memuat detail pengajuan.");
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (newStatus) => {
        if (!selectedSupervisorId || !selectedRequest) return;
        
        setActionLoading(true);
        try {
            const response = await materialRequestService.updateStatus(selectedRequest.id, {
                status: newStatus,
                actorId: selectedSupervisorId,
                actorRole: 'SUPERVISOR',
                note: note || `Review Pengawas: ${newStatus === 'approved_by_supervisor' ? 'Disetujui' : 'Ditolak'}`
            });
            
            if (response.success) {
                setSelectedRequest(null);
                fetchRequests();
            } else {
                alert(response.message || "Gagal memperbarui status.");
            }
        } catch (err) {
            console.error("Action error:", err);
            alert("Terjadi kesalahan sistem.");
        } finally {
            setActionLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "submitted": return "bg-blue-500/10 text-blue-500";
            case "approved_by_supervisor": return "bg-emerald-500/10 text-emerald-500";
            case "approved_by_admin": return "bg-emerald-600/10 text-emerald-600";
            case "processing": return "bg-amber-500/10 text-amber-500";
            case "delivered": return "bg-indigo-500/10 text-indigo-500";
            case "received": 
            case "completed": return "bg-emerald-500 text-white";
            case "rejected":
            case "cancelled": return "bg-red-500/10 text-red-500";
            default: return "bg-slate-500/10 text-slate-500";
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
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">Verifikasi Material</h2>
                    <p className="text-xs text-slate-400 mt-1 italic font-medium">Pantau dan verifikasi permintaan logistik dari Mandor lapangan.</p>
                </div>
            </div>

            <div className="dashboard-card border-slate-200">
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Cari ID request, proyek, atau material..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-800/20"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {[
                            { id: 'all', label: 'Semua' },
                            { id: 'submitted', label: 'Perlu Review' },
                            { id: 'approved_by_supervisor', label: 'Sudah Diverifikasi' }
                        ].map(t => (
                            <button 
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    activeTab === t.id 
                                    ? "bg-slate-800 text-white shadow-lg shadow-slate-800/20" 
                                    : "bg-white border border-slate-200 text-slate-400 hover:border-slate-800"
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
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">ID & Proyek</th>
                                <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Material / Qty</th>
                                <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Mandor</th>
                                <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredRequests.length > 0 ? filteredRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">{req.requestCode}</span>
                                            <span className="text-xs font-bold text-slate-500 truncate max-w-[150px]">{req.project?.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-800">{req.items?.[0]?.materialName || 'N/A'}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">
                                                {req.items?.[0]?.requestedQty || 0} {req.items?.[0]?.unit}
                                                {req.items?.length > 1 && ` (+${req.items.length - 1} lainnya)`}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <StatusBadge type="material" status={req.status} />
                                    </td>
                                    <td className="py-4 px-4 text-[10px] font-black text-slate-800 uppercase">{req.foreman?.name || 'Mandor'}</td>
                                    <td className="py-4 px-4 text-right">
                                        <button 
                                            onClick={() => handleOpenDetail(req.id)}
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                        >
                                            {req.status === 'submitted' ? 'TINJAU' : 'DETAIL'}
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <FiPackage size={40} className="mx-auto text-slate-100 mb-4" />
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-300">Tidak ada permintaan material.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedRequest(null)}></div>
                    <div className="relative w-full max-w-xl bg-white h-full shadow-2xl animate-slideInRight flex flex-col border-l border-slate-100">
                        <div className="p-8 border-b flex items-center justify-between bg-white relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50">
                                    <FiPackage size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-800">{selectedRequest.requestCode}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">Detail Verifikasi Lapangan</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedRequest(null)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-800 transition-all border border-slate-100">
                                <FiChevronRight size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            {/* Project Info */}
                            <div className="space-y-4 animate-fadeIn">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Informasi Proyek</h4>
                                <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Nama Proyek</p>
                                        <p className="text-xs font-black text-slate-800">{selectedRequest.project?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Mandor Lapangan</p>
                                        <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{selectedRequest.foreman?.name}</p>
                                    </div>
                                    <div className="col-span-2 pt-2 border-t border-slate-50">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Status Proyek</p>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            selectedRequest.project?.status === 'Berjalan' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                        }`}>
                                            {selectedRequest.project?.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Item List */}
                            <div className="space-y-4 animate-fadeIn">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Daftar Material & Validasi RAB</h4>
                                <div className="space-y-4">
                                    {selectedRequest.items?.map((item, idx) => {
                                        const isOverLimit = item.rabItemId && (parseFloat(item.requestedQty) > parseFloat(item.remainingRabQty));
                                        return (
                                            <div key={idx} className={`p-6 rounded-[2.5rem] border transition-all hover:shadow-md relative overflow-hidden ${isOverLimit ? 'bg-white border-red-200' : 'bg-white border-slate-100'}`}>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <p className="text-sm font-black text-slate-800">{item.materialName}</p>
                                                        {item.rabItem ? (
                                                            <div className="flex items-center gap-1.5 mt-1">
                                                                <FiCheckCircle className="text-emerald-500" size={10} />
                                                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Linked to RAB Alokasi</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1.5 mt-1">
                                                                <FiAlertCircle className="text-amber-500" size={10} />
                                                                <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest italic">Manual Request (Bukan Item RAB)</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-black text-slate-800">{item.requestedQty} <span className="text-[10px] uppercase text-slate-400">{item.unit}</span></p>
                                                    </div>
                                                </div>

                                                {item.rabItem && (
                                                    <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50/50 rounded-3xl border border-slate-100 mt-4 shadow-inner">
                                                        <div className="text-center">
                                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total RAB</p>
                                                            <p className="text-[11px] font-black text-slate-700">{item.rabItem.volume} <span className="text-[8px] opacity-50 uppercase">{item.unit}</span></p>
                                                        </div>
                                                        <div className="text-center border-x border-slate-200/50">
                                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Disetujui</p>
                                                            <p className="text-[11px] font-black text-slate-700">{item.totalApprovedQty} <span className="text-[8px] opacity-50 uppercase">{item.unit}</span></p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Sisa Kuota</p>
                                                            <p className={`text-[11px] font-black ${isOverLimit ? 'text-red-500' : 'text-emerald-600'}`}>
                                                                {item.remainingRabQty} <span className="text-[8px] opacity-50 uppercase">{item.unit}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {isOverLimit && (
                                                    <div className="mt-4 flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100 animate-pulse">
                                                        <FiAlertCircle className="text-red-500 flex-shrink-0" size={16} />
                                                        <div>
                                                            <p className="text-[10px] font-black text-red-700 uppercase tracking-[0.1em]">Over-allocation Alert!</p>
                                                            <p className="text-[9px] font-bold text-red-600 uppercase mt-0.5 leading-none">Jumlah permintaan melebihi sisa alokasi RAB untuk item ini.</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {item.note && (
                                                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-start gap-2">
                                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-0.5 flex-shrink-0 italic">Ket:</span>
                                                        <p className="text-[10px] text-slate-500 font-medium italic leading-relaxed">{item.note}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="space-y-4 animate-fadeIn">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Alasan Pengajuan</h4>
                                <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm italic">
                                    <p className="text-xs text-slate-600 font-medium leading-relaxed">"{selectedRequest.reason || 'Tidak ada alasan spesifik yang diberikan.'}"</p>
                                </div>
                            </div>

                            {/* History */}
                            <div className="space-y-4 animate-fadeIn">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Riwayat Status</h4>
                                <div className="space-y-4 relative before:absolute before:left-2.5 before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100 ml-2">
                                    {selectedRequest.history?.map((h, idx) => (
                                        <div key={idx} className="relative pl-8 animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
                                            <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-white border-[3px] border-slate-200 shadow-sm"></div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm border ${getStatusStyle(h.newStatus)}`}>
                                                    {h.newStatus?.replace(/_/g, ' ')}
                                                </span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{new Date(h.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                            </div>
                                            <div className="mt-2 bg-white/50 p-3 rounded-2xl border border-slate-50 shadow-sm">
                                                <p className="text-[10px] font-medium text-slate-600 italic">"{h.note || 'Tidak ada catatan'}"</p>
                                                <p className="text-[9px] font-black text-slate-300 uppercase mt-1">Oleh: {h.actorRole}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-8 border-t bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.02)] space-y-6">
                            <div className="relative group">
                                <textarea 
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Tambah catatan verifikasi lapangan..."
                                    className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/10 focus:bg-white transition-all resize-none shadow-inner h-24"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {selectedRequest.status === 'submitted' ? (
                                    <>
                                        <button 
                                            onClick={() => handleAction('approved_by_supervisor')}
                                            disabled={actionLoading}
                                            className="py-5 bg-emerald-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-700 active:scale-95 transition-all shadow-xl shadow-emerald-600/20 disabled:opacity-30 disabled:grayscale"
                                        >
                                            {actionLoading ? "Memproses..." : "Setujui Request"}
                                        </button>
                                        <button 
                                            onClick={() => handleAction('rejected')}
                                            disabled={actionLoading}
                                            className="py-5 bg-white border-2 border-red-500 text-red-600 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-red-50 active:scale-95 transition-all"
                                        >
                                            Tolak Request
                                        </button>
                                    </>
                                ) : (
                                    <div className="col-span-2 p-5 bg-slate-50 rounded-[2rem] text-center border border-slate-100 border-dashed">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Status Saat Ini: {selectedRequest.status.replace(/_/g, ' ')}</p>
                                        <p className="text-[9px] text-slate-400 font-medium mt-1">Hanya Admin yang dapat melanjutkan proses pengadaan lebih lanjut.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestMaterialPengawasPage;
        </div>
    );
};

export default RequestMaterialPengawasPage;
