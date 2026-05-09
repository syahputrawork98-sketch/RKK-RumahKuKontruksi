import React, { useState, useEffect } from "react";
import MandorFilters from "./MandorFilters";
import MandorRow from "./MandorRow";
import MandorFormModal from "./MandorFormModal";
import MandorDetailDrawer from "./MandorDetailDrawer";
import foremanService from "../../services/foremanService";

export default function MandorTable({ data }) {
  const [mandors, setMandors] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); 
  const [sort, setSort] = useState("name-asc");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMandor, setEditingMandor] = useState(null);
  const [detailMandor, setDetailMandor] = useState(null);

  useEffect(() => {
    setMandors(data);
  }, [data]);

  const filteredMandors = mandors
    .filter((m) => {
      const query = search.toLowerCase();
      return (
        (m.name || "").toLowerCase().includes(query) ||
        (m.email || "").toLowerCase().includes(query)
      );
    })
    .filter((m) => {
      if (status === "all") return true;
      return m.status === status;
    });

  const sortedMandors = [...filteredMandors].sort((a, b) => {
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
    setEditingMandor(null);
    setIsFormOpen(true);
  };

  const handleEdit = (mandor) => {
    setEditingMandor(mandor);
    setIsFormOpen(true);
  };

  const handleDelete = async (mandor) => {
    if (!confirm(`Apakah Anda yakin ingin menonaktifkan akun mandor ${mandor.name}? Akun ini tidak akan dihapus permanen tetapi tidak akan bisa ditunjuk sebagai pelaksana proyek baru.`)) return;
    try {
      await foremanService.deleteForeman(mandor.id);
      setMandors((prev) => prev.filter((m) => m.id !== mandor.id));
      alert("Mandor berhasil dinonaktifkan.");
    } catch (err) {
      console.error("MandorTable: Failed to deactivate foreman", err);
      alert("Gagal menonaktifkan mandor. Silakan coba lagi.");
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editingMandor) {
        const response = await foremanService.updateForeman(editingMandor.id, formData);
        if (response.success) {
          setMandors((prev) =>
            prev.map((m) => (m.id === editingMandor.id ? { ...m, ...response.data } : m))
          );
          alert("Data mandor berhasil diperbarui.");
        }
      } else {
        const response = await foremanService.createForeman(formData);
        if (response.success) {
          setMandors((prev) => [...prev, response.data]);
          alert("Mandor baru berhasil ditambahkan.");
        }
      }
      setIsFormOpen(false);
      setEditingMandor(null);
    } catch (err) {
      console.error("MandorTable: Failed to save foreman", err);
      const errorMsg = err.response?.data?.message || "Gagal menyimpan data mandor. Pastikan email unik.";
      alert(errorMsg);
    }
  };

  return (
    <div className="mt-8">
      {/* FILTERS & ACTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <MandorFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            sort={sort}
            setSort={setSort}
          />
        </div>
        
        <button
          onClick={handleAdd}
          className="dashboard-primary-button flex items-center justify-center gap-2 !py-3 bg-blue-600 shadow-blue-600/20"
        >
          <span className="text-xl leading-none">+</span>
          <span>Tambah Mandor</span>
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
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Keahlian</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--dashboard-border-soft)] bg-[var(--dashboard-surface)]">
              {mandors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4 text-blue-200">
                        <span className="text-2xl font-black">!</span>
                      </div>
                      <p className="font-bold">Database Mandor Kosong</p>
                      <p className="text-xs italic">Belum ada data mandor yang terdaftar di sistem.</p>
                    </div>
                  </td>
                </tr>
              ) : sortedMandors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4 text-blue-200">
                        <span className="text-2xl">?</span>
                      </div>
                      <p className="font-bold">Tidak ada mandor ditemukan</p>
                      <p className="text-xs">Coba ubah filter atau kata kunci pencarian Anda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedMandors.map((mandor) => (
                  <MandorRow
                    key={mandor.id}
                    mandor={mandor}
                    onEdit={() => handleEdit(mandor)}
                    onDelete={() => handleDelete(mandor)}
                    onDetail={() => setDetailMandor(mandor)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      <MandorFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingMandor}
      />

      <MandorDetailDrawer
        isOpen={!!detailMandor}
        mandor={detailMandor}
        onClose={() => setDetailMandor(null)}
      />
    </div>
  );
}
