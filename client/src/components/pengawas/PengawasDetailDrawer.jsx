// client/src/components/pengawas/PengawasDetailDrawer.jsx
import React, { useState } from "react";
import {
  X,
  User,
  Calendar,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  FileText,
  Activity,
  Mail,
  Layers,
} from "lucide-react";

export default function PengawasDetailDrawer({ isOpen, onClose, pengawas }) {
  const [activeTab, setActiveTab] = useState("profile");

  if (!isOpen || !pengawas) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
        >
          <X size={24} />
        </button>

        {/* HEADER */}
        <h2 className="text-heading-s-bold text-primary-main mb-4 text-center">
          Detail Pengawas
        </h2>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              pengawas.foto !== "NULL"
                ? pengawas.foto
                : `https://placehold.co/150`
            }
            alt={pengawas.nama_lengkap}
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <h3 className="text-l-bold text-primary-main">
            {pengawas.nama_lengkap}
          </h3>
          <span className="text-slate-500">{pengawas.kode_pengawas}</span>
          <span
            className={`text-s-bold ${
              pengawas.status_aktif ? "text-primary-main" : "text-danger-main"
            } mt-1`}
          >
            {pengawas.status_aktif ? "Aktif" : "Nonaktif"}
          </span>
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
            Sertifikasi & Proyek
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="space-y-4 text-slate-700 text-sm">
          {/* PROFIL */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>
                  <strong>NIK:</strong> {pengawas.nik || "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>
                  <strong>No HP:</strong> {pengawas.no_telp || "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>
                  <strong>Email:</strong> {pengawas.email || "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>
                  <strong>Alamat:</strong> {pengawas.alamat || "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>
                  <strong>Tanggal Bergabung:</strong>{" "}
                  {pengawas.tanggal_bergabung
                    ? new Date(pengawas.tanggal_bergabung).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
          )}

          {/* AKUN */}
          {activeTab === "akun" && (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>
                  <strong>Created At:</strong>{" "}
                  {pengawas.created_at
                    ? new Date(pengawas.created_at).toLocaleString()
                    : "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText size={16} />
                <span>
                  <strong>Updated At:</strong>{" "}
                  {pengawas.updated_at
                    ? new Date(pengawas.updated_at).toLocaleString()
                    : "-"}
                </span>
              </div>
              {pengawas.terakhir_login && (
                <div className="flex items-center space-x-2">
                  <Activity size={16} />
                  <span>
                    <strong>Login Terakhir:</strong>{" "}
                    {new Date(pengawas.terakhir_login).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span>
                  <strong>Status Akun:</strong>{" "}
                  {pengawas.status_aktif ? "Aktif" : "Nonaktif"}
                </span>
              </div>
            </div>
          )}

          {/* SERTIFIKASI & PROYEK */}
          {activeTab === "aktivitas" && (
            <div className="space-y-4">
              {/* SERTIFIKASI */}
              {pengawas.sertifikasi && pengawas.sertifikasi.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sertifikasi</h3>
                  <ul className="space-y-2">
                    {pengawas.sertifikasi.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-emerald-600" />
                        <span>
                          {s.nama_sertifikasi} ({s.lembaga_penerbit})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* PROYEK */}
              {pengawas.proyek && pengawas.proyek.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Proyek yang Diawasi
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {pengawas.proyek.map((p, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{p.nama_proyek}</span> -{" "}
                        {p.alamat_proyek} ({p.status_proyek})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!pengawas.sertifikasi?.length && !pengawas.proyek?.length && (
                <div className="text-center text-slate-400">
                  Belum ada sertifikasi atau proyek
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
