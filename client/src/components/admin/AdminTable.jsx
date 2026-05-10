// client/src/components/admin/AdminTable.jsx
import { useState, useEffect } from "react";
import AdminFilters from "./AdminFilters";
import AdminRow from "./AdminRow";
import AdminFormModal from "./AdminFormModal";
import AdminDetailDrawer from "./AdminDetailDrawer";
import adminService from "../../services/adminService";

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
    (item.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const sortedAdmins = [...filteredAdmins].sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return (a.name || "").localeCompare(b.name || "");
      case "name-desc":
        return (b.name || "").localeCompare(a.name || "");
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
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

  const handleDelete = async (admin) => {
    if (!confirm(`Apakah Anda yakin ingin menonaktifkan persona admin ${admin.name}? Akun lokal ini tidak akan dihapus permanen dari database, tetapi akan ditandai sebagai tidak aktif dalam simulasi operasional.`)) return;
    try {
      await adminService.deleteAdmin(admin.id);
      setAdmins((prev) => prev.filter((item) => item.id !== admin.id));
      alert("Persona admin berhasil dinonaktifkan secara lokal.");
    } catch (err) {
      console.error("AdminTable: Failed to deactivate admin", err);
      alert("Gagal menonaktifkan admin. Silakan coba lagi.");
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editingAdmin) {
        const response = await adminService.updateAdmin(editingAdmin.id, formData);
        if (response.success) {
          setAdmins((prev) =>
            prev.map((item) =>
              item.id === editingAdmin.id ? { ...item, ...response.data } : item
            )
          );
          alert("Data admin berhasil diperbarui.");
        }
      } else {
        const response = await adminService.createAdmin(formData);
        if (response.success) {
          setAdmins((prev) => [...prev, response.data]);
          alert("Admin baru berhasil ditambahkan.");
        }
      }
      setIsFormOpen(false);
      setEditingAdmin(null);
    } catch (err) {
      console.error("AdminTable: Failed to save admin", err);
      const errorMsg = err.response?.data?.message || "Gagal menyimpan data admin. Pastikan email unik.";
      alert(errorMsg);
    }
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
          <span>Tambah Persona Lokal</span>
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
              {admins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">!</span>
                      </div>
                      <p className="font-bold">Database Admin Kosong</p>
                      <p className="text-xs italic">Belum ada data admin yang terdaftar di sistem.</p>
                    </div>
                  </td>
                </tr>
              ) : sortedAdmins.length === 0 ? (
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
                    key={admin.id}
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
