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
    <div className="mt-6">
      {/* FILTERS */}
      <PengawasFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {/* ADD BUTTON */}
      <div className="flex justify-end mb-3">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          + Tambah Pengawas
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
              <th className="px-4 py-3 text-left">NIK</th>
              <th className="px-4 py-3 text-left">No HP</th>
              <th className="px-4 py-3 text-left">Alamat</th>
              <th className="px-4 py-3 text-left">Tanggal Bergabung</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {sortedPengawas.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-10 text-center text-slate-500">
                  Tidak ada pengawas yang ditemukan.
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
