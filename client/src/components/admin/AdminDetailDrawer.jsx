// client/src/components/admin/AdminDetailDrawer.jsx
import { useState } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  FileText,
  Clock,
  Activity,
} from "lucide-react";

export default function AdminDetailDrawer({ isOpen, onClose, admin }) {
  const [activeTab, setActiveTab] = useState("profile");

  if (!isOpen || !admin) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
        >
          <X size={24} />
        </button>

        {/* HEADER */}
        <h2 className="text-heading-s-bold text-primary-main mb-4 text-center">
          Detail Admin
        </h2>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              admin.foto !== "NULL" ? admin.foto : `https://placehold.co/150`
            }
            alt={admin.nama_lengkap}
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <h3 className="text-l-bold text-primary-main">
            {admin.nama_lengkap}
          </h3>
          <span className="text-slate-500">{admin.kode_admin}</span>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-4 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-2 px-4 font-medium ${
              activeTab === "profile"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-slate-500"
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setActiveTab("akun")}
            className={`py-2 px-4 font-medium ${
              activeTab === "akun"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-slate-500"
            }`}
          >
            Akun
          </button>
          <button
            onClick={() => setActiveTab("aktivitas")}
            className={`py-2 px-4 font-medium ${
              activeTab === "aktivitas"
                ? "border-b-2 border-emerald-600 text-emerald-600"
                : "text-slate-500"
            }`}
          >
            Aktivitas
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="space-y-3 text-slate-700 text-sm">
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>
                  <strong>NIK:</strong> {admin.nik || "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>
                  <strong>No HP:</strong> {admin.no_telp || "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>
                  <strong>Alamat:</strong> {admin.alamat || "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>
                  <strong>Tanggal Bergabung:</strong>{" "}
                  {new Date(admin.tanggal_bergabung).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

          {activeTab === "akun" && (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>
                  <strong>Created At:</strong>{" "}
                  {new Date(admin.created_at).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText size={16} />
                <span>
                  <strong>Updated At:</strong>{" "}
                  {new Date(admin.updated_at).toLocaleString()}
                </span>
              </div>
              {admin.status_akun && (
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>
                    <strong>Status Akun:</strong> {admin.status_akun}
                  </span>
                </div>
              )}
            </div>
          )}

          {activeTab === "aktivitas" && (
            <div className="grid grid-cols-1 gap-3">
              {/* Contoh history aktivitas bisa di-pass lewat props */}
              {admin.history && admin.history.length > 0 ? (
                admin.history.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <Activity size={16} className="mt-1" />
                    <div>
                      <div className="text-slate-800">{item.kegiatan}</div>
                      <div className="text-slate-400 text-xs">
                        {new Date(item.tanggal).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400">
                  Belum ada aktivitas
                </div>
              )}
            </div>
          )}
        </div>

        {/* CLOSE BUTTON */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
