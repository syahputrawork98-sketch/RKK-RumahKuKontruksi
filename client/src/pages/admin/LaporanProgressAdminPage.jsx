import React, { useState, useEffect, useCallback } from "react";
import { 
    FiActivity, FiSearch, FiExternalLink, FiUser, 
    FiCalendar, FiClock, FiX, FiInfo, FiTrendingUp 
} from "react-icons/fi";
import projectService from "../../services/projectService";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import progressService from "../../services/progressService";
import RoleDataState from "../../components/common/RoleDataState";

const LaporanProgressAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    
    // History Side Panel State
    const [selectedProject, setSelectedProject] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const fetchProjects = useCallback(async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await projectService.getProjects({ adminId: selectedAdminId });
            if (response.success) {
                setProjects(response.data);
            }
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data progress proyek.");
        } finally {
            setLoading(false);
        }
    }, [selectedAdminId]);

    const fetchHistory = async (projectId) => {
        try {
            setHistoryLoading(true);
            const response = await progressService.getProjectProgressHistory(projectId, selectedAdminId);
            if (response.success) {
                setHistory(response.data.history);
            }
        } catch (err) {
            console.error("Failed to fetch progress history:", err);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (!selectedAdminId) {
        return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    }

    const handleOpenHistory = (project) => {
        setSelectedProject(project);
        fetchHistory(project.id);
    };

    const filteredProjects = projects.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.projectCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && projects.length === 0) {
        return <RoleDataState type="loading" message="Memuat monitoring progress..." />;
    }

    if (error) {
        return <RoleDataState type="error" message={error} onRetry={fetchProjects} />;
    }

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Progress Terverifikasi</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic font-medium">
                        Source of Truth (SOT) progress fisik berdasarkan verifikasi Pengawas.
                    </p>
                </div>
                <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Cari proyek atau kode..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 pr-4 py-3 rounded-2xl bg-white border border-[var(--dashboard-border)] text-sm font-medium focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 focus:outline-none w-full md:w-64 transition-all"
                    />
                </div>
            </div>

            {/* Warning Info */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-start gap-3 text-blue-800">
                <FiInfo className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-[11px] font-bold leading-relaxed">
                        <span className="font-black uppercase tracking-widest text-[9px] mr-2">Catatan Admin:</span>
                        Progress terverifikasi hanya dapat diperbarui oleh Pengawas melalui aplikasi lapangan. Admin hanya memonitor dan melakukan publikasi ringkasan untuk konsumen.
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="dashboard-card overflow-hidden !p-0 border-slate-200 shadow-xl shadow-slate-200/20">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)] bg-slate-50/50">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Proyek & Kode</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Pengawas Lapangan</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Progress</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Update Terakhir</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">History</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--dashboard-border)]">
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter mb-0.5">{project.projectCode}</span>
                                            <span className="text-sm font-bold text-slate-800 leading-tight">{project.name}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{project.customer?.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {project.supervisor ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                                    {project.supervisor.avatar ? (
                                                        <img src={project.supervisor.avatar} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <FiUser className="text-[10px] text-slate-400" />
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold text-slate-700">{project.supervisor.name}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">Belum Assign</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 min-w-[100px] h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)] transition-all duration-1000" 
                                                    style={{ width: `${project.verifiedProgress ?? 0}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-black text-blue-700 w-10">{project.verifiedProgress ?? 0}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <FiCalendar className="text-[10px]" />
                                            <span className="text-[11px] font-bold uppercase tracking-tighter">
                                                {project.verifiedProgressUpdatedAt ? new Date(project.verifiedProgressUpdatedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleOpenHistory(project)}
                                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                            title="Lihat Log Perubahan"
                                        >
                                            <FiClock className="text-lg" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredProjects.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-2 text-slate-400">
                                            <FiActivity className="text-4xl opacity-20" />
                                            <p className="text-xs font-black uppercase tracking-widest italic">Data proyek tidak ditemukan.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* History Slide-Over / Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end">
                    <div 
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
                        onClick={() => setSelectedProject(null)}
                    ></div>
                    
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-slideInRight flex flex-col">
                        {/* Panel Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 flex items-center gap-2">
                                    <FiClock className="text-blue-600" /> Log Perubahan Progress
                                </h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{selectedProject.name}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedProject(null)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-all text-slate-400 hover:text-slate-800"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        {/* Panel Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {historyLoading ? (
                                <div className="flex flex-col items-center justify-center h-40 gap-3">
                                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Memuat Log...</p>
                                </div>
                            ) : history.length === 0 ? (
                                <div className="text-center py-12">
                                    <FiActivity className="text-4xl text-slate-100 mx-auto mb-4" />
                                    <p className="text-xs font-bold text-slate-400 italic">Belum ada riwayat verifikasi untuk proyek ini.</p>
                                </div>
                            ) : (
                                <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                                    {history.map((log, idx) => (
                                        <div key={log.id} className="relative pl-10 group">
                                            <div className={`absolute left-0 top-0.5 w-7 h-7 rounded-full flex items-center justify-center z-10 border-2 transition-all ${
                                                idx === 0 ? 'bg-blue-600 border-blue-100' : 'bg-white border-slate-100'
                                            }`}>
                                                <FiTrendingUp className={`text-[10px] ${idx === 0 ? 'text-white' : 'text-slate-400'}`} />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                        {new Date(log.createdAt).toLocaleString('id-ID', { 
                                                            day: '2-digit', month: 'short', year: 'numeric', 
                                                            hour: '2-digit', minute: '2-digit' 
                                                        })}
                                                    </span>
                                                    <span className="text-xs font-black text-blue-600">
                                                        {log.previousProgress}% → {log.newProgress}%
                                                    </span>
                                                </div>
                                                
                                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:border-blue-200 transition-all">
                                                    <p className="text-xs font-medium text-slate-600 italic leading-relaxed">"{log.notes}"</p>
                                                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
                                                        <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center">
                                                            <FiUser className="text-[8px] text-slate-500" />
                                                        </div>
                                                        <span className="text-[9px] font-black uppercase text-slate-400">Pengawas: {log.supervisor?.name || 'Unknown'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Panel Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50">
                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed text-center italic">
                                * Riwayat di atas adalah catatan perubahan progress resmi proyek.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LaporanProgressAdminPage;
