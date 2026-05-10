import { useEffect, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import adminService from "../../services/adminService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

export default function DataAdminPage() {
  const { selectedSuperadminId } = useSuperadminPersona();
  const [dataAdmin, setDataAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getAdmins();
      setDataAdmin(response.data || []);
    } catch (err) {
      console.error("DataAdminPage: Failed to fetch admins", err);
      setError("Gagal memuat data Admin. Pastikan koneksi database aktif.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSuperadminId) {
      fetchAdmins();
    }
  }, [selectedSuperadminId]);

  if (!selectedSuperadminId) {
    return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengelola data Admin." />;
  }

  if (loading) return <RoleDataState type="loading" message="Memuat data Admin..." />;
  if (error) return <RoleDataState type="error" message={error} onRetry={fetchAdmins} />;

  return (
    <div className="animate-fadeIn">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="dashboard-title text-4xl">Manajemen Admin</h1>
          <p className="dashboard-subtitle text-lg">Kelola daftar persona lokal dan akun simulasi administrator untuk kebutuhan sinkronisasi database localhost.</p>
        </div>
        <div className="flex items-center gap-2 bg-[var(--dashboard-primary-soft)] px-4 py-2 rounded-xl border border-[var(--dashboard-primary)]/10">
          <span className="w-2 h-2 bg-[var(--dashboard-primary)] rounded-full animate-pulse"></span>
          <span className="text-xs font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{dataAdmin.length} Persona Admin</span>
        </div>
      </div>

      {/* TABLE COMPONENT */}
      <AdminTable data={dataAdmin} />
    </div>
  );
}
