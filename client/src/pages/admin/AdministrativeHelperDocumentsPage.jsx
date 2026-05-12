import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FiFileText, 
    FiPlus, 
    FiFilter, 
    FiClock, 
    FiCheckCircle, 
    FiArchive,
    FiInfo,
    FiMoreVertical,
    FiChevronRight,
    FiDownload,
    FiEye,
    FiEdit3,
    FiAlertCircle
} from "react-icons/fi";
import administrativeHelperDocumentService from "../../services/administrativeHelperDocumentService";
import RoleDataState from "../../components/common/RoleDataState";

const AdministrativeHelperDocumentsPage = () => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);
    const [filterType, setFilterType] = useState("ALL");
    const [filterStatus, setFilterStatus] = useState("ALL");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, [filterType, filterStatus]);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const params = {};
            if (filterType !== "ALL") params.type = filterType;
            if (filterStatus !== "ALL") params.status = filterStatus;
            
            const response = await administrativeHelperDocumentService.getDocuments(params);
            setDocuments(response.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching helper documents:", error);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await administrativeHelperDocumentService.updateStatus(id, newStatus);
            fetchDocuments();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'INVOICE': return { label: 'Invoice Helper', color: 'bg-blue-50 text-blue-600 border-blue-100' };
            case 'BAST': return { label: 'BAST Helper', color: 'bg-purple-50 text-purple-600 border-purple-100' };
            case 'LEGAL_HELPER': return { label: 'Legal Helper', color: 'bg-amber-50 text-amber-600 border-amber-100' };
            default: return { label: type, color: 'bg-neutral-50 text-neutral-600 border-neutral-100' };
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'draft': return <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-[10px] font-black uppercase rounded-full border border-neutral-200">Draft</span>;
            case 'reviewed': return <span className="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-black uppercase rounded-full border border-blue-200">Reviewed</span>;
            case 'released': return <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase rounded-full border border-emerald-200">Released</span>;
            case 'archived': return <span className="px-3 py-1 bg-neutral-500 text-white text-[10px] font-black uppercase rounded-full border border-neutral-600">Archived</span>;
            default: return <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-[10px] font-black uppercase rounded-full border border-neutral-200">{status}</span>;
        }
    };

    return (
        <div className="animate-fadeIn space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-neutral-900 uppercase">
                        Administrative <span className="text-teal-600">Document Helper</span>
                    </h1>
                    <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed mt-2 font-bold uppercase italic tracking-tighter">
                        Draft dan pembantu dokumen administratif (Invoice, BAST, Legal) untuk mempermudah workflow sebelum dokumen legal final diterbitkan.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-3">
                        <FiInfo className="text-teal-600" />
                        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Draft System Only</span>
                    </div>
                </div>
            </div>

            {/* Stats / Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[40px] border border-neutral-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                        <FiFileText size={80} />
                    </div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Total Draft</p>
                    <h4 className="text-3xl font-black text-neutral-900">{documents.length}</h4>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-neutral-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                        <FiClock size={80} />
                    </div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Menunggu Review</p>
                    <h4 className="text-3xl font-black text-blue-600">{documents.filter(d => d.status === 'draft').length}</h4>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-neutral-100 shadow-xl relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                        <FiCheckCircle size={80} />
                    </div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Siap Rilis</p>
                    <h4 className="text-3xl font-black text-emerald-600">{documents.filter(d => d.status === 'reviewed').length}</h4>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative group flex-1 md:flex-none">
                        <select 
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="appearance-none pl-10 pr-10 py-3 bg-white border-2 border-neutral-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:border-teal-500 outline-none w-full"
                        >
                            <option value="ALL">Semua Jenis</option>
                            <option value="INVOICE">Invoice</option>
                            <option value="BAST">BAST</option>
                            <option value="LEGAL_HELPER">Legal Helper</option>
                        </select>
                        <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                    <div className="relative group flex-1 md:flex-none">
                        <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="appearance-none pl-10 pr-10 py-3 bg-white border-2 border-neutral-100 rounded-2xl text-xs font-black uppercase tracking-widest focus:border-teal-500 outline-none w-full"
                        >
                            <option value="ALL">Semua Status</option>
                            <option value="draft">Draft</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="released">Released</option>
                        </select>
                        <FiClock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    </div>
                </div>
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full md:w-auto px-8 py-3 bg-teal-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-teal-600/20 hover:scale-105 transition-transform flex items-center justify-center gap-3"
                >
                    <FiPlus /> Buat Draft Helper
                </button>
            </div>

            {/* Documents List */}
            {loading ? (
                <RoleDataState type="loading" message="Sinkronisasi draft dokumen..." />
            ) : documents.length === 0 ? (
                <RoleDataState 
                    type="empty" 
                    title="Tidak Ada Draft Dokumen"
                    message="Belum ada draft invoice, BAST, atau helper dokumen legal yang dibuat untuk kriteria ini."
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc, idx) => {
                        const typeInfo = getTypeLabel(doc.type);
                        return (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={doc.id} 
                                className="bg-white rounded-[40px] border border-neutral-100 shadow-xl overflow-hidden group hover:border-teal-500/30 transition-all flex flex-col"
                            >
                                <div className="p-8 space-y-6 flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${typeInfo.color}`}>
                                            {typeInfo.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(doc.status)}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-black text-teal-600 mb-1">{doc.documentCode}</p>
                                        <h3 className="text-xl font-black text-neutral-900 leading-tight group-hover:text-teal-600 transition-colors">
                                            {doc.title}
                                        </h3>
                                        <p className="text-xs font-bold text-neutral-400 mt-2 line-clamp-2 italic">
                                            {doc.summaryData || "Tidak ada ringkasan data."}
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-dashed border-neutral-100 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Proyek</p>
                                            <p className="text-[10px] font-black text-neutral-700 uppercase truncate max-w-[120px]">
                                                {doc.project?.name || "N/A"}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Dibuat</p>
                                            <p className="text-[10px] font-black text-neutral-700">
                                                {new Date(doc.createdAt).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-8 py-5 bg-neutral-50/50 flex items-center justify-between border-t border-neutral-100">
                                    <button className="text-[10px] font-black text-neutral-500 hover:text-teal-600 flex items-center gap-2 transition-colors uppercase tracking-widest">
                                        <FiEye /> Detail
                                    </button>
                                    <div className="flex items-center gap-4">
                                        {doc.status === 'draft' && (
                                            <button 
                                                onClick={() => handleStatusUpdate(doc.id, 'reviewed')}
                                                className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest"
                                            >
                                                Mark Review
                                            </button>
                                        )}
                                        {doc.status === 'reviewed' && (
                                            <button 
                                                onClick={() => handleStatusUpdate(doc.id, 'released')}
                                                className="text-[10px] font-black text-emerald-600 hover:underline uppercase tracking-widest"
                                            >
                                                Release
                                            </button>
                                        )}
                                        <button className="p-2 bg-white border border-neutral-200 rounded-xl text-neutral-400 hover:text-teal-600 shadow-sm transition-all">
                                            <FiDownload size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Disclaimer Section */}
            <div className="p-8 bg-neutral-900 rounded-[40px] text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full"></div>
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-teal-400 border border-white/10 shrink-0 shadow-lg">
                    <FiAlertCircle size={32} />
                </div>
                <div className="space-y-2 flex-1">
                    <h4 className="text-sm font-black uppercase tracking-widest">PENTING: Batasan Legalitas Dokumen Helper</h4>
                    <p className="text-[11px] font-medium text-neutral-400 leading-relaxed max-w-3xl italic">
                        Seluruh draft yang dikelola di modul ini bersifat <span className="text-teal-400">Helper / Pembantu Administratif</span> untuk memudahkan penyusunan data. Dokumen yang tampil di sini bukanlah dokumen legal final yang mengikat secara hukum. Tanda tangan digital, e-meterai, dan pengesahan resmi tetap mengikuti workflow offline/manual sesuai kebijakan RKK.
                    </p>
                </div>
            </div>

            {/* Create Modal Placeholder */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-neutral-900/80 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-neutral-900">Buat Draft Helper</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                <FiPlus className="rotate-45" size={24} />
                            </button>
                        </div>
                        <p className="text-sm text-neutral-500 font-bold uppercase tracking-tight italic">
                            Modul pembuatan draft sedang dalam tahap integrasi schema dinamis. Silakan gunakan data seed untuk demo workflow saat ini.
                        </p>
                        <div className="p-6 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200 text-center">
                            <FiEdit3 className="mx-auto text-neutral-300 mb-4" size={40} />
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Feature Bridge: Batch 27B Planned</p>
                        </div>
                        <button 
                            onClick={() => setIsCreateModalOpen(false)}
                            className="w-full py-4 bg-neutral-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdministrativeHelperDocumentsPage;
