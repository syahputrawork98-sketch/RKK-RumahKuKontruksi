import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { FiShield } from "react-icons/fi";

export default function SuperadminRow({ admin, onEdit, onDelete, onDetail }) {
  const initials = (admin.name || "S").charAt(0).toUpperCase();

  return (
    <tr className="hover:bg-[var(--dashboard-surface-soft)] transition-colors group">
      <td className="px-6 py-4">
        <div className="relative">
          {admin.avatar ? (
            <img
              src={admin.avatar}
              alt={admin.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 font-black text-sm ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all">
              {initials}
            </div>
          )}
          <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--dashboard-surface)] ${admin.status === 'active' ? 'bg-emerald-400' : 'bg-slate-300'}`}></div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter mb-1">
            {admin.id?.slice(0, 8)}...
          </span>
          <span className="font-bold text-[var(--dashboard-text)] leading-none">
            {admin.name || "-"}
          </span>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest bg-rose-100 text-rose-700 flex items-center gap-1">
              <FiShield size={8} /> Superadmin
            </span>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[var(--dashboard-text)]">
            <span className="text-xs font-bold">{admin.phone || "-"}</span>
          </div>
          <span className="text-[10px] text-[var(--dashboard-text-muted)] font-medium italic">
            {admin.email || "-"}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-center">
        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
          admin.status === 'active' 
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
            : "bg-slate-50 text-slate-400 border border-slate-100"
        }`}>
          {admin.status === 'active' ? "Aktif" : "Nonaktif"}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[var(--dashboard-text)]">
            {admin.createdAt
              ? new Date(admin.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
              : "-"}
          </span>
          <span className="text-[10px] text-[var(--dashboard-text-soft)]">Join Date</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            title="Edit"
            onClick={() => onEdit(admin)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Edit2 size={16} />
          </button>

          <button
            title="Hapus"
            onClick={() => onDelete(admin)}
            className="dashboard-icon-button !p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
