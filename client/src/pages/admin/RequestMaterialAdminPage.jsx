import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiChevronRight, FiClock, FiCheckCircle, FiPackage, FiTruck, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";
import materialRequestService from "../../services/materialRequestService";
import StatusBadge from "../../components/common/StatusBadge";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const RequestMaterialAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [note, setNote] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const STATUS_CONFIG = {
        all: { label: "Semua", color: "slate" },
        submitted: { label: "Antrean Pengawas", color: "blue", icon: FiClock },
        approved_by_supervisor: { label: "Perlu Approval Admin", color: "emerald", icon: FiCheckCircle },
        approved_by_admin: { label: "Disetujui Admin", color: "emerald", icon: FiCheckCircle },
        processing: { label: "Persiapan Distribusi", color: "amber", icon: FiPackage },
        delivered: { label: "Dalam Pengiriman", color: "indigo", icon: FiTruck },
        received: { label: "Diterima Mandor", color: "emerald", icon: FiCheckCircle },
        completed: { label: "Selesai (Arsip)", color: "slate", icon: FiCheckCircle },
        rejected: { label: "Ditolak", color: "red", icon: FiX },
        cancelled: { label: "Dibatalkan", color: "red", icon: FiX }
    };

    const fetchRequests = async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        const params = {
            adminId: selectedAdminId,
            ...(activeTab !== 'all' && { status: activeTab })
        };
        const response = await materialRequestService.getAllRequests(params);
        if (response.success) {
            setRequests(Array.isArray(response.data) ? response.data : []);
        } else {
            setError(response.message);
            setRequests([]);
        }
        setLoading(false);
    };

    const filteredRequests = (requests || []).filter(req => {
        if (!req) return false;
        const q = searchQuery.toLowerCase();
        const matchesSearch = 
            (req.requestCode?.toLowerCase() || "").includes(q) ||
            req.items?.some(item => (item.materialName?.toLowerCase() || "").includes(q)) ||
            (req.project?.name?.toLowerCase() || "").includes(q) ||
            (req.foreman?.name?.toLowerCase() || "").includes(q);
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
        
        // Basic validation for note on rejection
        if (newStatus === 'rejected' && !note.trim()) {
            alert("Mohon berikan alasan penolakan pada kolom catatan.");
            return;
        }

        setActionLoading(true);
        const response = await materialRequestService.updateStatus(selectedRequest.id, {
            status: newStatus,
            adminId: selectedAdminId,
            actorId: selectedAdminId,
            actorRole: 'ADMIN',
            note: note || `Review Admin: ${newStatus.replace(/_/g, ' ')}`
        });
        
        if (response.success) {
            setSelectedRequest(null);
            fetchRequests();
        } else {
            alert(response.message || "Gagal memperbarui status.");
        }
        setActionLoading(false);
    };

    if (!selectedAdminId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Admin Persona"
                description="Pilih akun Admin untuk memantau dan menyetujui permintaan material dari seluruh proyek."
            />
        );
    }

    const getStatusStyle = (status) => {
        const config = STATUS_CONFIG[status] || STATUS_CONFIG.all;
        switch (config.color) {
            case "blue": return "bg-blue-500/10 text-blue-500";
            case "emerald": return "bg-emerald-500/10 text-emerald-500";
            case "amber": return "bg-amber-500/10 text-amber-500";
            case "indigo": return "bg-indigo-500/10 text-indigo-500";
            case "red": return "bg-red-500/10 text-red-500";
            default: return "bg-slate-500/10 text-slate-500";
        }
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight uppercase">Distribusi Material <span className="text-[var(--dashboard-primary)]">Lokal</span></h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic font-medium">Monitoring approval administratif dan koordinasi logistik internal site.</p>
                </div>
                
                {/* Disclaimer Box */}
                <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-5 flex items-start gap-4 max-w-xl">
                    <FiInfo className="text-amber-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">Local Logistics Notice</h4>
                        <p className="text-[11px] text-amber-600 font-medium leading-relaxed italic">
                            Sistem ini digunakan untuk pencatatan pergerakan material di site. <span className="font-black">Bukan workflow procurement komersial</span>. 
                            Gunakan status untuk memvalidasi distribusi material secara transparan tanpa memengaruhi modul akuntansi/pembayaran resmi.
                        </p>
                    </div>
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
                            { id: 'submitted', label: 'Antrean Pengawas' },
                            { id: 'approved_by_supervisor', label: 'Perlu Approval Admin' },
                            { id: 'approved_by_admin', label: 'Disetujui' },
                            { id: 'processing', label: 'Persiapan' },
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
                    <RoleDataState type="loading" />
                ) : error ? (
                    <RoleDataState 
                        type="error" 
                        title="Gagal Memuat Pengajuan"
                        description={error}
                        onRetry={fetchRequests}
                    />
                ) : filteredRequests.length === 0 ? (
                    <RoleDataState 
                        type="empty"
                        title={searchQuery ? "Hasil Pencarian Kosong" : "Belum Ada Pengajuan"}
                        description={searchQuery ? `Tidak ditemukan request material dengan kata kunci "${searchQuery}".` : "Daftar pengajuan material akan muncul di sini."}
                    />
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
                                                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">{req.requestCode || "NO-CODE"}</span>
                                                <span className="text-xs font-bold text-slate-500 truncate max-w-[150px]">{req.project?.name || "Project Unknown"}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-800">{req.items?.[0]?.materialName || "No Item"}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase">
                                                    {req.items?.[0]?.requestedQty || 0} {req.items?.[0]?.unit || ""} {req.items?.length > 1 ? `(+${req.items.length - 1} item lain)` : ''}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <StatusBadge type="material" status={req.status} />
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-800 uppercase">{req.foreman?.name || "Requester"}</span>
                                                <span className="text-[9px] text-slate-400 font-bold uppercase italic">VIA {req.supervisor?.name || "SUPERVISOR"}</span>
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
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Review & Status Distribusi Lokal</p>
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
                                        <p className="text-xs font-bold text-slate-800">{selectedRequest.project?.name || "-"}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pemohon</p>
                                        <p className="text-xs font-bold text-slate-800">{selectedRequest.foreman?.name || "-"} (Mandor)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Item List */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b pb-2">Daftar Material</h4>
                                <div className="space-y-2">
                                    {selectedRequest.items?.map((item, idx) => {
                                        const isOverLimit = item.rabItemId && (parseFloat(item.requestedQty) > parseFloat(item.remainingRabQty));
                                        return (
                                            <div key={idx} className={`p-4 rounded-2xl border transition-all ${isOverLimit ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <p className="text-xs font-black text-slate-800">{item.materialName}</p>
                                                        {item.rabItem ? (
                                                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-1.5 py-0.5 rounded">
                                                                Linked to RAB: {item.rabItem.description}
                                                            </span>
                                                        ) : (
                                                            <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-1.5 py-0.5 rounded">
                                                                Manual Request (No RAB Link)
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-black text-slate-800">{item.requestedQty} {item.unit}</p>
                                                    </div>
                                                </div>

                                                {item.rabItem && (
                                                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/50 mt-2">
                                                        <div className="text-center">
                                                            <p className="text-[8px] font-black text-slate-400 uppercase">Total RAB</p>
                                                            <p className="text-[10px] font-black text-slate-700">{item.totalRabQty || 0} {item.unit}</p>
                                                        </div>
                                                        <div className="text-center border-x border-slate-200/50">
                                                            <p className="text-[8px] font-black text-slate-400 uppercase">Sudah Disetujui</p>
                                                            <p className="text-[10px] font-black text-slate-700">{item.totalApprovedQty} {item.unit}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-[8px] font-black text-slate-400 uppercase">Sisa Kuota</p>
                                                            <p className={`text-[10px] font-black ${isOverLimit ? 'text-red-500' : 'text-emerald-600'}`}>
                                                                {item.remainingRabQty} {item.unit}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {isOverLimit && (
                                                    <div className="mt-3 flex items-center gap-2 p-2 bg-red-100/50 rounded-xl border border-red-200">
                                                        <FiAlertCircle className="text-red-500 flex-shrink-0" size={12} />
                                                        <p className="text-[9px] font-black text-red-700 uppercase tracking-tight leading-none">
                                                            Peringatan: Jumlah melebihi sisa kuota RAB!
                                                        </p>
                                                    </div>
                                                )}

                                                {item.note && (
                                                    <p className="text-[9px] text-slate-500 font-bold uppercase mt-2 italic border-t border-slate-100 pt-2">
                                                        Ket: {item.note}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
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
                                                    {STATUS_CONFIG[h.newStatus]?.label || h.newStatus?.replace(/_/g, ' ')}
                                                </span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase">{h.createdAt ? new Date(h.createdAt).toLocaleString() : "-"}</span>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-600 mt-1 italic">"{h.note || 'Tidak ada catatan'}"</p>
                                            <p className="text-[9px] font-black text-slate-400 uppercase mt-0.5">Oleh: {h.actorRole || "System"}</p>
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
                                {selectedRequest.status === 'submitted' && (
                                    <div className="col-span-2 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-center">
                                        <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Awaiting Supervisor</p>
                                        <p className="text-[9px] text-blue-500 font-medium mt-1">Request ini harus diverifikasi oleh Pengawas sebelum dapat disetujui oleh Admin.</p>
                                    </div>
                                )}
                                {selectedRequest.status === 'approved_by_supervisor' && (
                                    <>
                                        <button 
                                            onClick={() => handleAction('approved_by_admin')}
                                            disabled={actionLoading}
                                            className="col-span-2 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                                        >
                                            APPROVE REQUEST (ADMIN)
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
                                        MULAI PERSIAPAN DISTRIBUSI
                                    </button>
                                )}
                                {selectedRequest.status === 'processing' && (
                                    <button 
                                        onClick={() => handleAction('delivered')}
                                        disabled={actionLoading}
                                        className="col-span-2 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                                    >
                                        KONFIRMASI PENGIRIMAN SELESAI
                                    </button>
                                )}
                                {selectedRequest.status === 'delivered' && (
                                    <div className="col-span-2 p-4 bg-teal-50 border border-teal-100 rounded-2xl text-center">
                                        <p className="text-[10px] font-black text-teal-700 uppercase tracking-widest">Material Sedang Dikirim</p>
                                        <p className="text-[9px] text-teal-600 font-medium mt-1">Status saat ini adalah dalam pengiriman lokal. Tunggu konfirmasi penerimaan (Received) dari Mandor di lokasi proyek.</p>
                                    </div>
                                )}
                                {selectedRequest.status === 'received' && (
                                    <button 
                                        onClick={() => handleAction('completed')}
                                        disabled={actionLoading}
                                        className="col-span-2 py-4 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-slate-800/20"
                                    >
                                        ARSIPKAN REQUEST (COMPLETED)
                                    </button>
                                )}
                                {['completed', 'rejected', 'cancelled'].includes(selectedRequest.status) && (
                                    <div className="col-span-2 p-4 bg-slate-100 border border-slate-200 rounded-2xl text-center">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Request Selesai</p>
                                        <p className="text-[9px] text-slate-400 font-medium mt-1 italic">Data pengajuan ini sudah diarsipkan dan tidak memerlukan aksi lebih lanjut.</p>
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

export default RequestMaterialAdminPage;
