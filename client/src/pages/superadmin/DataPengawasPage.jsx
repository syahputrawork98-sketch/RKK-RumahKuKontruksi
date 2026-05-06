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
    <div className="p-6">
      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Data Pengawas</h1>
        <p className="text-slate-600">
          Kelola semua akun pengawas, sertifikasi, dan proyek yang diawasi.
        </p>
      </div>

      {/* TABLE COMPONENT */}
      <PengawasTable data={dataPengawas} />
    </div>
  );
}
