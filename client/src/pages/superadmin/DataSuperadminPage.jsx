import React, { useState, useEffect } from "react";
import superadminService from "../../services/superadminService";
import SuperadminTable from "../../components/superadmin/SuperadminTable";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

export default function DataSuperadminPage() {
  const { selectedSuperadminId } = useSuperadminPersona();
  const [dataAdmins, setDataAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await superadminService.getSuperadmins();
      setDataAdmins(response.data || []);
    } catch (err) {
      console.error("DataSuperadminPage: Failed to fetch data", err);
      setError("Gagal mengambil data superadmin. Pastikan koneksi database aktif.");
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
    return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengelola database superadmin." />;
  }

  if (loading) return <RoleDataState type="loading" message="Memuat data Superadmin..." />;
  if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

  return (
    <div className="animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="dashboard-title text-4xl font-black text-[var(--dashboard-text)]">Direktori Superadmin</h1>
          <p className="dashboard-subtitle text-lg italic text-amber-600 font-bold">Peringatan: Anda sedang mengelola daftar persona Superadmin. Akses ini hanya untuk simulasi Local Development.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none">Local Governance Profile</span>
        </div>
      </div>

      {/* TABLE COMPONENT */}
      <SuperadminTable data={dataAdmins} />
    </div>
  );
}
