import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";

export default function MandorRow({ mandor, onEdit, onDelete, onDetail }) {
  const initials = (mandor.name || "M").charAt(0).toUpperCase();

  return (
    <tr className="hover:bg-[var(--dashboard-surface-soft)] transition-colors group">
      <td className="px-6 py-4">
        <div className="relative">
          {mandor.avatar ? (
            <img
              src={mandor.avatar}
              alt={mandor.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all">
              {initials}
            </div>
          )}
          <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--dashboard-surface)] ${mandor.status === 'active' ? 'bg-emerald-400' : 'bg-slate-300'}`}></div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter mb-1">
            {mandor.id?.slice(0, 8)}...
          </span>
          <span className="font-bold text-[var(--dashboard-text)] leading-none">
            {mandor.name || "-"}
          </span>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest bg-blue-100 text-blue-700">
              Mitra Mandor
            </span>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[var(--dashboard-text)]">
            <span className="text-xs font-bold">{mandor.phone || "-"}</span>
          </div>
          <span className="text-[10px] text-[var(--dashboard-text-muted)] font-medium italic">
            {mandor.email || "-"}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 max-w-xs">
        <p className="text-xs text-[var(--dashboard-text-muted)] truncate" title={mandor.address}>
          {mandor.address || "-"}
        </p>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {mandor.specialization ? (
             <span className="text-[10px] bg-[var(--dashboard-surface-soft)] px-2 py-0.5 rounded border border-[var(--dashboard-border-soft)] text-[var(--dashboard-text)]">
               {mandor.specialization}
             </span>
          ) : (
            <span className="text-[10px] text-[var(--dashboard-text-soft)] italic">Belum diatur</span>
          )}
        </div>
      </td>

      <td className="px-6 py-4 text-center">
        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
          mandor.status === 'active' 
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
            : "bg-slate-50 text-slate-400 border border-slate-100"
        }`}>
          {mandor.status === 'active' ? "Aktif" : "Nonaktif"}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            title="Detail"
            onClick={() => onDetail(mandor)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-blue-600"
          >
            <Eye size={16} />
          </button>

          <button
            title="Edit"
            onClick={() => onEdit(mandor)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Edit2 size={16} />
          </button>

          <button
            title="Hapus"
            onClick={() => onDelete(mandor)}
            className="dashboard-icon-button !p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
