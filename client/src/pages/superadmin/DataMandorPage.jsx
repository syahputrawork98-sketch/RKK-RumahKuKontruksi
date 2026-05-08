import { useEffect, useState } from "react";
import MandorTable from "../../components/mandor/MandorTable";
import foremanService from "../../services/foremanService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

export default function DataMandorPage() {
  const { selectedSuperadminId } = useSuperadminPersona();
  const [dataMandor, setDataMandor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataMandor = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await foremanService.getForemen();
      setDataMandor(response.data || []);
    } catch (err) {
      console.error("DataMandorPage: Failed to fetch foremen", err);
      setError("Gagal memuat data Mitra Mandor. Pastikan koneksi database aktif.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSuperadminId) {
        fetchDataMandor();
    }
  }, [selectedSuperadminId]);

  if (!selectedSuperadminId) {
    return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengelola data Mandor." />;
  }

  if (loading) return <RoleDataState type="loading" message="Memuat data Mandor..." />;
  if (error) return <RoleDataState type="error" message={error} onRetry={fetchDataMandor} />;

  return (
    <div className="animate-fadeIn">
      {/* PAGE HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="dashboard-title text-4xl">Manajemen Mandor</h1>
          <p className="dashboard-subtitle text-lg">Kelola mitra mandor pelaksana, spesialisasi tim, dan database tenaga kerja konstruksi RKK.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">{dataMandor.length} Mitra Mandor</span>
        </div>
      </div>

      {/* TABLE COMPONENT */}
      <MandorTable data={dataMandor} />

      {/* Hold State */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
        <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Fase Local CRUD</p>
        <p className="text-xs text-blue-600">Pendaftaran mandor baru saat ini masih dilakukan melalui proses verifikasi tim operasional.</p>
      </div>
    </div>
  );
}
