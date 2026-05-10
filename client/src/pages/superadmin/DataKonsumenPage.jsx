import React, { useState, useEffect } from "react";
import customerService from "../../services/customerService";
import CustomerTable from "../../components/customer/CustomerTable";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

export default function DataKonsumenPage() {
  const { selectedSuperadminId } = useSuperadminPersona();
  const [dataKonsumen, setDataKonsumen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await customerService.getAllCustomers();
      setDataKonsumen(response.data || []);
    } catch (err) {
      console.error("DataKonsumenPage: Failed to fetch data", err);
      setError("Gagal mengambil data konsumen. Pastikan koneksi database aktif.");
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
    return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengelola data Konsumen." />;
  }

  if (loading) return <RoleDataState type="loading" message="Memuat data Konsumen..." />;
  if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

  return (
    <div className="animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="dashboard-title text-4xl font-black text-[var(--dashboard-text)]">Direktori Persona Konsumen</h1>
          <p className="dashboard-subtitle text-lg italic">Manajemen direktori persona lokal untuk role Konsumen. Superadmin mengelola entitas database ini untuk simulasi operasional di localhost.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Local Persona Directory</span>
        </div>
      </div>

      {/* TABLE COMPONENT */}
      <CustomerTable data={dataKonsumen} />
    </div>
  );
}
