// client/src/components/pengawas/PengawasTable.jsx
import React, { useState, useEffect } from "react";
import PengawasFilters from "./PengawasFilters";
import PengawasRow from "./PengawasRow";
import PengawasFormModal from "./PengawasFormModal";
import PengawasDetailDrawer from "./PengawasDetailDrawer";

export default function PengawasTable({ data }) {
  const [pengawas, setPengawas] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("name-asc");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPengawas, setEditingPengawas] = useState(null);
  const [detailPengawas, setDetailPengawas] = useState(null);

  useEffect(() => {
    setPengawas(data);
  }, [data]);

  const filteredPengawas = pengawas
    .filter((item) => {
      const query = search.toLowerCase();
      return (
        item.nama_lengkap.toLowerCase().includes(query) ||
        (item.nik && item.nik.includes(query))
      );
    })
    .filter((item) => {
      if (status === "all") return true;
      if (status === "aktif") return item.status_aktif !== false;
      if (status === "nonaktif") return item.status_aktif === false;
      return true;
    });

  const sortedPengawas = [...filteredPengawas].sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return a.nama_lengkap.localeCompare(b.nama_lengkap);
      case "name-desc":
        return b.nama_lengkap.localeCompare(a.nama_lengkap);
      case "newest":
        return new Date(b.tanggal_bergabung) - new Date(a.tanggal_bergabung);
      case "oldest":
        return new Date(a.tanggal_bergabung) - new Date(b.tanggal_bergabung);
      default:
        return 0;
    }
  });

  const handleAdd = () => {
    setEditingPengawas(null);
    setIsFormOpen(true);
  };

  const handleEdit = (pengawas) => {
    setEditingPengawas(pengawas);
    setIsFormOpen(true);
  };

  const handleDelete = (pengawas) => {
    if (!confirm(`Hapus pengawas ${pengawas.nama_lengkap}?`)) return;
    setPengawas((prev) =>
      prev.filter((item) => item.id_pengawas !== pengawas.id_pengawas)
    );
  };

  const handleSubmitForm = (formData) => {
    if (editingPengawas) {
      setPengawas((prev) =>
        prev.map((item) =>
          item.id_pengawas === editingPengawas.id_pengawas
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      const newPengawas = {
        ...formData,
        id_pengawas: `PGW-${String(pengawas.length + 1).padStart(4, "0")}`,
        tanggal_bergabung: new Date(),
      };
      setPengawas((prev) => [...prev, newPengawas]);
    }

    setIsFormOpen(false);
    setEditingPengawas(null);
  };

  return (
    <div className="mt-8">
      {/* FILTERS & ACTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <PengawasFilters
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
          className="dashboard-primary-button flex items-center justify-center gap-2 !py-3 bg-amber-600 shadow-amber-600/20"
        >
          <span className="text-xl leading-none">+</span>
          <span>Tambah Pengawas</span>
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
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">NIK / No HP</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Alamat</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Bergabung</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--dashboard-border-soft)] bg-[var(--dashboard-surface)]">
              {sortedPengawas.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">?</span>
                      </div>
                      <p className="font-bold">Tidak ada pengawas ditemukan</p>
                      <p className="text-xs">Coba ubah filter atau kata kunci pencarian Anda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedPengawas.map((pgw) => (
                  <PengawasRow
                    key={pgw.id_pengawas}
                    pengawas={pgw}
                    onEdit={() => handleEdit(pgw)}
                    onDelete={() => handleDelete(pgw)}
                    onDetail={() => setDetailPengawas(pgw)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL & DRAWER */}
      <PengawasFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingPengawas}
      />

      <PengawasDetailDrawer
        isOpen={!!detailPengawas}
        pengawas={detailPengawas}
        onClose={() => setDetailPengawas(null)}
      />
    </div>
  );
}
