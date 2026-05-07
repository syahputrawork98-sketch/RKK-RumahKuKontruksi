// client/src/pages/superadmin/DataPengawasPage.jsx

import { useEffect, useState } from "react";
import PengawasTable from "../../components/pengawas/PengawasTable";

export default function DataPengawasPage() {
  const [dataPengawas, setDataPengawas] = useState([]);

  const fetchDataPengawas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pengawas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (!response.ok) {
        if (result.success === false) throw new Error(result.message);
      }

      setDataPengawas(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataPengawas();
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* PAGE HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="dashboard-title text-4xl">Manajemen Pengawas</h1>
          <p className="dashboard-subtitle text-lg">Kelola akun pengawas lapangan, sertifikasi teknis, dan alokasi pengawasan proyek RKK.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">{dataPengawas.length} Pengawas Aktif</span>
        </div>
      </div>

      {/* TABLE COMPONENT */}
      <PengawasTable data={dataPengawas} />
    </div>
  );
}
