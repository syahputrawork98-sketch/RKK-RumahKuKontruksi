import React, { useState, useEffect } from "react";
import {
  Building2,
  CheckCircle2,
  Users,
  HardHat,
  PenTool,
  FolderPlus,
  MessageSquare,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

import {
  DashboardHeader,
  DashboardStats,
  DashboardCharts,
  DashboardActivity,
  DashboardDeadlines,
  DashboardWeeklySummary,
  DashboardProjectsTable,
} from "@client/components/ui/dashboard";
import superadminService from "../../services/superadminService";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

const DashboardSuperadmin = () => {
  const { selectedSuperadminId } = useSuperadminPersona();
  const [dbStats, setDbStats] = useState(null);
  const [superadminCount, setSuperadminCount] = useState(0);
  const [latestProjects, setLatestProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, projectsRes, superRes] = await Promise.all([
        superadminService.getGlobalStats(),
        projectService.getProjects({ limit: 5 }),
        superadminService.getSuperadmins()
      ]);

      if (statsRes.success) setDbStats(statsRes.data);
      if (superRes.success) setSuperadminCount((superRes.data || []).length);
      
      if (projectsRes.success) {
          setLatestProjects((projectsRes.data || []).map(p => ({
              kode: p.projectCode,
              name: p.name,
              progress: p.verifiedProgress || p.progress || 0,
              status: p.status,
              nilai: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p.budgetTotal)
          })));
      }
    } catch (err) {
      console.error("DashboardSuperadmin: Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSuperadminId) {
        fetchData();
    }
  }, [selectedSuperadminId]);

  if (!selectedSuperadminId) {
    return <RoleDataState type="empty" message="Silakan pilih persona Superadmin terlebih dahulu untuk melihat dashboard." />;
  }

  if (loading) return <RoleDataState type="loading" message="Memuat Dashboard Superadmin..." />;

  const stats = [
    { label: "Proyek Berjalan", value: dbStats?.projectsRunning || 0, icon: Building2, color: "#1A4D2E" },
    { label: "Proyek Selesai", value: dbStats?.projectsFinished || 0, icon: CheckCircle2, color: "#16A34A" },
    { label: "Total Klien", value: dbStats?.customers || 0, icon: Users, color: "#0EA5A4" },
    { label: "Mitra Mandor", value: dbStats?.foremen || 0, icon: HardHat, color: "#F59E0B" },
    { label: "Mitra Arsitek", value: dbStats?.architects || 0, icon: PenTool, color: "#2563EB" },
    { label: "Admin Internal", value: dbStats?.admins || 0, icon: ShieldCheck, color: "#7C3AED" },
    { label: "Pengawas", value: dbStats?.supervisors || 0, icon: HardHat, color: "#0EA5A4" },
    { label: "Superadmin", value: superadminCount, icon: ShieldCheck, color: "#EF4444" },
  ];

  const activities = [
    {
      id: 1,
      text: "Sistem monitoring operasional database-backed aktif.",
      time: "Aktif",
    }
  ];

  const deadlines = []; // Hold state for deadlines

  const weeklySummary = [
    { label: "Proyek Baru", value: "-", icon: FolderPlus, color: "#2563EB" },
    { label: "Proyek Selesai", value: "-", icon: CheckCircle2, color: "#16A34A" },
    { label: "Mitra Mandor Aktif", value: "-", icon: HardHat, color: "#F59E0B" },
    { label: "Pesan Masuk", value: "-", icon: MessageSquare, color: "#7C3AED" },
  ];

  return (
    <div className="animate-fadeIn pb-10">
      <DashboardHeader 
        title="Superadmin Local Governance" 
        subtitle="Monitoring pusat data operasional, audit relasi persona, dan integrasi sistem RKK dalam lingkungan Local Development."
        buttonLabel="Audit Log"
        buttonIcon={ClipboardList}
      />
      <DashboardStats stats={stats} />
      
      {/* Visual only charts for now - Marked as Hold in component */}
      <DashboardCharts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardActivity activities={activities} title="Aktivitas Global" />
        
        <div className="dashboard-card p-6 flex flex-col items-center justify-center text-center border-dashed border-2 bg-gray-50/50">
            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-2">Upcoming Deadlines</p>
            <p className="text-xs text-[var(--dashboard-text-soft)] italic">Data deadline akan muncul otomatis berdasarkan jadwal proyek.</p>
            <span className="mt-4 px-2 py-1 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded border border-amber-100">Fase Local CRUD - Hold</span>
        </div>

        <div className="relative group">
            <div className="absolute inset-0 bg-[var(--dashboard-surface)]/40 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white/90 px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-500 shadow-sm border border-gray-100">Hold Section</span>
            </div>
            <DashboardWeeklySummary summary={weeklySummary} />
        </div>
      </div>

      {latestProjects.length > 0 ? (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black tracking-tight">Proyek Terbaru</h3>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">Audit View</span>
            </div>
            <DashboardProjectsTable projects={latestProjects} />
        </div>
      ) : (
        <div className="mt-8 dashboard-card p-12 flex flex-col items-center justify-center text-center border-dashed">
            <Building2 className="w-12 h-12 text-gray-200 mb-4" />
            <h2 className="dashboard-title !text-lg mb-2">Database Proyek Kosong</h2>
            <p className="dashboard-subtitle text-xs">Belum ada data proyek konstruksi yang tercatat di database lokal Anda.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardSuperadmin;
