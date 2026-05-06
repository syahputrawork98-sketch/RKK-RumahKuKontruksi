import {
  Building2,
  CheckCircle2,
  Users,
  Hammer,
  FolderPlus,
  MessageSquare,
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

const DashboardSuperadmin = () => {
  const stats = [
    { label: "Proyek Berjalan", value: 12, icon: Building2, color: "#1A4D2E" },
    {
      label: "Proyek Selesai",
      value: 34,
      icon: CheckCircle2,
      color: "#16A34A",
    },
    { label: "Total Klien", value: 18, icon: Users, color: "#0EA5A4" },
    { label: "Jumlah Tukang", value: 55, icon: Hammer, color: "#F59E0B" },
  ];

  const activities = [
    {
      id: 1,
      text: "Tukang A memperbarui progres proyek PRJ-002",
      time: "2 jam lalu",
    },
    {
      id: 2,
      text: "Klien B menanyakan RAB proyek PRJ-004",
      time: "5 jam lalu",
    },
    {
      id: 3,
      text: "Admin menambahkan proyek baru PRJ-011",
      time: "1 hari lalu",
    },
  ];

  const deadlines = [
    {
      id: "PK-001",
      name: "Renovasi Rumah Pak Dedi",
      progress: 80,
      due: "2025-11-28",
      colorClass: "bg-orange-400",
    },
    {
      id: "PK-002",
      name: "Pembangunan Ruko Bu Maya",
      progress: 60,
      due: "2025-12-07",
      colorClass: "bg-yellow-400",
    },
    {
      id: "PK-003",
      name: "Kontruksi Rumah Bapak Rian",
      progress: 45,
      due: "2025-12-20",
      colorClass: "bg-red-400",
    },
  ];

  const weeklySummary = [
    { label: "Proyek Baru", value: 3, icon: FolderPlus, color: "#2563EB" },
    { label: "Proyek Selesai", value: 5, icon: CheckCircle2, color: "#16A34A" },
    { label: "Tukang Aktif", value: 12, icon: Hammer, color: "#F59E0B" },
    { label: "Pesan Masuk", value: 9, icon: MessageSquare, color: "#7C3AED" },
  ];

  const projects = [
    {
      kode: "PRJ-011",
      name: "Renovasi Kitchen Set - Pak Dedi",
      progress: 75,
      status: "Berjalan",
      nilai: "Rp 75.000.000",
    },
    {
      kode: "PRJ-007",
      name: "Build Ruko 2 Lantai - Bu Maya",
      progress: 60,
      status: "Berjalan",
      nilai: "Rp 420.000.000",
    },
    {
      kode: "PRJ-003",
      name: "Rumah Baru - Bapak Rian",
      progress: 45,
      status: "Terhambat",
      nilai: "Rp 225.000.000",
    },
  ];

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen">
      <DashboardHeader />
      <DashboardStats stats={stats} />
      <DashboardCharts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardActivity activities={activities} />
        <DashboardDeadlines deadlines={deadlines} />
        <DashboardWeeklySummary summary={weeklySummary} />
      </div>

      <DashboardProjectsTable projects={projects} />
    </div>
  );
};

export default DashboardSuperadmin;
