import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import StatusBadge from "../common/StatusBadge";

export default function ArchitectRow({ architect, onEdit, onDelete, onDetail }) {
  const initials = (architect.name || "A").charAt(0).toUpperCase();

  return (
    <tr className="hover:bg-[var(--dashboard-surface-soft)] transition-colors group">
      <td className="px-6 py-4">
        <div className="relative">
          {architect.avatar ? (
            <img
              src={architect.avatar}
              alt={architect.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-black text-sm ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all">
              {initials}
            </div>
          )}
          <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--dashboard-surface)] ${architect.status === 'active' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-300'}`}></div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter mb-1">
            {architect.id?.slice(0, 8)}...
          </span>
          <span className="font-bold text-[var(--dashboard-text)] leading-none">
            {architect.name || "-"}
          </span>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest bg-purple-100 text-purple-700 border border-purple-200">
              Mitra Arsitek
            </span>
            <StatusBadge type="user" status={architect.status || 'active'} />
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[var(--dashboard-text)]">
            <span className="text-xs font-bold">{architect.phone || "-"}</span>
          </div>
          <span className="text-[10px] text-[var(--dashboard-text-muted)] font-medium italic">
            {architect.email || "-"}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {architect.specialization ? (
             <span className="text-[10px] bg-[var(--dashboard-surface-soft)] px-2 py-0.5 rounded border border-[var(--dashboard-border-soft)] text-[var(--dashboard-text)] font-bold">
               {architect.specialization}
             </span>
          ) : (
            <span className="text-[10px] text-[var(--dashboard-text-soft)] italic">Belum diatur</span>
          )}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[var(--dashboard-text)]">
            {architect.createdAt
              ? new Date(architect.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
              : "-"}
          </span>
          <span className="text-[10px] text-[var(--dashboard-text-soft)] uppercase font-black tracking-tighter">Join Date</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            title="Detail Persona"
            onClick={() => onDetail(architect)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-purple-600"
          >
            <Eye size={16} />
          </button>

          <button
            title="Edit Persona"
            onClick={() => onEdit(architect)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Edit2 size={16} />
          </button>

          <button
            title={architect.status === 'active' ? "Nonaktifkan Persona" : "Aktifkan Persona"}
            onClick={() => onDelete(architect)}
            className={`dashboard-icon-button !p-2 transition-colors ${architect.status === 'active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
