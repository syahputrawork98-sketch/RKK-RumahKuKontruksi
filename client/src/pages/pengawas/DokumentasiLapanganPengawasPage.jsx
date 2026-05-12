import React, { useState, useEffect } from "react";
import { FiCamera, FiMaximize2, FiCalendar, FiFile } from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import projectDocumentService from "../../services/projectDocumentService";
import { API_BASE_URL } from "../../services/apiClient";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import UploadDocumentModal from "../../components/common/UploadDocumentModal";

const DokumentasiLapanganPengawasPage = () => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [activeSubtab, setActiveSubtab] = useState("all");
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const fetchDocuments = async () => {
        if (!selectedSupervisorId) return;
        try {
            setLoading(true);
            const data = await projectDocumentService.getDocuments({ category: 'lapangan' });
            setDocuments(data.data || []);
        } catch (err) {
            setError(err.message || "Gagal memuat data dokumentasi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedSupervisorId) {
            setLoading(false);
            return;
        }
        fetchDocuments();
    }, [selectedSupervisorId]);

    const getFileUrl = (url) => {
        if (!url) return "https://placehold.co/400x300?text=No+Image";
        if (url.startsWith('http')) return url;
        const base = API_BASE_URL.replace('/api', '');
        return `${base}${url}`;
    };

    if (!selectedSupervisorId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Pengawas"
                description="Pilih pengawas untuk melihat dokumentasi lapangan."
            />
        );
    }

    if (loading && documents.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return <RoleDataState type="error" title={error} onRetry={() => fetchDocuments()} />;
    }

    const filteredDocs = documents.filter(doc => {
        if (activeSubtab === "active") return doc.status === "active";
        if (activeSubtab === "archive") return doc.status === "archived";
        return true;
    });

    const subtabs = [
        { id: "all", label: "Semua Foto" },
        { id: "active", label: "Aktif" },
        { id: "archive", label: "Arsip" }
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Dokumentasi Lapangan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Koleksi bukti visual perkembangan pekerjaan fisik di lapangan.</p>
                </div>
                <button 
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                >
                    <FiCamera /> Ambil Foto Baru
                </button>
            </div>

            <UploadDocumentModal 
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSuccess={fetchDocuments}
                uploadedByRole="pengawas"
                uploadedById={selectedSupervisorId}
                category="lapangan"
            />

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredDocs.length === 0 ? (
                    <div className="col-span-full">
                        <RoleDataState type="empty" title="Tidak ada dokumentasi" description="Belum ada metadata dokumen." />
                    </div>
                ) : filteredDocs.map((doc) => (
                    <div key={doc.id} className="dashboard-card p-0 overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden bg-slate-200 flex items-center justify-center">
                            {doc.mimeType?.startsWith('image/') ? (
                                <img src={getFileUrl(doc.fileUrl)} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt={doc.title} />
                            ) : (
                                <FiFile size={48} className="text-slate-400 group-hover:scale-110 transition-all duration-500" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                <button className="p-3 bg-white rounded-full text-[var(--dashboard-primary)] shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all">
                                    <FiMaximize2 size={20} />
                                </button>
                            </div>
                            <div className="absolute top-2 left-2">
                                <span className="px-2 py-0.5 bg-black/60 text-white text-[8px] font-black uppercase rounded backdrop-blur-sm border border-white/20">
                                    {doc.project?.projectCode || doc.projectId}
                                </span>
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)]">
                                <span className="truncate pr-2">{doc.title}</span>
                                <div className="flex items-center gap-1 text-[var(--dashboard-text-soft)] shrink-0">
                                    <FiCalendar size={10} /> {new Date(doc.createdAt).toLocaleDateString("id-ID")}
                                </div>
                            </div>
                            <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold italic truncate">Oleh: {doc.uploadedByRole}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded ${
                                    doc.visibility === 'customer_visible' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {doc.visibility.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DokumentasiLapanganPengawasPage;
