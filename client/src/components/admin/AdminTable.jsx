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
    <div className="mt-8">
      {/* ACTION BAR: SEARCH & ADD */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <AdminFilters
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
          />
        </div>
        
        <button
          onClick={handleAdd}
          className="dashboard-primary-button flex items-center justify-center gap-2 !py-3"
        >
          <span className="text-xl leading-none">+</span>
          <span>Tambah Admin</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="dashboard-table-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-muted)] border-b border-[var(--dashboard-border-soft)]">
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Profil</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">ID / Nama Lengkap</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Kontak / Email</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Alamat</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Bergabung</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--dashboard-border-soft)] bg-[var(--dashboard-surface)]">
              {sortedAdmins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">?</span>
                      </div>
                      <p className="font-bold">Tidak ada admin ditemukan</p>
                      <p className="text-xs">Coba ubah kata kunci pencarian Anda</p>
                    </div>
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
