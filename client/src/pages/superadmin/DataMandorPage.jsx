// client/src/pages/superadmin/DataMandorPage.jsx
import { useEffect, useState } from "react";
import MandorTable from "../../components/mandor/MandorTable";

export default function DataMandorPage() {
  const [dataMandor, setDataMandor] = useState([]);

  const fetchDataMandor = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/mandor", {
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

      setDataMandor(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataMandor();
  }, []);

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
    </div>
  );
}
