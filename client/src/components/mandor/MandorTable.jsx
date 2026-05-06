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
    <div className="mt-6">
      {/* FILTERS */}
      <MandorFilters
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
          + Tambah Mandor
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
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">No HP</th>
              <th className="px-4 py-3 text-left">Alamat</th>
              <th className="px-4 py-3 text-left">Pengalaman (th)</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Tanggal Ditambahkan</th>
              <th className="px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedMandors.length === 0 ? (
              <tr>
                <td colSpan="11" className="py-10 text-center text-slate-500">
                  Tidak ada mandor yang ditemukan.
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
