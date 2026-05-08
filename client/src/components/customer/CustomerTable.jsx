import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import CustomerRow from "./CustomerRow";
import CustomerFormModal from "./CustomerFormModal";
import customerService from "../../services/customerService";

export default function CustomerTable({ data }) {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    setCustomers(data || []);
  }, [data]);

  const filteredCustomers = customers
    .filter((item) => {
      const query = search.toLowerCase();
      return (
        (item.name || "").toLowerCase().includes(query) ||
        (item.companyName || "").toLowerCase().includes(query) ||
        (item.email || "").toLowerCase().includes(query)
      );
    })
    .filter((item) => {
      if (status === "all") return true;
      return item.status === status;
    });

  const handleAdd = () => {
    setEditingCustomer(null);
    setIsFormOpen(true);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDelete = async (customer) => {
    if (!confirm(`Hapus/Nonaktifkan konsumen ${customer.name || customer.companyName}?`)) return;
    try {
      await customerService.deleteCustomer(customer.id);
      setCustomers((prev) => prev.filter((item) => item.id !== customer.id));
      alert("Konsumen berhasil dinonaktifkan.");
    } catch (err) {
      console.error("CustomerTable: Failed to delete customer", err);
      alert("Gagal menghapus konsumen. Silakan coba lagi.");
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editingCustomer) {
        const response = await customerService.updateCustomer(editingCustomer.id, formData);
        if (response.success) {
          setCustomers((prev) =>
            prev.map((item) =>
              item.id === editingCustomer.id ? { ...item, ...response.data } : item
            )
          );
          alert("Data konsumen berhasil diperbarui.");
        }
      } else {
        const response = await customerService.createCustomer(formData);
        if (response.success) {
          setCustomers((prev) => [...prev, response.data]);
          alert("Konsumen baru berhasil ditambahkan.");
        }
      }
      setIsFormOpen(false);
      setEditingCustomer(null);
    } catch (err) {
      console.error("CustomerTable: Failed to save customer", err);
      alert(err.response?.data?.message || "Gagal menyimpan data konsumen. Pastikan email unik.");
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
              placeholder="Cari konsumen, perusahaan, atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
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
          className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20"
        >
          <span className="text-xl leading-none">+</span>
          <span>Tambah Konsumen</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[var(--dashboard-surface)] rounded-2xl border border-[var(--dashboard-border)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-muted)] border-b border-[var(--dashboard-border-soft)]">
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Tipe</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Nama / Perusahaan</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Kategori</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Kontak</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Alamat</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px] text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--dashboard-border-soft)] bg-[var(--dashboard-surface)]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center text-[var(--dashboard-text-soft)]">
                      <div className="w-16 h-16 bg-[var(--dashboard-surface-soft)] rounded-full flex items-center justify-center mb-4 text-teal-200">
                        <FiSearch size={24} />
                      </div>
                      <p className="font-bold">Tidak ada konsumen ditemukan</p>
                      <p className="text-xs">Coba ubah filter atau kata kunci pencarian Anda</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <CustomerRow
                    key={cust.id}
                    customer={cust}
                    onEdit={() => handleEdit(cust)}
                    onDelete={() => handleDelete(cust)}
                    onDetail={(c) => alert("Detail Konsumen: " + (c.name || c.companyName))}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <CustomerFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmitForm}
        initialData={editingCustomer}
      />
    </div>
  );
}
