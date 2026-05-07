// client/src/components/admin/AdminRow.jsx
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

export default function AdminRow({ admin, onEdit, onDelete, onDetail }) {
  return (
    <tr className="hover:bg-[var(--dashboard-surface-soft)] transition-colors group">
      <td className="px-6 py-4">
        <div className="relative">
          <img
            src={admin.foto !== "NULL" ? admin.foto : `https://placehold.co/200`}
            alt="avatar"
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-[var(--dashboard-border-soft)] group-hover:ring-[var(--dashboard-primary)]/30 transition-all"
          />
          <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--dashboard-surface)] ${admin.role === 'superadmin' ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter mb-1">
            {admin.id_admin}
          </span>
          <span className="font-bold text-[var(--dashboard-text)] leading-none">
            {admin.nama_lengkap}
          </span>
          <div className="flex items-center gap-1 mt-2">
            <span
              className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-widest ${
                admin.role === "superadmin" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {admin.role === "superadmin" ? "Superadmin" : "Staff Admin"}
            </span>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[var(--dashboard-text)]">
             <span className="text-xs font-bold">{admin.no_telp}</span>
          </div>
          <span className="text-[10px] text-[var(--dashboard-text-muted)] font-medium italic">admin@rkk.co.id</span>
        </div>
      </td>

      <td className="px-6 py-4 max-w-xs">
        <p className="text-xs text-[var(--dashboard-text-muted)] truncate" title={admin.alamat}>
          {admin.alamat}
        </p>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[var(--dashboard-text)]">
            {new Date(admin.tanggal_bergabung).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
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
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-amber-600"
          >
            <Edit2 size={16} />
          </button>

          <button 
            title="Hapus" 
            onClick={() => onDelete(admin)}
            className="dashboard-icon-button !p-2 bg-red-50 text-red-600 hover:bg-red-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
