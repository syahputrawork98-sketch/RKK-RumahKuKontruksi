import React, { useState, useEffect, useCallback } from "react";
import { 
    FiLayers, 
    FiActivity, 
    FiClock, 
    FiCreditCard, 
    FiCheckCircle,
    FiTrendingUp,
    FiUsers,
    FiUser,
    FiFileText,
    FiPackage,
    FiAlertCircle
} from "react-icons/fi";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
    DashboardProjectsTable,
} from "@client/components/ui/dashboard";
import adminService from "../../services/adminService";
import RoleDataState from "../../components/common/RoleDataState";
import { useAdminPersona } from "../../context/AdminPersonaContext";

const DashboardAdmin = () => {
    const { selectedAdminId } = useAdminPersona();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const fetchStats = React.useCallback(async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await adminService.getDashboardStats({ adminId: selectedAdminId });
            if (response.success) {
                setStats(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch dashboard stats:", err);
            setError("Gagal memuat data statistik.");
        } finally {
            setLoading(false);
        }
    }, [selectedAdminId]);

    React.useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (loading) return <RoleDataState type="loading" message="Menganalisis data dashboard..." />;
    
    if (!selectedAdminId) {
        return (
            <div className="p-8">
                <RoleDataState 
                    type="empty" 
                    title="Persona Admin Belum Dipilih"
                    message="Silakan pilih persona Admin di Topbar untuk melihat ringkasan operasional." 
                />
            </div>
        );
    }

    if (error) return <RoleDataState type="error" message={error} onRetry={fetchStats} />;

    if (!stats || !stats.projects) return <RoleDataState type="empty" message="Data dashboard tidak tersedia atau masih kosong." />;

    const { projects, customers, financials, recentProjects, reports, materialRequests } = stats;

    // Calculate derived stats
    const totalProjects = Array.isArray(projects) 
        ? projects.reduce((sum, p) => sum + (p._count?._all || p._count || 0), 0)
        : 0;

    const activeProjects = Array.isArray(projects) 
        ? projects.find(p => {
            const s = p.status?.toLowerCase();
            return s === "active" || s === "ongoing" || s === "berjalan";
        })?._count?._all || 0
        : 0;

    const planningProjects = Array.isArray(projects)
        ? projects.find(p => {
            const s = p.status?.toLowerCase();
            return s === "planning" || s === "draft" || s === "persiapan";
        })?._count?._all || 0
        : 0;

    const finishedProjects = Array.isArray(projects)
        ? projects.find(p => {
            const s = p.status?.toLowerCase();
            return s === "finished" || s === "selesai";
        })?._count?._all || 0
        : 0;
    
    // Reports stats
    const pendingReports = reports?.filter(r => {
        const s = r.status?.toLowerCase();
        return s === "submitted" || s === "pending";
    }).reduce((sum, r) => sum + (r._count?._all || 0), 0) || 0;

    const underReviewReports = reports?.find(r => {
        const s = r.status?.toLowerCase();
        return s === "under_admin_review" || s === "start_admin_review";
    })?._count?._all || 0;
    
    // Material stats
    const pendingMaterials = materialRequests?.find(m => {
        const s = m.status?.toLowerCase();
        return s === "approved_by_supervisor" || s === "submitted";
    })?._count?._all || 0;

    const dashboardStats = [
        { label: "Proyek Aktif", value: activeProjects, icon: FiActivity, color: "#10B981" },
        { label: "Dalam Persiapan", value: planningProjects, icon: FiLayers, color: "#0EA5E9" },
        { label: "Request Material", value: pendingMaterials, icon: FiPackage, color: "#F59E0B" },
        { label: "Review Laporan", value: pendingReports + underReviewReports, icon: FiFileText, color: "#7C3AED" },
    ];

    // Synthesize real activities from recent data
    const recentActivities = [
        ...(recentProjects || []).map(p => ({
            id: `proj-${p.id}`,
            text: `Proyek Baru: ${p.name}`,
            time: new Date(p.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            timestamp: new Date(p.createdAt).getTime(),
            type: 'project'
        })),
        ...(stats.recentReports || []).map(r => ({
            id: `rep-${r.id}`,
            text: `Laporan Mingguan [${r.status}]: ${r.project?.name}`,
            time: new Date(r.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            timestamp: new Date(r.createdAt).getTime(),
            type: 'report'
        })),
        ...(stats.recentMaterialRequests || []).map(m => ({
            id: `mat-${m.id}`,
            text: `Request Material [${m.status}]: ${m.project?.name}`,
            time: new Date(m.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
            timestamp: new Date(m.createdAt).getTime(),
            type: 'material'
        }))
    ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);

    // Format projects for table
    const formattedProjects = (recentProjects || []).map(p => ({
        kode: p.projectCode || "PRJ-???",
        name: p.name,
        progress: p.verifiedProgress || 0,
        status: p.status,
        nilai: p.budgetTotal ? `Rp ${(parseFloat(p.budgetTotal) / 1000000).toFixed(0)}jt` : "-"
    }));

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader title="Dashboard Admin" />
            
            <DashboardStats stats={dashboardStats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Operational Alerts */}
                    {(pendingReports > 0 || pendingMaterials > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pendingReports > 0 && (
                                <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-600/20 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Laporan Menunggu</p>
                                        <h4 className="text-xl font-black">{pendingReports} Laporan Baru</h4>
                                    </div>
                                    <a href="/admin/laporan-mingguan-pengawas" className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
                                        <FiActivity />
                                    </a>
                                </div>
                            )}
                            {pendingMaterials > 0 && (
                                <div className="bg-amber-500 p-4 rounded-2xl text-white shadow-lg shadow-amber-500/20 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Logistik</p>
                                        <h4 className="text-xl font-black">{pendingMaterials} Request Material</h4>
                                    </div>
                                    <a href="/admin/request-material" className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
                                        <FiPackage />
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Proyek Terbaru</h3>
                            <a href="/admin/proyek" className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</a>
                        </div>
                        {formattedProjects.length > 0 ? (
                            <DashboardProjectsTable projects={formattedProjects} />
                        ) : (
                            <RoleDataState type="empty" message="Belum ada proyek yang terdaftar." />
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <DashboardActivity activities={recentActivities} title="Monitoring Operasional" />
                    
                    <div className="dashboard-card bg-slate-900 text-white">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-400" /> Fase 3 — Aktif
                        </h3>
                        <p className="text-xs opacity-70 mb-4 leading-relaxed">
                            Fokus Monitoring:
                            <br />• Progress Terverifikasi (SOT)
                            <br />• Review Laporan Pengawas
                            <br />• Publikasi Ringkasan Konsumen
                        </p>
                        <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                            <p className="text-[10px] font-medium italic opacity-90">
                                "Admin memegang kendali publikasi informasi ke Konsumen untuk menjaga integritas data operasional."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
