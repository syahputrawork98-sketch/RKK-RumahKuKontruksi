import React, { useState, useEffect } from "react";
import architectService from "../../services/architectService";
import ArchitectTable from "../../components/architect/ArchitectTable";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

export default function DataArsitekPage() {
  const { selectedSuperadminId } = useSuperadminPersona();
  const [dataArsitek, setDataArsitek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await architectService.getArchitects();
      setDataArsitek(response.data || []);
    } catch (err) {
      console.error("DataArsitekPage: Failed to fetch data", err);
      setError("Gagal mengambil data arsitek. Pastikan koneksi database aktif.");
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
    return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengelola data Arsitek." />;
  }

  if (loading) return <RoleDataState type="loading" message="Memuat data Arsitek..." />;
  if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

  return (
    <div className="animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
          <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)] uppercase">
            DATA MASTER <span className="text-indigo-600">Arsitek</span>
          </h1>
        </div>
        <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed italic">
          Kelola daftar persona lokal dan database mitra arsitek untuk simulasi kolaborasi desain dan sinkronisasi tender localhost.
        </p>
      </div>

      {/* TABLE COMPONENT */}
      <ArchitectTable data={dataArsitek} />
    </div>
  );
}
