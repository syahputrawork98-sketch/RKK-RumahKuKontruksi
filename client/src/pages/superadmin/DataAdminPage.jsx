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
    <div className="p-6">
      {/* PAGE HEADER */}
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Data Admin</h1>
        <p className="text-slate-600">Kelola semua akun admin & superadmin.</p>
      </div>

      {/* TABLE COMPONENT */}
      <AdminTable data={dataAdmin} />
    </div>
  );
}
