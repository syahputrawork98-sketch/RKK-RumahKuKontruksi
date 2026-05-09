import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import SuperadminRow from "./SuperadminRow";
import SuperadminFormModal from "./SuperadminFormModal";
import superadminService from "../../services/superadminService";

export default function SuperadminTable({ data }) {
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  useEffect(() => {
    setAdmins(data || []);
  }, [data]);

  const filteredAdmins = admins
    .filter((item) => {
      const query = search.toLowerCase();
      return (
        (item.name || "").toLowerCase().includes(query) ||
        (item.email || "").toLowerCase().includes(query)
      );
    })
    .filter((item) => {
      if (status === "all") return true;
      return item.status === status;
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
    if (!confirm(`Apakah Anda yakin ingin menonaktifkan akun superadmin ${admin.name}? Akun ini tidak akan terhapus permanen namun tidak bisa digunakan untuk masuk ke sistem.`)) return;
    try {
      const response = await superadminService.deleteSuperadmin(admin.id);
      if (response.success) {
        setAdmins((prev) => prev.filter((item) => item.id !== admin.id));
        alert("Akun superadmin berhasil dinonaktifkan.");
      } else {
        alert(response.message || "Gagal menonaktifkan akun.");
      }
    } catch (err) {
      console.error("SuperadminTable: Failed to delete superadmin", err);
      alert(err.response?.data?.message || "Terjadi kesalahan saat menghubungi server.");
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editingAdmin) {
        const response = await superadminService.updateSuperadmin(editingAdmin.id, formData);
        if (response.success) {
          setAdmins((prev) =>
            prev.map((item) =>
              item.id === editingAdmin.id ? { ...item, ...response.data } : item
            )
          );
          alert("Akun superadmin berhasil diperbarui.");
        } else {
          alert(response.message || "Gagal memperbarui akun.");
        }
      } else {
        const response = await superadminService.createSuperadmin(formData);
        if (response.success) {
          setAdmins((prev) => [...prev, response.data]);
          alert("Akun superadmin baru berhasil ditambahkan.");
        } else {
          alert(response.message || "Gagal menambahkan akun baru.");
        }
      }
      setIsFormOpen(false);
      setEditingAdmin(null);
    } catch (err) {
      console.error("SuperadminTable: Failed to save superadmin", err);
      alert(err.response?.data?.message || "Gagal menghubungi server database.");
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {/* FILTERS & ACTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
            <input
              type="text"
              placeholder="Cari nama atau email superadmin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold text-[var(--dashboard-text-soft)] focus:outline-none"
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
        </div>
        
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20"
        >
          <span className="text-xl leading-none">+</span>
          <span>Tambah Superadmin</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[var(--dashboard-surface)] rounded-2xl border border-[var(--dashboard-border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-muted)] border-b border-[var(--dashboard-border-soft)]">
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Profil</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">ID / Nama</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Kontak</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Bergabung</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--dashboard-border-soft)] bg-[var(--dashboard-surface)]">
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4 text-rose-200">
                        <FiSearch size={24} />
                      </div>
                      <p className="font-bold">Tidak ada akun ditemukan</p>
                      <p className="text-xs">Coba ubah filter atau kata kunci pencarian Anda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <SuperadminRow
                    key={admin.id}
                    admin={admin}
                    onEdit={() => handleEdit(admin)}
                    onDelete={() => handleDelete(admin)}
                    onDetail={(a) => alert("Detail: " + a.name)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <SuperadminFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingAdmin}
      />
    </div>
  );
}
