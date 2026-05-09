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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-8 bg-teal-600 rounded-full"></div>
          <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
            DATA MASTER <span className="text-teal-600 uppercase">Konsumen</span>
          </h1>
        </div>
        <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed">
          Pusat pengelolaan data konsumen retail dan korporat. Validasi profil, monitoring riwayat pengajuan, dan audit data transaksi secara global.
        </p>
      </div>

      {/* TABLE COMPONENT */}
      <CustomerTable data={dataKonsumen} />
    </div>
  );
}
