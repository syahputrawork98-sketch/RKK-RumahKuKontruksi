import React, { useState, useEffect } from "react";
import { FiCamera, FiMaximize2, FiCalendar, FiFile } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import projectDocumentService from "../../services/projectDocumentService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DokumentasiLapanganMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [activeSubtab, setActiveSubtab] = useState("all");
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedForemanId) {
            setLoading(false);
            return;
        }
        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const data = await projectDocumentService.getDocuments({ category: 'lapangan' });
                // In a real app we'd filter by projects where foreman is assigned.
                setDocuments(data.data || []);
            } catch (err) {
                setError(err.message || "Gagal memuat data dokumentasi");
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [selectedForemanId]);

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Mandor"
                description="Pilih mandor untuk melihat dokumentasi lapangan."
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
        return <RoleDataState type="error" title={error} onRetry={() => window.location.reload()} />;
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
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Unggah bukti visual pekerjaan harian untuk keperluan logbook dan verifikasi.</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">
                    <FiCamera /> Ambil & Unggah Foto
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.length === 0 ? (
                    <div className="col-span-full">
                        <RoleDataState type="empty" title="Tidak ada dokumentasi" description="Belum ada metadata dokumen." />
                    </div>
                ) : filteredDocs.map((doc) => (
                    <div key={doc.id} className="dashboard-card p-0 overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden bg-slate-200 flex items-center justify-center">
                            {doc.mimeType?.startsWith('image/') ? (
                                <img src={doc.fileUrl || "https://placehold.co/400x300?text=No+Image"} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt={doc.title} />
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
                                    {doc.projectId}
                                </span>
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)]">
                                <span>{doc.title}</span>
                                <div className="flex items-center gap-1 text-[var(--dashboard-text-soft)]">
                                    <FiCalendar size={10} /> {new Date(doc.createdAt).toLocaleDateString("id-ID")}
                                </div>
                            </div>
                            <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold italic truncate leading-relaxed">"{doc.description || 'Tidak ada catatan'}"</p>
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

export default DokumentasiLapanganMandorPage;
