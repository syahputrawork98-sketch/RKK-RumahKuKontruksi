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
  const [latestProjects, setLatestProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, projectsRes] = await Promise.all([
          superadminService.getGlobalStats(),
          projectService.getProjects({ limit: 5 })
        ]);

        if (statsRes.success) setDbStats(statsRes.data);
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
    {
      label: "Proyek Selesai",
      value: dbStats?.projectsFinished || 0,
      icon: CheckCircle2,
      color: "#16A34A",
    },
    { label: "Total Klien", value: dbStats?.customers || 0, icon: Users, color: "#0EA5A4" },
    { label: "Mitra Mandor", value: dbStats?.foremen || 0, icon: HardHat, color: "#F59E0B" },
    { label: "Mitra Arsitek", value: dbStats?.architects || 0, icon: PenTool, color: "#2563EB" },
    { label: "Admin Internal", value: dbStats?.admins || 0, icon: ShieldCheck, color: "#7C3AED" },
    { label: "Pengawas", value: dbStats?.supervisors || 0, icon: HardHat, color: "#0EA5A4" },
  ];

  const activities = [
    {
      id: 1,
      text: "Sistem siap untuk monitoring operasional database-backed.",
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
    <div className="animate-fadeIn">
      <DashboardHeader />
      <DashboardStats stats={stats} />
      
      {/* Visual only charts for now */}
      <DashboardCharts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardActivity activities={activities} />
        {deadlines.length > 0 ? (
            <DashboardDeadlines deadlines={deadlines} />
        ) : (
            <div className="dashboard-card p-6 flex flex-col items-center justify-center text-center border-dashed border-2">
                <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-2">Upcoming Deadlines</p>
                <p className="text-xs text-[var(--dashboard-text-soft)] italic">Data deadline akan muncul otomatis berdasarkan jadwal proyek.</p>
                <span className="mt-4 px-2 py-1 bg-amber-50 text-amber-600 text-[8px] font-black uppercase rounded">Fase Local CRUD</span>
            </div>
        )}
        <DashboardWeeklySummary summary={weeklySummary} />
      </div>

      {latestProjects.length > 0 ? (
        <DashboardProjectsTable projects={latestProjects} />
      ) : (
        <div className="mt-8 dashboard-card p-10 flex flex-col items-center justify-center text-center">
            <h2 className="dashboard-title !text-lg mb-2">Belum Ada Proyek</h2>
            <p className="dashboard-subtitle">Belum ada data proyek konstruksi yang tercatat di database.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardSuperadmin;
