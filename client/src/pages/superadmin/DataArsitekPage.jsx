import React, { useState, useEffect } from "react";
import architectService from "../../services/architectService";
import ArchitectTable from "../../components/architect/ArchitectTable";
import RoleDataState from "../../components/common/RoleDataState";

export default function DataArsitekPage() {
  const [dataArsitek, setDataArsitek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await architectService.getAllArchitects();
      setDataArsitek(response.data || []);
      setError(null);
    } catch (err) {
      console.error("DataArsitekPage: Failed to fetch data", err);
      setError("Gagal mengambil data arsitek dari server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <RoleDataState type="loading" message="Menghubungkan ke database..." />;
  if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

  return (
    <div className="animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
          <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
            DATA MASTER <span className="text-purple-600 uppercase">Arsitek</span>
          </h1>
        </div>
        <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed">
          Manajemen profil mitra arsitek, monitoring kapasitas desain, dan audit portofolio desain proyek RKK secara terpusat.
        </p>
      </div>

      {/* TABLE COMPONENT */}
      <ArchitectTable data={dataArsitek} />
    </div>
  );
}
