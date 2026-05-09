// client/src/components/admin/AdminRow.jsx
import { Eye, Edit2, Trash2 } from "lucide-react";

export default function AdminRow({ admin, onEdit, onDelete, onDetail }) {
  const initials = (admin.name || "A").charAt(0).toUpperCase();

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
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all">
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
            <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest bg-emerald-100 text-emerald-700">
              Staff Admin
            </span>
            {admin.status !== 'active' && (
              <span className="text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest bg-slate-100 text-slate-500">
                Nonaktif
              </span>
            )}
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

      <td className="px-6 py-4 max-w-xs">
        <p className="text-xs text-[var(--dashboard-text-muted)] truncate" title={admin._count?.projects}>
          {admin._count?.projects ?? 0} proyek terhubung
        </p>
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

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-center gap-2">
          <button
            title="Detail"
            onClick={() => onDetail(admin)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-primary)]"
          >
            <Eye size={16} />
          </button>

          <button
            title="Edit"
            onClick={() => onEdit(admin)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Edit2 size={16} />
          </button>

          <button
            title="Nonaktifkan"
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
