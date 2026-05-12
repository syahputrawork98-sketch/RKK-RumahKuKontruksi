import React, { useState, useEffect } from "react";
import { FiFileText, FiSearch, FiUpload, FiDownload, FiExternalLink, FiClock } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import projectDocumentService from "../../services/projectDocumentService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const FileDesainArsitekPage = () => {
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchDocuments = async () => {
        if (!selectedArchitectId) return;
        try {
            setLoading(true);
            setError(null);
            const res = await projectDocumentService.getDocuments({
                uploadedById: selectedArchitectId,
                uploadedByRole: 'architect'
            });
            if (res.success) {
                setDocuments(res.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch design documents:", err);
            setError("Gagal memuat daftar file desain.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [selectedArchitectId]);

    const filteredDocs = documents.filter(doc => 
        doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.fileName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (personaLoading || loading) {
        return <RoleDataState type="loading" message="Membuka folder desain..." />;
    }

    if (!selectedArchitectId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Arsitek Terlebih Dahulu"
                description="Pilih akun Arsitek untuk mengelola file desain."
            />
        );
    }

    if (error) return <RoleDataState type="error" message={error} onRetry={fetchDocuments} />;

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Penyimpanan Desain</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic uppercase tracking-widest">Daftar file yang Anda unggah untuk berbagai proyek.</p>
                </div>
                <button 
                    onClick={() => alert("Gunakan tombol upload di halaman detail brief untuk mengunggah file spesifik proyek.")}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[var(--dashboard-primary-dark)] transition-all shadow-lg shadow-[var(--dashboard-primary)]/20"
                >
                    <FiUpload />
                    Upload File Baru
                </button>
            </div>

            <div className="dashboard-card min-h-[400px] flex flex-col">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari nama file atau judul dokumen..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                </div>

                {filteredDocs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDocs.map((doc) => (
                            <div key={doc.id} className="group p-5 bg-[var(--dashboard-surface-soft)] rounded-[2rem] border border-[var(--dashboard-border-soft)] hover:border-[var(--dashboard-primary)]/30 hover:bg-white transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-white rounded-2xl text-[var(--dashboard-primary)] shadow-sm">
                                        <FiFileText size={24} />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                            doc.visibility === 'customer_visible' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}>
                                            {doc.visibility === 'customer_visible' ? 'Released' : 'Internal'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="space-y-1 mb-4">
                                    <h4 className="font-bold text-sm text-[var(--dashboard-text)] line-clamp-1">{doc.title}</h4>
                                    <p className="text-[10px] text-[var(--dashboard-text-soft)] font-medium truncate italic">{doc.fileName}</p>
                                </div>

                                <div className="flex items-center gap-2 mb-6 p-2 bg-white/50 rounded-xl">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--dashboard-primary)]"></div>
                                    <span className="text-[9px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Proyek: {doc.project?.name || "Desain Request"}</span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-[var(--dashboard-border-soft)]">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--dashboard-text-soft)]">
                                        <FiClock />
                                        {new Date(doc.createdAt).toLocaleDateString('id-ID')}
                                    </div>
                                    <div className="flex gap-2">
                                        <a 
                                            href={doc.fileUrl ? `http://localhost:4000${doc.fileUrl}` : "#"} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white border border-[var(--dashboard-border-soft)] text-[var(--dashboard-text-soft)] rounded-xl hover:text-[var(--dashboard-primary)] hover:border-[var(--dashboard-primary)] transition-all"
                                        >
                                            <FiExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-center p-8">
                        <RoleDataState 
                            type="empty"
                            title="Belum Ada File"
                            description="Anda belum mengunggah file desain apa pun untuk persona ini."
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileDesainArsitekPage;
