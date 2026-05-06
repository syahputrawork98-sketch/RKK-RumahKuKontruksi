// client/src/components/pengawas/PengawasRow.jsx
import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";

// IconButton kecil untuk aksi
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

export default function PengawasRow({ pengawas, onEdit, onDelete, onDetail }) {
  return (
    <tr className="hover:bg-slate-50 transition">
      {/* FOTO */}
      <td className="pl-4 py-3">
        <img
          src={
            pengawas.foto !== "NULL"
              ? pengawas.foto
              : `https://placehold.co/200`
          }
          alt="avatar"
          className="w-10 rounded-full object-cover text-m-regular text-primary-main"
        />
      </td>

      {/* KODE */}
      <td className="px-4 py-3 text-m-bold text-primary-main">
        {pengawas.kode_pengawas}
      </td>

      {/* NAMA */}
      <td className="px-4 py-3 text-m-bold text-primary-main">
        {pengawas.nama_lengkap}
      </td>

      {/* NIK */}
      <td className="px-4 py-3 text-m-regular text-primary-main">
        {pengawas.nik || "-"}
      </td>

      {/* NO HP */}
      <td className="px-4 py-3 text-m-regular text-primary-main">
        {pengawas.no_telp || "-"}
      </td>

      {/* ALAMAT */}
      <td
        className="px-4 py-3 max-w-xs truncate text-m-regular text-primary-main"
        title={pengawas.alamat || "-"}
      >
        {pengawas.alamat || "-"}
      </td>

      {/* TANGGAL BERGABUNG */}
      <td className="px-4 py-3 text-m-regular text-primary-main">
        {pengawas.tanggal_bergabung
          ? new Date(pengawas.tanggal_bergabung).toLocaleDateString()
          : "-"}
      </td>

      {/* AKSI */}
      <td className="px-4 py-3 text-m-regular text-primary-main">
        <div className="flex items-center gap-2">
          <IconButton title="Detail" onClick={onDetail}>
            <Eye size={14} />
          </IconButton>

          <IconButton title="Edit" onClick={onEdit}>
            <Edit2 size={14} />
          </IconButton>

          <IconButton
            title="Hapus"
            onClick={onDelete}
            className="border-red-300 hover:bg-red-50 text-red-600"
          >
            <Trash2 size={14} />
          </IconButton>
        </div>
      </td>
    </tr>
  );
}
