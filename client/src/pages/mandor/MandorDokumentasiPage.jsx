import React, { useState, useEffect } from "react";
import { FiCamera, FiImage, FiCalendar, FiMapPin, FiSearch } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import projectService from "../../services/projectService";
import projectDocumentService from "../../services/projectDocumentService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const MandorDokumentasiPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (selectedForemanId) {
            fetchDocumentation();
        }
    }, [selectedForemanId]);

    const fetchDocumentation = async () => {
        try {
            setLoading(true);
            const projRes = await projectService.getProjects({ foremanId: selectedForemanId });
            const activeProj = projRes.data?.find(p => p.status === "Berjalan") || projRes.data?.[0];
            
            if (activeProj) {
                setProject(activeProj);
                // Fetch documents categorized as "Dokumentasi" or "Progress"
                const docsRes = await projectDocumentService.getDocuments({ 
                    projectId: activeProj.id,
                    category: "Progress" // Often used for field documentation
                });
                setDocuments(docsRes.data || []);
            }
            setLoading(false);
        } catch (err) {
            setError(err.message || "Gagal memuat data dokumentasi");
            setLoading(false);
        }
    };

    if (!selectedForemanId) {
        return <RolePersonaEmptyState title="Pilih Persona Mandor" description="Pilih mandor untuk melihat dokumentasi proyek." />;
    }

    if (loading) return <RoleDataState type="loading" message="Memuat dokumentasi proyek..." />;
    if (error) return <RoleDataState type="error" title={error} onRetry={fetchDocumentation} />;
    if (!project) return <RoleDataState type="empty" title="Tidak Ada Proyek Aktif" description="Anda tidak memiliki proyek aktif yang ditugaskan saat ini." />;

    const filteredDocs = documents.filter(doc => 
        doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.stage?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Dokumentasi Proyek</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Galeri foto dan bukti visual progres pelaksanaan di lapangan.</p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-white px-4 py-2 rounded-xl border border-[var(--dashboard-border)] shadow-sm flex items-center gap-2">
                        <FiImage className="text-blue-500" />
                        <span className="text-xs font-black text-slate-700">{documents.length} Foto</span>
                    </div>
                </div>
            </div>

            <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Cari berdasarkan nama, deskripsi, atau tahapan..." 
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none transition-all shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredDocs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredDocs.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-[2rem] border border-[var(--dashboard-border)] shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                            <div className="aspect-square bg-slate-100 relative overflow-hidden">
                                {doc.filePath ? (
                                    <img 
                                        src={doc.filePath} 
                                        alt={doc.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/400x400?text=Foto+Progress";
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FiCamera size={48} className="text-slate-300" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                        <FiImage /> Lihat Detail
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black uppercase rounded-md border border-blue-100">
                                        {doc.stage?.title || "Umum"}
                                    </span>
                                </div>
                                <h4 className="text-xs font-black text-slate-800 line-clamp-1">{doc.title || "Foto Lapangan"}</h4>
                                <div className="mt-3 flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <div className="flex items-center gap-1">
                                        <FiCalendar /> {new Date(doc.createdAt).toLocaleDateString('id-ID')}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FiMapPin /> Site Lapangan
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCamera size={32} className="text-slate-200" />
                    </div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Belum Ada Dokumentasi</h3>
                    <p className="text-xs font-bold text-slate-400 italic mt-1 px-10">Belum ada foto progress yang diunggah untuk proyek ini.</p>
                </div>
            )}
        </div>
    );
};

export default MandorDokumentasiPage;
