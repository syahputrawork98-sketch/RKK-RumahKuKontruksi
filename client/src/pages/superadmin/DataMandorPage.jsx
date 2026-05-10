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
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="dashboard-title text-4xl font-black text-[var(--dashboard-text)]">Direktori Persona Mandor</h1>
          <p className="dashboard-subtitle text-lg italic">Manajemen direktori persona lokal untuk role Mandor. Superadmin mengelola entitas database ini untuk simulasi operasional di localhost.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Local Persona Directory</span>
        </div>
      </div>

      {/* TABLE COMPONENT */}
      <MandorTable data={dataMandor} />
    </div>
  );
}
