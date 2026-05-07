// client/src/pages/superadmin/DataAdminPage.jsx
import { useEffect, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";

export default function DataAdminPage() {
  const [dataAdmin, setDataAdmin] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/admin", {
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

      setDataAdmin(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);
  return (
    <div className="animate-fadeIn">
      {/* PAGE HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="dashboard-title text-4xl">Manajemen Admin</h1>
          <p className="dashboard-subtitle text-lg">Kelola akun administrator, hak akses, dan monitoring aktivitas staff internal RKK.</p>
        </div>
        <div className="flex items-center gap-2 bg-[var(--dashboard-primary-soft)] px-4 py-2 rounded-xl border border-[var(--dashboard-primary)]/10">
          <span className="w-2 h-2 bg-[var(--dashboard-primary)] rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-[var(--dashboard-primary)] uppercase tracking-widest">{dataAdmin.length} Total Admin</span>
        </div>
      </div>

      {/* TABLE COMPONENT */}
      <AdminTable data={dataAdmin} />
    </div>
  );
}
