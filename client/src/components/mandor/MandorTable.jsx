// client/src/components/mandor/MandorTable.jsx
import React, { useState, useEffect } from "react";
import MandorFilters from "./MandorFilters";
import MandorRow from "./MandorRow";
import MandorFormModal from "./MandorFormModal";
import MandorDetailDrawer from "./MandorDetailDrawer";

export default function MandorTable({ data }) {
  const [mandors, setMandors] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // aktif / non-aktif / all
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
        m.nama_lengkap.toLowerCase().includes(query) ||
        m.email?.toLowerCase().includes(query) ||
        m.nik.toLowerCase().includes(query)
      );
    })
    .filter((m) => {
      if (status === "all") return true;
      if (status === "aktif") return m.status_aktif;
      if (status === "non-aktif") return !m.status_aktif;
      return true;
    });

  const sortedMandors = [...filteredMandors].sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return a.nama_lengkap.localeCompare(b.nama_lengkap);
      case "name-desc":
        return b.nama_lengkap.localeCompare(a.nama_lengkap);
      case "pengalaman-asc":
        return (a.pengalaman_tahun || 0) - (b.pengalaman_tahun || 0);
      case "pengalaman-desc":
        return (b.pengalaman_tahun || 0) - (a.pengalaman_tahun || 0);
      case "newest":
        return (
          new Date(b.tanggal_ditambahkan) - new Date(a.tanggal_ditambahkan)
        );
      case "oldest":
        return (
          new Date(a.tanggal_ditambahkan) - new Date(b.tanggal_ditambahkan)
        );
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

  const handleDelete = (mandor) => {
    if (!confirm(`Hapus mandor ${mandor.nama_lengkap}?`)) return;
    setMandors((prev) => prev.filter((m) => m.id_mandor !== mandor.id_mandor));
  };

  const handleSubmitForm = (formData) => {
    if (editingMandor) {
      setMandors((prev) =>
        prev.map((m) =>
          m.id_mandor === editingMandor.id_mandor ? { ...m, ...formData } : m
        )
      );
    } else {
      const newMandor = {
        ...formData,
        id_mandor: mandors.length + 1, // sementara, nanti dari API/db
        kode_mandor: `MDR${String(mandors.length + 1).padStart(4, "0")}`,
        tanggal_ditambahkan: new Date(),
        status_aktif: true,
      };
      setMandors((prev) => [...prev, newMandor]);
    }
    setIsFormOpen(false);
    setEditingMandor(null);
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
              {sortedMandors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4">
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
                    key={mandor.id_mandor}
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
