import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
    FiLayers, 
    FiList, 
    FiActivity, 
    FiFileText,
    FiShoppingCart,
    FiAlertTriangle,
    FiUsers,
    FiInfo,
    FiStar,
    FiClock,
    FiChevronRight,
    FiCheckCircle
} from "react-icons/fi";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
} from "@client/components/ui/dashboard";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import projectService from "../../services/projectService";
import foremanService from "../../services/foremanService";
import weeklyJournalService from "../../services/weeklyJournalService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";
import dailyTaskService from "../../services/dailyTaskService";
import dailyReportService from "../../services/dailyReportService";
import fieldIssueService from "../../services/fieldIssues.service";

const DashboardMandor = () => {
    const navigate = useNavigate();
    const { selectedForeman, selectedForemanId } = useForemanPersona();
    const [projects, setProjects] = useState([]);
    const [recentJournals, setRecentJournals] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [statsData, setStatsData] = useState(null);
    const [activeIssues, setActiveIssues] = useState(0);
    const [recentReports, setRecentReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!selectedForemanId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError(null);
                
                const results = await Promise.allSettled([
                    projectService.getProjects({ foremanId: selectedForemanId }),
                    foremanService.getForemanStats(selectedForemanId),
                    weeklyJournalService.getWeeklyJournals({ 
                        actorRole: "mandor", 
                        actorId: selectedForemanId,
                        foremanId: selectedForemanId 
                    }),
                    dailyTaskService.getAllTasks({ foremanId: selectedForemanId }),
                    dailyReportService.getAllReports({ foremanId: selectedForemanId }),
                    fieldIssueService.getFieldIssues({ foremanId: selectedForemanId })
                ]);
                
                const [projRes, statsRes, journalRes, tasksRes, reportsRes, issuesRes] = results;
                
                if (projRes.status === 'fulfilled' && projRes.value.success) setProjects(projRes.value.data);
                if (statsRes.status === 'fulfilled' && statsRes.value.success) setStatsData(statsRes.value.data);
                if (journalRes.status === 'fulfilled' && journalRes.value.success) setRecentJournals(journalRes.value.data.slice(0, 3));
                if (tasksRes.status === 'fulfilled' && tasksRes.value.success) setPendingTasks(tasksRes.value.data.slice(0, 5));
                if (reportsRes.status === 'fulfilled' && reportsRes.value.success) {
                    setRecentReports(reportsRes.value.data.slice(0, 3));
                }
                if (issuesRes.status === 'fulfilled' && issuesRes.value.data) {
                    const count = issuesRes.value.data.filter(iss => 
                        ['open', 'in_review'].includes(iss.status?.toLowerCase())
                    ).length;
                    setActiveIssues(count);
                }

                // If critical projects fetch failed
                if (projRes.status === 'rejected') {
                    setError("Gagal mengambil data proyek.");
                }
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Terjadi kesalahan sistem saat memuat dashboard.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [selectedForemanId]);

    // Calculate dynamic stats
    const activeProjectsCount = statsData?.activeProjects || 0;
    const pendingJournalsCount = statsData?.journals?.filter(j => 
        ['draft', 'submitted'].includes(j.status?.toLowerCase())
    ).reduce((sum, j) => sum + (j._count?._all || 0), 0) || 0;
    
    const pendingMaterialsCount = statsData?.materialRequests?.filter(m => 
        ['submitted', 'approved', 'approved_by_supervisor', 'approved_by_admin', 'processing'].includes(m.status?.toLowerCase())
    ).reduce((sum, m) => sum + (m._count?._all || 0), 0) || 0;

    const avgProgress = projects.length > 0 
        ? Math.round(projects.reduce((acc, p) => acc + (p.verifiedProgress || 0), 0) / projects.length) 
        : 0;

    const stats = [
        { label: "Proyek Aktif", value: activeProjectsCount, icon: FiLayers, color: "#1A4D2E", href: "/mandor/proyek-aktif" },
        { label: "Jurnal Pending", value: pendingJournalsCount, icon: FiList, color: "#0EA5E9", href: "/mandor/jurnal-mingguan" },
        { label: "Progres Terverifikasi", value: `${avgProgress}%`, icon: FiActivity, color: "#16A34A", href: "/mandor/proyek-aktif" },
        { label: "Request Material", value: pendingMaterialsCount, icon: FiShoppingCart, color: "#F59E0B", href: "/mandor/request-material" },
        { label: "Kendala Lapangan", value: activeIssues, icon: FiAlertTriangle, color: "#E11428", href: "/mandor/kendala-lapangan" },
    ];

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Mandor Terlebih Dahulu"
                description="Pilih akun Mandor untuk melihat proyek aktif dan pekerjaan lapangan yang sedang berjalan."
            />
        );
    }

    if (loading && projects.length === 0 && !error) {
        return <RoleDataState type="loading" message="Menyiapkan dashboard operasional Anda..." />;
    }

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    // In current local development, priority tasks and recent activities are focused on Weekly Journals

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader 
                title={`Halo, ${selectedForeman?.name || 'Mandor'}`}
                subtitle={`Anda memiliki ${activeProjectsCount} proyek aktif yang perlu dipantau.`}
            />

            <div className="bg-blue-500/5 border border-blue-500/10 p-3 rounded-xl flex items-center gap-3">
                <FiInfo className="text-blue-500 text-xs" />
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    Progres resmi proyek (SOT) sepenuhnya berasal dari hasil verifikasi Pengawas di lapangan.
                </p>
            </div>
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* WEEKLY JOURNAL SUMMARY (Replacing priority tasks placeholder) */}
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Jurnal Mingguan Terbaru</h3>
                            <button 
                                onClick={() => navigate("/mandor/jurnal-mingguan")}
                                className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline"
                            >
                                Lihat Semua
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentJournals.length > 0 ? (
                                recentJournals.map((journal) => (
                                    <Link 
                                        key={journal.id} 
                                        to={`/mandor/jurnal-mingguan/${journal.id}`}
                                        className="flex items-center justify-between p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] group hover:border-[var(--dashboard-primary)] transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[var(--dashboard-primary)] shadow-sm">
                                                <FiFileText size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-tight">{journal.project?.projectCode || 'PROYEK'}</p>
                                                <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)]">{new Date(journal.weekStartDate).toLocaleDateString('id-ID')} - {new Date(journal.weekEndDate).toLocaleDateString('id-ID')}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <StatusBadge type="journal" status={journal.status} />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="p-10 text-center text-slate-400 font-medium border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl italic">
                                    Belum ada aktivitas jurnal terbaru yang tercatat.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="dashboard-card space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Laporan Harian Terbaru</h3>
                                <button onClick={() => navigate("/mandor/laporan-harian")} className="text-[10px] font-bold text-emerald-600 hover:underline">Logbook</button>
                            </div>
                            <div className="space-y-2">
                                {recentReports.length > 0 ? (
                                    recentReports.map(report => (
                                        <div key={report.id} className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-800">{new Date(report.reportDate).toLocaleDateString('id-ID')}</p>
                                                <p className="text-[8px] font-medium text-slate-500 uppercase">{report.weather || 'Cerah'} • {report.totalWorkers || 0} Pekerja</p>
                                            </div>
                                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${
                                                report.status === 'reviewed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                                {report.status}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-4 text-center text-[10px] font-medium text-slate-400 italic">Belum ada laporan harian.</div>
                                )}
                            </div>
                        </div>
                        <div className="dashboard-card p-6 flex flex-col justify-between border-dashed bg-[var(--dashboard-primary)]/5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-primary)]">Pengalaman Lokal</h3>
                                <FiStar className="text-[var(--dashboard-primary)]" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-[var(--dashboard-border)] pb-2">
                                    <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">Total Proyek</span>
                                    <span className="text-sm font-black">{(statsData?.activeProjects || 0) + (statsData?.finishedProjects || 0)}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[var(--dashboard-border)] pb-2">
                                    <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">Aktivitas Kerja</span>
                                    <span className="text-sm font-black">{statsData?.activitiesCount || 0}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">Jurnal Disetujui</span>
                                    <span className="text-sm font-black">
                                        {statsData?.journals?.find(j => j.status === 'approved')?._count?._all || 0}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-4 text-[9px] font-bold text-[var(--dashboard-text-soft)] italic uppercase leading-tight">
                                Ringkasan berdasarkan aktivitas lokal Anda di sistem.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Tugas Hari Ini</h3>
                            <button onClick={() => navigate("/mandor/tugas-harian")} className="text-[10px] font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</button>
                        </div>
                        <div className="space-y-3">
                            {pendingTasks.filter(t => ['todo', 'in_progress'].includes(t.status?.toLowerCase())).length > 0 ? (
                                pendingTasks
                                    .filter(t => ['todo', 'in_progress'].includes(t.status?.toLowerCase()))
                                    .slice(0, 5)
                                    .map(task => (
                                        <div key={task.id} className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)] flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'}`} />
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold line-clamp-1">{task.title}</span>
                                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{task.project?.projectCode || task.projectId}</span>
                                                </div>
                                            </div>
                                            <FiChevronRight className="text-slate-300" size={12} />
                                        </div>
                                    ))
                            ) : (
                                <div className="py-4 text-center text-[10px] font-medium text-slate-400 italic">Tidak ada tugas tertunda.</div>
                            )}
                        </div>
                    </div>
                    
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-primary)]">Kendala Lapangan Aktif</h3>
                            <Link to="/mandor/kendala-lapangan" className="text-[10px] font-bold text-[var(--dashboard-primary)] hover:underline uppercase tracking-tighter">Lapor Baru</Link>
                        </div>
                        <div className="space-y-3">
                            {activeIssues > 0 ? (
                                <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-red-600 uppercase">Perhatian Diperlukan</span>
                                    </div>
                                    <p className="text-xs font-bold text-red-800 dark:text-red-300">Anda memiliki {activeIssues} kendala lapangan yang sedang aktif atau dalam peninjauan.</p>
                                    <button 
                                        onClick={() => navigate("/mandor/kendala-lapangan")}
                                        className="mt-3 w-full py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                                    >
                                        Buka Monitoring Kendala
                                    </button>
                                </div>
                            ) : (
                                <div className="py-8 text-center bg-[var(--dashboard-surface-soft)] rounded-2xl border border-dashed border-[var(--dashboard-border)]">
                                    <FiCheckCircle className="mx-auto text-emerald-500 mb-2 opacity-50" size={24} />
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Semua Aman</p>
                                    <p className="text-[8px] text-slate-400 mt-1 px-4 italic">Belum ada laporan kendala yang aktif saat ini.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMandor;
