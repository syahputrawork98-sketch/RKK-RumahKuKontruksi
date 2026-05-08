// client/src/components/admin/AdminDetailDrawer.jsx
import { X, Mail, Phone, User, Calendar, Clock, Briefcase } from "lucide-react";

export default function AdminDetailDrawer({ isOpen, onClose, admin }) {
  if (!isOpen || !admin) return null;

  const initials = (admin.name || "A").charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-[var(--dashboard-surface)] rounded-2xl w-full max-w-lg p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-text)] p-1 rounded-lg hover:bg-[var(--dashboard-surface-soft)] transition-all"
        >
          <X size={20} />
        </button>

        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center mb-6 pt-2">
          {admin.avatar ? (
            <img
              src={admin.avatar}
              alt={admin.name}
              className="w-24 h-24 rounded-2xl object-cover mb-3 border-4 border-[var(--dashboard-border)]"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-3xl mb-3 border-4 border-[var(--dashboard-border)]">
              {initials}
            </div>
          )}
          <h3 className="text-lg font-black text-[var(--dashboard-text)]">{admin.name || "-"}</h3>
          <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full uppercase tracking-widest mt-1">
            Staff Admin
          </span>
          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest mt-1 ${admin.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
            {admin.status === 'active' ? 'Aktif' : 'Nonaktif'}
          </span>
        </div>

        {/* DETAIL INFO */}
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 bg-[var(--dashboard-surface-soft)] rounded-xl">
              <Mail size={16} className="text-[var(--dashboard-primary)] shrink-0" />
              <div>
                <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">Email</p>
                <p className="text-xs font-bold text-[var(--dashboard-text)]">{admin.email || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[var(--dashboard-surface-soft)] rounded-xl">
              <Phone size={16} className="text-[var(--dashboard-primary)] shrink-0" />
              <div>
                <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">No. Telepon</p>
                <p className="text-xs font-bold text-[var(--dashboard-text)]">{admin.phone || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[var(--dashboard-surface-soft)] rounded-xl">
              <Briefcase size={16} className="text-[var(--dashboard-primary)] shrink-0" />
              <div>
                <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">Proyek Terhubung</p>
                <p className="text-xs font-bold text-[var(--dashboard-text)]">{admin._count?.projects ?? 0} proyek</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-[var(--dashboard-surface-soft)] rounded-xl">
                <Calendar size={16} className="text-[var(--dashboard-primary)] shrink-0" />
                <div>
                  <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">Bergabung</p>
                  <p className="text-xs font-bold text-[var(--dashboard-text)]">
                    {admin.createdAt
                      ? new Date(admin.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--dashboard-surface-soft)] rounded-xl">
                <Clock size={16} className="text-[var(--dashboard-primary)] shrink-0" />
                <div>
                  <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">Diperbarui</p>
                  <p className="text-xs font-bold text-[var(--dashboard-text)]">
                    {admin.updatedAt
                      ? new Date(admin.updatedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl mt-2">
            <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Fase Local CRUD</p>
            <p className="text-[10px] text-amber-600 mt-0.5">Edit/Hapus admin melalui panel Superadmin masih dalam pengembangan.</p>
          </div>
        </div>

        {/* CLOSE ACTION */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
