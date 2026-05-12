import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch, FiFilter, FiChevronRight, FiClock, FiCheckCircle, FiPackage, FiTruck, FiAlertCircle, FiInfo } from "react-icons/fi";
import MaterialRequestForm from "./components/MaterialRequestForm";
import materialRequestService from "../../services/materialRequestService";
import StatusBadge from "../../components/common/StatusBadge";
import RoleDataState from "../../components/common/RoleDataState";
import { useForemanPersona } from "../../context/ForemanPersonaContext";

const RequestMaterialMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [activeSubtab, setActiveSubtab] = useState("all");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [note, setNote] = useState("");

    const subtabs = [
        { id: "all", label: "Semua" },
        { id: "submitted", label: "Diajukan" },
        { id: "processing", label: "Diproses" },
        { id: "delivered", label: "Dikirim" },
        { id: "received", label: "Diterima" },
    ];

    const fetchRequests = async () => {
        if (!selectedForemanId) return;
        try {
            setLoading(true);
            setError(null);
            const params = {
                foremanId: selectedForemanId,
                ...(activeSubtab !== 'all' && { status: activeSubtab })
            };
            const response = await materialRequestService.getAllRequests(params);
            if (response.success) {
                setRequests(response.data || []);
            } else {
                setError(response.message);
            }
        } catch (err) {
            console.error("Failed to fetch requests:", err);
            setError("Gagal memuat data pengajuan material.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedForemanId, activeSubtab]);

    const handleOpenDetail = async (id) => {
        setLoading(true);
        const response = await materialRequestService.getRequestById(id);
        if (response.success) {
            setSelectedRequest(response.data);
            setNote("");
        }
        setLoading(false);
    };

    const handleConfirmReceipt = async () => {
        if (!selectedRequest || !selectedForemanId) return;
        
        setActionLoading(true);
        const response = await materialRequestService.updateStatus(selectedRequest.id, {
            status: 'received',
            actorId: selectedForemanId,
            actorRole: 'FOREMAN',
            note: note || 'Material telah diterima di lokasi proyek.'
        });
        
        if (response.success) {
            setSelectedRequest(null);
            fetchRequests();
        } else {
            alert(response.message || "Gagal mengonfirmasi penerimaan.");
        }
        setActionLoading(false);
    };

    const filteredRequests = (requests || []).filter(req => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            req.requestCode?.toLowerCase().includes(q) ||
            req.project?.name?.toLowerCase().includes(q) ||
            req.items?.some(item => item.materialName?.toLowerCase().includes(q))
        );
    });

    if (!selectedForemanId) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <FiPackage className="mx-auto text-[var(--dashboard-text-soft)] mb-4" size={40} />
                    <h3 className="text-lg font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Pilih Akun Mandor</h3>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-2 italic font-medium">Pilih persona Mandor untuk melihat dan mengelola pengajuan material lapangan.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Kebutuhan Material</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pengajuan kebutuhan material lapangan untuk verifikasi Pengawas.</p>
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

            {/* DISCLAIMER LOCAL WORKFLOW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-blue-50/50 border border-blue-100 rounded-3xl p-5 flex items-start gap-4">
                    <FiInfo className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-700 mb-1">Local Logistics Workflow</h4>
                        <p className="text-[11px] text-blue-600 font-medium leading-relaxed italic">
                            Halaman ini digunakan untuk koordinasi kebutuhan material lapangan. Ini <span className="font-black">BUKAN sistem procurement produksi</span>, 
                            bukan purchase order, dan tidak mencatat transaksi keuangan/pembayaran riil. 
                            Status 'Dikirim' berarti material telah dialokasikan secara lokal untuk distribusi ke site.
                        </p>
                    </div>
                </div>
                <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-5 flex items-start gap-4">
                    <FiAlertCircle className="text-amber-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">Konfirmasi Penerimaan</h4>
                        <p className="text-[11px] text-amber-600 font-medium leading-relaxed italic">
                            Mandor wajib melakukan konfirmasi 'Terima di Site' setelah material fisik sampai di lokasi untuk menutup siklus request lokal ini.
                        </p>
                    </div>
                </div>
            </div>

            <div className="dashboard-card min-h-[400px]">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari material atau ID request..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-bold">
                        <FiFilter /> Filter
                    </button>
                </div>

                {loading ? (
                    <RoleDataState type="loading" />
                ) : error ? (
                    <RoleDataState 
                        type="error" 
                        title={error} 
                        onRetry={fetchRequests} 
                    />
                ) : filteredRequests.length === 0 ? (
                    <RoleDataState 
                        type="empty"
                        title="Belum ada pengajuan material"
                        description={activeSubtab === 'all' ? "Gunakan tombol 'Buat Request Baru' untuk memulai pengajuan material proyek." : `Tidak ada pengajuan dengan status ${activeSubtab}.`}
                    />
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
                                { filteredRequests.map((req) => {
                                    if (!req) return null;
                                    const mainMaterial = req.items?.[0]?.materialName || 'Material';
                                    const otherItemsCount = (req.items?.length || 0) - 1;
                                    
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
                                                        {mainMaterial} 
                                                        {otherItemsCount > 0 && <span className="ml-1 text-[10px] text-[var(--dashboard-primary)]">+{otherItemsCount} lainnya</span>}
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
                                                <StatusBadge type="material" status={req.status} />
                                            </td>
                                            <td className="py-4 px-4 bg-[var(--dashboard-surface-soft)]/50 rounded-r-2xl border-y border-r border-[var(--dashboard-border)] group-hover:border-[var(--dashboard-primary)]/30 group-hover:bg-[var(--dashboard-surface-soft)] transition-all text-right">
                                                <button 
                                                    onClick={() => handleOpenDetail(req.id)}
                                                    className="p-2 hover:bg-[var(--dashboard-primary)]/10 rounded-full text-[var(--dashboard-primary)] transition-all"
                                                >
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

            {/* DETAIL MODAL */}
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
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">Detail Kebutuhan Lapangan</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedRequest(null)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-800 transition-all border border-slate-100">
                                <FiChevronRight size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30">
                            {/* Project Info */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Informasi Proyek</h4>
                                <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                                    <div className="col-span-2">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Proyek</p>
                                        <p className="text-xs font-black text-slate-800">{selectedRequest.project?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Status</p>
                                        <StatusBadge type="material" status={selectedRequest.status} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Tgl Butuh</p>
                                        <p className="text-xs font-black text-slate-800">{selectedRequest.neededDate ? new Date(selectedRequest.neededDate).toLocaleDateString('id-ID') : '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Item List */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Daftar Material</h4>
                                <div className="space-y-4">
                                    {selectedRequest.items?.map((item, idx) => (
                                        <div key={idx} className="p-6 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <p className="text-sm font-black text-slate-800">{item.materialName}</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                                        {item.isAdditionalMaterial ? 'Material Tambahan' : 'Item RAB'}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black text-slate-800">{item.requestedQty} <span className="text-[10px] uppercase text-slate-400">{item.unit}</span></p>
                                                </div>
                                            </div>

                                            {item.rabItemId && (
                                                <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50/50 rounded-3xl border border-slate-100 mt-4 shadow-inner">
                                                    <div className="text-center">
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total RAB</p>
                                                        <p className="text-[11px] font-black text-slate-700">{item.totalRabQty || 0} <span className="text-[8px] opacity-50 uppercase">{item.unit}</span></p>
                                                    </div>
                                                    <div className="text-center border-x border-slate-200/50">
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Disetujui</p>
                                                        <p className="text-[11px] font-black text-slate-700">{item.totalApprovedQty || 0} <span className="text-[8px] opacity-50 uppercase">{item.unit}</span></p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Sisa Kuota</p>
                                                        <p className="text-[11px] font-black text-emerald-600">
                                                            {item.remainingRabQty || 0} <span className="text-[8px] opacity-50 uppercase">{item.unit}</span>
                                                        </p>
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
                                    ))}
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Alasan / Catatan</h4>
                                <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm italic text-xs text-slate-600 font-medium leading-relaxed">
                                    "{selectedRequest.reason || 'Tidak ada catatan.'}"
                                </div>
                            </div>

                            {/* History */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 pb-2">Riwayat</h4>
                                <div className="space-y-4 relative before:absolute before:left-2.5 before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100 ml-2">
                                    {selectedRequest.history?.map((h, idx) => (
                                        <div key={idx} className="relative pl-8">
                                            <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-white border-[3px] border-slate-200 shadow-sm"></div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 rounded-full border border-slate-200">
                                                    {h.newStatus.replace(/_/g, ' ')}
                                                </span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase">{new Date(h.createdAt).toLocaleDateString('id-ID')}</span>
                                            </div>
                                            <p className="mt-1 text-[10px] font-medium text-slate-500 italic">"{h.note || 'No note'}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="p-8 border-t bg-white space-y-6">
                            {selectedRequest.status === 'delivered' ? (
                                <>
                                    <textarea 
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        placeholder="Catatan penerimaan material (opsional)..."
                                        className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-[2rem] text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/10 focus:bg-white transition-all resize-none shadow-inner h-24"
                                    />
                                    <button 
                                        onClick={handleConfirmReceipt}
                                        disabled={actionLoading || selectedRequest.project?.status === 'Selesai'}
                                        className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {actionLoading ? "Memproses..." : (selectedRequest.project?.status === 'Selesai' ? "HOLD: PROYEK SELESAI" : "Konfirmasi Terima di Lapangan")}
                                    </button>
                                </>
                            ) : (
                                <div className="p-5 bg-slate-50 rounded-[2rem] text-center border border-slate-100 border-dashed">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Status: {selectedRequest.status.replace(/_/g, ' ')}</p>
                                    <p className="text-[9px] text-slate-400 font-medium mt-1">
                                        {['submitted', 'approved_by_supervisor', 'approved_by_admin', 'processing'].includes(selectedRequest.status) 
                                            ? 'Menunggu proses distribusi lokal oleh Admin Operasional.' 
                                            : 'Proses pengajuan ini telah selesai.'}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestMaterialMandorPage;
