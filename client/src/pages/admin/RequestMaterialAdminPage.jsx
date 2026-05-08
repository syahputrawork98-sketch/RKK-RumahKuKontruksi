import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiChevronRight, FiClock, FiCheckCircle, FiPackage, FiTruck, FiAlertCircle } from "react-icons/fi";
import materialRequestService from "../../services/materialRequestService";
import StatusBadge from "../../components/common/StatusBadge";
import { useAdminPersona } from "../../context/AdminPersonaContext";

const RequestMaterialAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [note, setNote] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchRequests = async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const params = {
            adminId: selectedAdminId,
            ...(activeTab !== 'all' && { status: activeTab })
        };
        const response = await materialRequestService.getAllRequests(params);
        if (response.success) {
            setRequests(Array.isArray(response.data) ? response.data : []);
        } else {
            setRequests([]);
        }
        setLoading(false);
    };

    const filteredRequests = (requests || []).filter(req => {
        if (!req) return false;
        const matchesSearch = 
            (req.requestCode?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            req.items?.some(item => (item.materialName?.toLowerCase() || "").includes(searchQuery.toLowerCase())) ||
            (req.project?.name?.toLowerCase() || "").includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    useEffect(() => {
        fetchRequests();
    }, [activeTab, selectedAdminId]);

    const handleOpenDetail = async (id) => {
        const response = await materialRequestService.getRequestById(id, { adminId: selectedAdminId });
        if (response.success) {
            setSelectedRequest(response.data);
            setNote("");
        }
    };

    const handleAction = async (newStatus) => {
        if (!selectedAdminId || !selectedRequest) return;
        
        setActionLoading(true);
        const response = await materialRequestService.updateStatus(selectedRequest.id, {
            status: newStatus,
            adminId: selectedAdminId,
            actorId: selectedAdminId,
            actorRole: 'admin',
            note: note || `Updated to ${newStatus.replace(/_/g, ' ')}`
        });
        
        if (response.success) {
            setSelectedRequest(null);
            fetchRequests();
        }
        setActionLoading(false);
    };

    if (!selectedAdminId) {
        return (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 animate-fadeIn">
                <FiPackage size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-sm font-black uppercase tracking-widest text-slate-400 italic">Pilih Admin persona terlebih dahulu di Topbar.</p>
            </div>
        );
    }

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

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Logistik & Material</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic font-medium">Monitoring pengadaan material dari lapangan.</p>
                </div>
            </div>

            <div className="dashboard-card border-slate-200 shadow-xl shadow-slate-200/20">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Cari kode, proyek, atau material..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-800/20"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {[
                            { id: 'all', label: 'Semua' },
                            { id: 'submitted', label: 'Baru (Mandor)' },
                            { id: 'approved_by_supervisor', label: 'Perlu Approval' },
                            { id: 'approved_by_admin', label: 'Disetujui' },
                            { id: 'processing', label: 'Diproses' },
                            { id: 'delivered', label: 'Dikirim' },
                            { id: 'rejected', label: 'Ditolak' }
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

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="w-8 h-8 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memuat Request...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50">
                                    <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">ID & Proyek</th>
                                    <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Material Utama</th>
                                    <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Pengaju</th>
                                    <th className="py-4 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">{req.requestCode}</span>
                                                <span className="text-xs font-bold text-slate-500 truncate max-w-[150px]">{req.project?.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-800">{req.items?.[0]?.materialName}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase">
                                                    {req.items?.[0]?.requestedQty} {req.items?.[0]?.unit} {req.items?.length > 1 ? `(+${req.items.length - 1} item lain)` : ''}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <StatusBadge type="material" status={req.status} />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-800 uppercase">{req.foreman?.name}</span>
                                                <span className="text-[9px] text-slate-400 font-bold uppercase italic">VIA {req.supervisor?.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <button 
                                                onClick={() => handleOpenDetail(req.id)}
                                                className="px-4 py-2 bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                TINJAU
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredRequests.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-20 text-center">
                                            <FiPackage size={40} className="mx-auto text-slate-100 mb-4" />
                                            <p className="text-xs font-black uppercase tracking-widest text-slate-300">Tidak ada pengajuan material.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-[100] flex items-center justify-end overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fadeIn" onClick={() => setSelectedRequest(null)}></div>
                    <div className="relative w-full max-w-xl bg-white h-full shadow-2xl animate-slideInRight flex flex-col">
                        <div className="p-6 border-b flex items-center justify-between bg-slate-50">
                            <div>
                                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{selectedRequest.requestCode}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detail Pengajuan Material</p>
                            </div>
                            <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-slate-200 rounded-full transition-all"><FiChevronRight className="text-xl" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {/* Project Info */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b pb-2">Informasi Proyek</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Proyek</p>
                                        <p className="text-xs font-bold text-slate-800">{selectedRequest.project?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pengaju</p>
                                        <p className="text-xs font-bold text-slate-800">{selectedRequest.foreman?.name} (Mandor)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Item List */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b pb-2">Daftar Material</h4>
                                <div className="space-y-2">
                                    {selectedRequest.items?.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <div>
                                                <p className="text-xs font-black text-slate-800">{item.materialName}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase">{item.note || 'Tanpa Catatan'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black text-slate-800">{item.requestedQty} {item.unit}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* History */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b pb-2">Riwayat Status</h4>
                                <div className="space-y-4 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                                    {selectedRequest.history?.map((h, idx) => (
                                        <div key={idx} className="relative pl-6">
                                            <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-slate-300"></div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${getStatusStyle(h.newStatus)}`}>
                                                    {h.newStatus?.replace(/_/g, ' ')}
                                                </span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase">{new Date(h.createdAt).toLocaleString()}</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-600 mt-1 italic">"{h.note || 'Tidak ada catatan'}"</p>
                                            <p className="text-[9px] font-black text-slate-400 uppercase mt-0.5">Oleh: {h.actorRole}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 border-t bg-slate-50 space-y-4">
                            <textarea 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Tambah catatan review..."
                                className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-slate-800/20 h-20"
                            />
                            <div className="grid grid-cols-2 gap-3">
                                {selectedRequest.status === 'approved_by_supervisor' && (
                                    <>
                                        <button 
                                            onClick={() => handleAction('approved_by_admin')}
                                            disabled={actionLoading}
                                            className="col-span-2 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                                        >
                                            APPROVE REQUEST
                                        </button>
                                        <button 
                                            onClick={() => handleAction('rejected')}
                                            disabled={actionLoading}
                                            className="py-3 bg-white border-2 border-red-500 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all"
                                        >
                                            TOLAK
                                        </button>
                                    </>
                                )}
                                {selectedRequest.status === 'approved_by_admin' && (
                                    <button 
                                        onClick={() => handleAction('processing')}
                                        disabled={actionLoading}
                                        className="col-span-2 py-3 bg-amber-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                                    >
                                        SET KE PROSES PENGADAAN
                                    </button>
                                )}
                                {selectedRequest.status === 'processing' && (
                                    <button 
                                        onClick={() => handleAction('delivered')}
                                        disabled={actionLoading}
                                        className="col-span-2 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                                    >
                                        KONFIRMASI PENGIRIMAN (DELIVERED)
                                    </button>
                                )}
                                {selectedRequest.status === 'delivered' && (
                                    <button 
                                        onClick={() => handleAction('completed')}
                                        disabled={actionLoading}
                                        className="col-span-2 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                                    >
                                        SELESAIKAN REQUEST (COMPLETED)
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestMaterialAdminPage;
