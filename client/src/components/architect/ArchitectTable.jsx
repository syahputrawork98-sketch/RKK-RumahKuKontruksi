import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import ArchitectRow from "./ArchitectRow";
import ArchitectFormModal from "./ArchitectFormModal";
import architectService from "../../services/architectService";

export default function ArchitectTable({ data }) {
  const [architects, setArchitects] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("name-asc");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArchitect, setEditingArchitect] = useState(null);

  useEffect(() => {
    setArchitects(data || []);
  }, [data]);

  const filteredArchitects = architects
    .filter((item) => {
      const query = search.toLowerCase();
      return (
        (item.name || "").toLowerCase().includes(query) ||
        (item.email || "").toLowerCase().includes(query) ||
        (item.specialization || "").toLowerCase().includes(query)
      );
    })
    .filter((item) => {
      if (status === "all") return true;
      return item.status === status;
    });

  const sortedArchitects = [...filteredArchitects].sort((a, b) => {
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
    setEditingArchitect(null);
    setIsFormOpen(true);
  };

  const handleEdit = (architect) => {
    setEditingArchitect(architect);
    setIsFormOpen(true);
  };

  const handleDelete = async (architect) => {
    if (!confirm(`Apakah Anda yakin ingin menonaktifkan persona arsitek ${architect.name}? Akun lokal ini tidak akan dihapus permanen dari database, tetapi akan ditandai sebagai tidak aktif dalam simulasi operasional.`)) return;
    try {
      await architectService.deleteArchitect(architect.id);
      setArchitects((prev) => prev.filter((item) => item.id !== architect.id));
      alert("Persona arsitek berhasil dinonaktifkan secara lokal.");
    } catch (err) {
      console.error("ArchitectTable: Failed to deactivate architect", err);
      alert("Gagal menonaktifkan arsitek. Silakan coba lagi.");
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editingArchitect) {
        const response = await architectService.updateArchitect(editingArchitect.id, formData);
        if (response.success) {
          setArchitects((prev) =>
            prev.map((item) =>
              item.id === editingArchitect.id ? { ...item, ...response.data } : item
            )
          );
          alert("Data arsitek berhasil diperbarui.");
        }
      } else {
        const response = await architectService.createArchitect(formData);
        if (response.success) {
          setArchitects((prev) => [...prev, response.data]);
          alert("Arsitek baru berhasil ditambahkan.");
        }
      }
      setIsFormOpen(false);
      setEditingArchitect(null);
    } catch (err) {
      console.error("ArchitectTable: Failed to save architect", err);
      const errorMsg = err.response?.data?.message || "Gagal menyimpan data arsitek. Pastikan email unik.";
      alert(errorMsg);
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
              placeholder="Cari arsitek, email, atau spesialisasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
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
          className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
        >
          <span className="text-xl leading-none">+</span>
          <span>Tambah Persona Lokal</span>
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
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Spesialisasi</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Bergabung</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--dashboard-border-soft)] bg-[var(--dashboard-surface)]">
              {architects.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4 text-purple-200">
                        <span className="text-2xl font-black">!</span>
                      </div>
                      <p className="font-bold">Database Arsitek Kosong</p>
                      <p className="text-xs italic">Belum ada data arsitek yang terdaftar di sistem.</p>
                    </div>
                  </td>
                </tr>
              ) : sortedArchitects.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4 text-purple-200">
                        <FiSearch size={24} />
                      </div>
                      <p className="font-bold">Tidak ada arsitek ditemukan</p>
                      <p className="text-xs">Coba ubah filter atau kata kunci pencarian Anda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedArchitects.map((arc) => (
                  <ArchitectRow
                    key={arc.id}
                    architect={arc}
                    onEdit={() => handleEdit(arc)}
                    onDelete={() => handleDelete(arc)}
                    onDetail={(a) => alert("Detail Arsitek: " + a.name)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <ArchitectFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingArchitect}
      />
    </div>
  );
}
