// client/src/components/mandor/MandorRow.jsx
import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";

// Tombol kecil untuk aksi
function IconButton({ children, onClick, title = "", className = "" }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border hover:bg-slate-50 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default function MandorRow({ mandor, onEdit, onDelete, onDetail }) {
  return (
    <tr className="hover:bg-slate-50 transition">
      <td className="pl-4 py-3">
        <img
          src={
            mandor.foto !== "NULL" ? mandor.foto : `https://placehold.co/200`
          }
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover text-m-regular text-primary-main"
        />
      </td>

      <td className="px-4 py-3 text-m-bold text-primary-main">
        {mandor.kode_mandor}
      </td>

      <td className="px-4 py-3 text-m-regular text-primary-main">
        {mandor.nama_lengkap}
      </td>
      <td className="px-4 py-3 text-m-regular text-primary-main">
        {mandor.nik}
      </td>
      <td className="px-4 py-3 text-m-regular text-primary-main">
        {mandor.email}
      </td>
      <td className="px-4 py-3 text-m-regular text-primary-main">
        {mandor.no_hp}
      </td>

      <td
        className="px-4 py-3 max-w-xs truncate text-m-regular text-primary-main"
        title={mandor.alamat}
      >
        {mandor.alamat}
      </td>

      <td className="px-4 py-3 text-m-regular text-primary-main">
        {mandor.pengalaman_tahun || 0}
      </td>

      <td className="px-4 py-3">
        <span
          className={`px-2 py-0.5 rounded-md text-white ${
            mandor.status_aktif ? "bg-primary-main" : "bg-danger-main"
          }`}
        >
          {mandor.status_aktif ? "Aktif" : "Non-Aktif"}
        </span>
      </td>

      <td className="px-4 py-3 text-m-regular text-primary-main">
        {new Date(mandor.tanggal_ditambahkan).toLocaleDateString()}
      </td>

      <td className="px-4 py-3 text-m-regular text-primary-main">
        <div className="flex items-center gap-2">
          <IconButton title="Detail" onClick={() => onDetail(mandor)}>
            <Eye size={14} />
          </IconButton>

          <IconButton title="Edit" onClick={() => onEdit(mandor)}>
            <Edit2 size={14} />
          </IconButton>

          <IconButton
            title="Hapus"
            onClick={() => onDelete(mandor)}
            className="border-red-300 hover:bg-red-50 text-red-600"
          >
            <Trash2 size={14} />
          </IconButton>
        </div>
      </td>
    </tr>
  );
}
