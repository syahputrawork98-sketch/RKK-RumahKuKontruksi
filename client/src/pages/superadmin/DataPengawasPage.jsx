import { useEffect, useState } from "react";
import PengawasTable from "../../components/pengawas/PengawasTable";
import supervisorService from "../../services/supervisorService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

export default function DataPengawasPage() {
  const { selectedSuperadminId } = useSuperadminPersona();
  const [dataPengawas, setDataPengawas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataPengawas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await supervisorService.getSupervisors();
      setDataPengawas(response.data || []);
    } catch (err) {
      console.error("DataPengawasPage: Failed to fetch supervisors", err);
      setError("Gagal memuat data Pengawas. Pastikan koneksi database aktif.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSuperadminId) {
        fetchDataPengawas();
    }
  }, [selectedSuperadminId]);

  if (!selectedSuperadminId) {
    return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengelola data Pengawas." />;
  }

  if (loading) return <RoleDataState type="loading" message="Memuat data Pengawas..." />;
  if (error) return <RoleDataState type="error" message={error} onRetry={fetchDataPengawas} />;

  return (
    <div className="animate-fadeIn">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="dashboard-title text-4xl font-black text-[var(--dashboard-text)]">Manajemen Pengawas</h1>
          <p className="dashboard-subtitle text-lg">Kelola daftar persona lokal dan akun simulasi pengawas lapangan untuk sinkronisasi database localhost.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-black text-amber-700 uppercase tracking-widest">{dataPengawas.length} Persona Pengawas</span>
        </div>
      </div>

      {/* TABLE COMPONENT */}
      <PengawasTable data={dataPengawas} />
    </div>
  );
}
