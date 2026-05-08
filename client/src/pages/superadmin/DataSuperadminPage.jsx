import React, { useState, useEffect } from "react";
import superadminService from "../../services/superadminService";
import SuperadminTable from "../../components/superadmin/SuperadminTable";
import RoleDataState from "../../components/common/RoleDataState";

export default function DataSuperadminPage() {
  const [dataAdmins, setDataAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await superadminService.getSuperadmins();
      setDataAdmins(response.data || []);
      setError(null);
    } catch (err) {
      console.error("DataSuperadminPage: Failed to fetch data", err);
      setError("Gagal mengambil data superadmin dari server.");
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
          <div className="w-2 h-8 bg-rose-600 rounded-full"></div>
          <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
            DATA MASTER <span className="text-rose-600 uppercase">Superadmin</span>
          </h1>
        </div>
        <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed">
          Manajemen otoritas tertinggi sistem. Kelola akun superadmin, hak akses root, dan pantau aktivitas administratif global untuk memastikan keamanan sistem.
        </p>
      </div>

      {/* TABLE COMPONENT */}
      <SuperadminTable data={dataAdmins} />
    </div>
  );
}
