// client/src/components/admin/AdminTable.jsx
import { useState, useEffect } from "react";
import AdminFilters from "./AdminFilters";
import AdminRow from "./AdminRow";
import AdminFormModal from "./AdminFormModal";
import AdminDetailDrawer from "./AdminDetailDrawer";

export default function AdminTable({ data }) {
  const [admins, setAdmins] = useState(() => data);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [sort, setSort] = useState("name-asc");

  useEffect(() => {
    setAdmins(data);
  }, [data]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [detailAdmin, setDetailAdmin] = useState(null);

  const filteredAdmins = admins.filter((item) =>
    item.nama_lengkap.toLowerCase().includes(search.toLowerCase())
  );
  // .filter((item) => role === "all" || item.role.toLowerCase().startsWith( === role);

  const sortedAdmins = [...filteredAdmins].sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return a.nama_lengkap.localeCompare(b.nama_lengkap);
      case "name-desc":
        return b.nama_lengkap.localeCompare(a.nama_lengkap);
      case "newest":
        return new Date(b.tanggal_bergabung) - new Date(a.tanggal_bergabung);
      case "oldest":
        return new Date(a.tanggal_bergabung) - new Date(b.tanggal_bergabung);
      //   case "last-login":
      //     return new Date(b.terakhir_login) - new Date(a.terakhir_login);
      default:
        return 0;
    }
  });

  const handleAdd = () => {
    setEditingAdmin(null);
    setIsFormOpen(true);
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setIsFormOpen(true);
  };

  const handleDelete = (admin) => {
    if (!confirm(`Hapus admin ${admin.nama}?`)) return;
    setAdmins((prev) =>
      prev.filter((item) => item.id_admin !== admin.id_admin)
    );
  };

  const handleSubmitForm = (formData) => {
    if (editingAdmin) {
      setAdmins((prev) =>
        prev.map((item) =>
          item.id_admin === editingAdmin.id_admin
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      const newAdmin = {
        ...formData,
        id_admin: `ADM-${String(admins.length + 1).padStart(3, "0")}`,
        tanggal_dibuat: new Date(),
        terakhir_login: new Date(),
      };
      setAdmins((prev) => [...prev, newAdmin]);
    }

    setIsFormOpen(false);
    setEditingAdmin(null);
  };

  return (
    <div className="mt-6">
      {/* FILTERS */}
      <AdminFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        sort={sort}
        setSort={setSort}
      />

      {/* ADD BUTTON */}
      <div className="flex justify-end mb-3">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          + Tambah Admin
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Foto</th>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">No HP</th>
              <th className="px-4 py-3 text-left">Alamat</th>
              <th className="px-4 py-3 text-left">Dibuat</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {sortedAdmins.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-10 text-center text-slate-500">
                  Tidak ada admin yang ditemukan.
                </td>
              </tr>
            ) : (
              sortedAdmins.map((admin) => (
                <AdminRow
                  key={admin.id_admin}
                  admin={admin}
                  onEdit={() => handleEdit(admin)}
                  onDelete={() => handleDelete(admin)}
                  onDetail={() => setDetailAdmin(admin)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      <AdminFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingAdmin}
      />

      <AdminDetailDrawer
        isOpen={!!detailAdmin}
        admin={detailAdmin}
        onClose={() => setDetailAdmin(null)}
      />
    </div>
  );
}
