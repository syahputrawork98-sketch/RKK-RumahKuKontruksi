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
    FiClock
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

const DashboardMandor = () => {
    const navigate = useNavigate();
    const { selectedForeman, selectedForemanId } = useForemanPersona();
    const [projects, setProjects] = useState([]);
    const [recentJournals, setRecentJournals] = useState([]);
    const [statsData, setStatsData] = useState(null);
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
                
                const [projRes, statsRes, journalRes] = await Promise.all([
                    projectService.getProjects({ foremanId: selectedForemanId }),
                    foremanService.getForemanStats(selectedForemanId),
                    weeklyJournalService.getWeeklyJournals({ 
                        actorRole: "mandor", 
                        actorId: selectedForemanId,
                        foremanId: selectedForemanId 
                    })
                ]);
                
                if (projRes.success) setProjects(projRes.data);
                if (statsRes.success) setStatsData(statsRes.data);
                if (journalRes.success) setRecentJournals(journalRes.data.slice(0, 3));
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Gagal mengambil data operasional dari database.");
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
        ['submitted', 'approved_by_supervisor'].includes(m.status?.toLowerCase())
    ).reduce((sum, m) => sum + (m._count?._all || 0), 0) || 0;

    const avgProgress = projects.length > 0 
        ? Math.round(projects.reduce((acc, p) => acc + (p.verifiedProgress || 0), 0) / projects.length) 
        : 0;

    const stats = [
        { label: "Proyek Aktif", value: activeProjectsCount, icon: FiLayers, color: "#1A4D2E" },
        { label: "Jurnal Pending", value: pendingJournalsCount, icon: FiList, color: "#0EA5E9" },
        { label: "Progres Terverifikasi", value: `${avgProgress}%`, icon: FiActivity, color: "#16A34A" },
        { label: "Request Material", value: pendingMaterialsCount, icon: FiShoppingCart, color: "#F59E0B" },
        { label: "Kendala Lapangan", value: 0, icon: FiAlertTriangle, color: "#E11428" },
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
    const priorityTasks = []; // Future: Daily Tasks model
    const recentActivities = []; // Future: Combined Logbook

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
                        <div className="dashboard-card bg-slate-100 dark:bg-slate-800/50 text-slate-400 p-6 relative overflow-hidden border-dashed">
                            <h3 className="font-bold text-xs uppercase tracking-widest opacity-80 mb-2">Laporan Harian (Hold)</h3>
                            <p className="text-2xl font-black mb-1 italic">Belum Tersedia</p>
                            <p className="text-[10px] opacity-70">Modul laporan harian masih dalam tahap pengembangan schema.</p>
                            <button disabled className="mt-4 px-4 py-2 bg-slate-200 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed">Segera Hadir</button>
                            <FiFileText className="absolute -right-4 -bottom-4 text-slate-500/10 w-24 h-24" />
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
                    <div className="dashboard-card min-h-[200px] flex flex-col items-center justify-center text-center p-8 border-dashed">
                        <FiActivity size={32} className="text-slate-200 mb-2" />
                        <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)]">Logbook Aktivitas</h3>
                        <p className="text-[10px] text-slate-400 mt-2 italic">Aktivitas mingguan akan muncul di sini setelah jurnal disubmit.</p>
                    </div>
                    
                    <div className="dashboard-card border-dashed">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Kendala Lapangan (Hold)</h3>
                        <div className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-2 border-dashed border-slate-50 rounded-2xl italic">
                            Modul kendala sedang disiapkan
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMandor;
