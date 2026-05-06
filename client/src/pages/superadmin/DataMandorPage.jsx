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
    <div className="p-6">
      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Data Mandor</h1>
        <p className="text-slate-600">
          Kelola semua mandor proyek. Tambah, edit, lihat detail, atau hapus
          data mandor.
        </p>
      </div>

      {/* TABLE COMPONENT */}
      <MandorTable data={dataMandor} />
    </div>
  );
}
