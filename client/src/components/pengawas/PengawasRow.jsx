import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";

export default function PengawasRow({ pengawas, onEdit, onDelete, onDetail }) {
  const initials = (pengawas.name || "P").charAt(0).toUpperCase();

  return (
    <tr className="hover:bg-[var(--dashboard-surface-soft)] transition-colors group">
      <td className="px-6 py-4">
        <div className="relative">
          {pengawas.avatar ? (
            <img
              src={pengawas.avatar}
              alt={pengawas.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-black text-sm ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all">
              {initials}
            </div>
          )}
          <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--dashboard-surface)] ${pengawas.status === 'active' ? 'bg-emerald-400' : 'bg-slate-300'}`}></div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter mb-1">
            {pengawas.id?.slice(0, 8)}...
          </span>
          <span className="font-bold text-[var(--dashboard-text)] leading-none">
            {pengawas.name || "-"}
          </span>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest bg-amber-100 text-amber-700">
              Pengawas Lapangan
            </span>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[var(--dashboard-text)]">
            <span className="text-xs font-bold">{pengawas.phone || "-"}</span>
          </div>
          <span className="text-[10px] text-[var(--dashboard-text-muted)] font-medium italic">
            {pengawas.email || "-"}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 max-w-xs">
        <p className="text-xs text-[var(--dashboard-text-muted)] truncate" title={pengawas.city}>
          {pengawas.city || "-"}
        </p>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[var(--dashboard-text)]">
            {pengawas.createdAt
              ? new Date(pengawas.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
              : "-"}
          </span>
          <span className="text-[10px] text-[var(--dashboard-text-soft)]">Join Date</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            title="Detail"
            onClick={() => onDetail(pengawas)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-amber-600"
          >
            <Eye size={16} />
          </button>

          <button
            title="Edit"
            onClick={() => onEdit(pengawas)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Edit2 size={16} />
          </button>

          <button
            title="Hapus"
            onClick={() => onDelete(pengawas)}
            className="dashboard-icon-button !p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
