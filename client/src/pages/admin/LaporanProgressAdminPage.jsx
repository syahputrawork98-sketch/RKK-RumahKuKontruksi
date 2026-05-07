import React, { useState, useEffect } from "react";
import { FiActivity, FiSearch, FiExternalLink, FiUser, FiCalendar } from "react-icons/fi";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";

const LaporanProgressAdminPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await projectService.getProjects();
            if (response.success) {
                setProjects(response.data);
            }
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data progress proyek.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.projectCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading && projects.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={fetchProjects}
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Monitoring Progress Proyek</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic font-medium">
                        Progress resmi hasil verifikasi Pengawas di lapangan.
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

            <div className="dashboard-card overflow-hidden !p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--dashboard-border)] bg-[var(--dashboard-surface-soft)]">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Proyek</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Pengawas</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Verified Progress</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Update Terakhir</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--dashboard-border)]">
                            {filteredProjects.map((project) => (
                                <tr key={project.id} className="hover:bg-[var(--dashboard-surface-soft)] transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter mb-0.5">{project.projectCode}</span>
                                            <span className="text-sm font-bold text-slate-800 dark:text-white leading-tight">{project.name}</span>
                                            <span className="text-[10px] font-medium text-slate-400">Cust: {project.customer?.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {project.supervisor ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                                    {project.supervisor.avatar ? (
                                                        <img src={project.supervisor.avatar} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <FiUser className="text-[10px] text-slate-400" />
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold">{project.supervisor.name}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-bold text-slate-300 uppercase">Belum Ditugaskan</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 min-w-[80px] h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-emerald-500" 
                                                    style={{ width: `${project.verifiedProgress || 0}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-black text-emerald-600">{project.verifiedProgress || 0}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <FiCalendar className="text-[10px]" />
                                            <span className="text-[11px] font-medium">
                                                {project.verifiedProgressUpdatedAt ? new Date(project.verifiedProgressUpdatedAt).toLocaleDateString() : '-'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                                            project.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'
                                        }`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-[var(--dashboard-primary)] transition-all">
                                            <FiExternalLink />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredProjects.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-xs font-bold text-slate-400 uppercase tracking-widest italic">
                                        Tidak ada data proyek ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl flex items-start gap-3">
                <FiActivity className="text-amber-500 mt-0.5" />
                <div>
                    <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Catatan Admin</h4>
                    <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
                        Data di atas adalah progress resmi (SOT) yang telah diverifikasi oleh Pengawas. Admin hanya dapat memonitor data ini untuk kebutuhan pelaporan. Untuk perubahan progress manual, hubungi tim operasional.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LaporanProgressAdminPage;
