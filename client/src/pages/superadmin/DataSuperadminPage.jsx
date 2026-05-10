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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-8 bg-rose-600 rounded-full"></div>
          <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)] uppercase">
            DATA MASTER <span className="text-rose-600">Superadmin</span>
          </h1>
        </div>
        <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed italic">
          Kelola daftar persona lokal superadmin sistem untuk kebutuhan simulasi monitoring global dan sinkronisasi database localhost.
        </p>
      </div>

      {/* TABLE COMPONENT */}
      <SuperadminTable data={dataAdmins} />
    </div>
  );
}
