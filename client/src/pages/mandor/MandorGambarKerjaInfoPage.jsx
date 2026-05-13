import React, { useState, useEffect } from "react";
import { FiFileText, FiDownload, FiEye, FiClock, FiSearch } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import projectService from "../../services/projectService";
import projectDocumentService from "../../services/projectDocumentService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const MandorGambarKerjaInfoPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (selectedForemanId) {
            fetchDocuments();
        }
    }, [selectedForemanId]);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const projRes = await projectService.getProjects({ foremanId: selectedForemanId });
            const activeProj = projRes.data?.find(p => p.status === "Berjalan") || projRes.data?.[0];
            
            if (activeProj) {
                setProject(activeProj);
                // Fetch documents categorized as "Gambar Kerja"
                const docsRes = await projectDocumentService.getDocuments({ 
                    projectId: activeProj.id,
                    category: "Gambar Kerja"
                });
                setDocuments(docsRes.data || []);
            }
            setLoading(false);
        } catch (err) {
            setError(err.message || "Gagal memuat data gambar kerja");
            setLoading(false);
        }
    };

    if (!selectedForemanId) {
        return <RolePersonaEmptyState title="Pilih Persona Mandor" description="Pilih mandor untuk melihat gambar kerja." />;
    }

    if (loading) return <RoleDataState type="loading" message="Memuat gambar kerja..." />;
    if (error) return <RoleDataState type="error" title={error} onRetry={fetchDocuments} />;
    if (!project) return <RoleDataState type="empty" title="Tidak Ada Proyek Aktif" description="Anda tidak memiliki proyek aktif yang ditugaskan saat ini." />;

    const filteredDocs = documents.filter(doc => 
        doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="animate-fadeIn space-y-6">
            <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Gambar Kerja Lapangan</h2>
                <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Akses visual gambar kerja (DED) untuk panduan pengerjaan fisik di site.</p>
            </div>

            <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Cari nama gambar atau deskripsi..." 
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none transition-all shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredDocs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocs.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-[2.5rem] border border-[var(--dashboard-border)] shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                            <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                <FiFileText size={48} className="text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 right-4">
                                    <span className="px-2 py-1 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg text-[9px] font-black uppercase text-slate-500">
                                        {doc.fileType || "PDF"}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h4 className="text-sm font-black text-slate-800 line-clamp-1">{doc.title}</h4>
                                <p className="text-[11px] text-slate-400 font-medium mt-2 line-clamp-2 flex-1">{doc.description || "Tidak ada deskripsi tambahan."}</p>
                                
                                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Diupdate Pada</span>
                                        <span className="text-[10px] font-bold text-slate-600">{new Date(doc.updatedAt || doc.createdAt).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-colors" title="Lihat">
                                            <FiEye size={16} />
                                        </button>
                                        <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors" title="Download">
                                            <FiDownload size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiFileText size={32} className="text-slate-200" />
                    </div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Belum Ada Gambar Kerja</h3>
                    <p className="text-xs font-bold text-slate-400 italic mt-1 px-10">Gambar kerja resmi belum diunggah oleh Admin atau Pengawas untuk proyek ini.</p>
                </div>
            )}

            <div className="dashboard-card bg-amber-50/30 border-amber-100 flex items-start gap-4">
                <FiClock className="text-amber-500 mt-1 shrink-0" />
                <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-700 mb-1">Peringatan Teknis</h4>
                    <p className="text-[11px] text-amber-600 font-medium leading-relaxed italic">
                        Selalu pastikan Anda menggunakan revisi gambar kerja terbaru. Jika terdapat perbedaan antara gambar kerja dan kondisi lapangan, segera laporkan melalui modul Kendala Lapangan.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MandorGambarKerjaInfoPage;
