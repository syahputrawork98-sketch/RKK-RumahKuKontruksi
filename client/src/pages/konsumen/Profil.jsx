import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import GovernanceNotice from "../../components/common/GovernanceNotice";
import * as governanceService from "../../services/governanceService";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import React, { useState, useEffect } from "react";
import customerService from "../../services/customerService";
import RoleDataState from "../../components/common/RoleDataState";

const Profil = () => {
  const { selectedCustomerId, selectedCustomer, refreshCustomerData, loading: personaLoading } = useCustomerPersona();
  const [user, setUser] = useState({
    nama: "",
    email: "",
    nomor: "",
    alamat: "",
    tanggalBergabung: "",
    fotoProfil: "",
    idKonsumen: "",
    jumlahProyek: 0,
    statusAkun: "Aktif",
    identityNumber: "",
    occupation: "",
    notes: "",
    customerType: "",
    companyName: "",
    picName: "",
    picPosition: "",
    taxNumber: "",
    businessField: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (personaLoading) return;

    if (selectedCustomer) {
      setUser({
        nama: selectedCustomer.name || "",
        email: selectedCustomer.email || "",
        nomor: selectedCustomer.phone || "",
        alamat: selectedCustomer.address || "",
        tanggalBergabung: selectedCustomer.createdAt ? new Date(selectedCustomer.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-",
        fotoProfil: selectedCustomer.avatar || `https://ui-avatars.com/api/?name=${selectedCustomer.name || 'User'}&background=0D9488&color=fff`,
        idKonsumen: selectedCustomer.id || "",
        jumlahProyek: selectedCustomer._count?.projects || 0,
        statusAkun: "Aktif",
        identityNumber: selectedCustomer.identityNumber || "",
        occupation: selectedCustomer.occupation || "",
        notes: selectedCustomer.notes || "",
        customerType: selectedCustomer.customerType || "individual",
        companyName: selectedCustomer.companyName || "",
        picName: selectedCustomer.picName || "",
        picPosition: selectedCustomer.picPosition || "",
        taxNumber: selectedCustomer.taxNumber || "",
        businessField: selectedCustomer.businessField || ""
      });
      setLoading(false);
      setError(null);
    } else if (selectedCustomerId && !personaLoading) {
      // If we have an ID but no customer in context, it's an error
      setError("Profil tidak ditemukan di database.");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [selectedCustomer, selectedCustomerId, personaLoading]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Simpan perubahan
  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        name: user.nama,
        email: user.email,
        phone: user.nomor,
        address: user.alamat,
        identityNumber: user.identityNumber,
        occupation: user.occupation,
        notes: user.notes,
        avatar: user.fotoProfil,
        companyName: user.companyName,
        picName: user.picName,
        picPosition: user.picPosition,
        taxNumber: user.taxNumber,
        businessField: user.businessField
      };

      const sensitiveFields = ['email', 'phone', 'identityNumber'];
      const sensitiveChanges = [];
      
      if (user.email !== selectedCustomer.email) sensitiveChanges.push({ field: 'email', old: selectedCustomer.email, new: user.email });
      if (user.nomor !== selectedCustomer.phone) sensitiveChanges.push({ field: 'phone', old: selectedCustomer.phone, new: user.nomor });
      if (user.identityNumber !== selectedCustomer.identityNumber) sensitiveChanges.push({ field: 'identityNumber', old: selectedCustomer.identityNumber, new: user.identityNumber });

      if (sensitiveChanges.length > 0) {
        for (const change of sensitiveChanges) {
          await governanceService.createProfileChangeRequest({
            targetRole: 'customer',
            targetId: selectedCustomerId,
            requestedByRole: 'customer',
            requestedById: selectedCustomerId,
            fieldName: change.field,
            oldValue: change.old,
            newValue: change.new,
            status: 'pending'
          });
        }
        alert("Beberapa perubahan data sensitif telah dikirim ke antrian approval Admin. Data non-sensitif lainnya akan segera diperbarui.");
      }

      await customerService.updateCustomer(selectedCustomerId, payload);
      
      // Refresh context data
      if (refreshCustomerData) {
        await refreshCustomerData();
      }
      
      setIsEditing(false);
      if (sensitiveChanges.length === 0) alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      const errorMsg = error.response?.data?.message || error.message || "Gagal memperbarui profil. Silakan coba lagi.";
      alert(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (!selectedCustomerId) {
    return (
      <div className="container mx-auto px-4 py-10">
        <RolePersonaEmptyState 
          title="Profil Konsumen Tidak Ditemukan"
          description="Silakan pilih persona Konsumen terlebih dahulu menggunakan Persona Switcher untuk melihat dan mengelola profil."
          icon="👤"
        />
      </div>
    );
  }

  if (personaLoading || loading) return <RoleDataState type="loading" message="Memuat profil Anda..." />;

  if (error) return <RoleDataState type="error" message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Foto Profil & Info Dasar */}
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-slate-100">
          <div className="relative group">
            <img
              src={user.fotoProfil}
              alt="Foto Profil"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-teal-500 shadow-md"
            />
            {isEditing && (
              <div 
                onClick={() => alert("Fitur Unggah Foto dinonaktifkan dalam Fase Local CRUD. Gunakan URL foto lokal jika tersedia.")}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Ubah Foto</span>
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="w-full mb-4">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={user.nama}
                onChange={handleChange}
                className="input input-bordered input-sm w-full text-center"
              />
              <label className="block text-[10px] uppercase font-bold text-slate-400 mt-3 mb-1">URL Avatar</label>
              <input
                type="text"
                name="fotoProfil"
                value={user.fotoProfil}
                onChange={handleChange}
                placeholder="https://..."
                className="input input-bordered input-sm w-full text-center text-[10px]"
              />
            </div>
          ) : (
            <h2 className="text-xl font-bold text-slate-800 mb-1">{user.nama}</h2>
          )}

          <div className="flex items-center gap-2 mb-4">
            <span className={`badge badge-sm ${user.statusAkun === "Aktif" ? "badge-success" : "badge-error"}`}>
              {user.statusAkun}
            </span>
            <span className="badge badge-sm badge-outline capitalize">{user.customerType}</span>
          </div>
          
          <div className="w-full space-y-2 text-sm border-t border-slate-50 pt-4">
            <div className="flex justify-between text-slate-500">
              <span>ID Konsumen</span>
              <span className="font-mono text-xs">{user.idKonsumen}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Proyek Aktif</span>
              <span className="font-semibold text-teal-600">{user.jumlahProyek}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Bergabung Sejak</span>
              <span>{user.tanggalBergabung}</span>
            </div>
          </div>

          <div className="w-full mt-6">
            <GovernanceNotice roleName="Konsumen" />
          </div>
        </div>

        {/* Form Data Pribadi */}
        <div className="md:col-span-2 p-6 bg-white rounded-xl shadow-lg border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Detail Informasi Profil</h3>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="btn btn-sm btn-primary btn-outline rounded-xl"
              >
                Edit Profil
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap / Perusahaan</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nama"
                  value={user.nama}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="text-slate-700 font-medium">{user.nama}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="text-slate-700 font-medium">{user.email}</p>
              )}
            </div>

            {/* Nomor Telepon */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Nomor Telepon</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nomor"
                  value={user.nomor}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="text-slate-700 font-medium">{user.nomor || "-"}</p>
              )}
            </div>

            {/* NIK / Identity Number */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Nomor Identitas (NIK)</label>
              {isEditing ? (
                <input
                  type="text"
                  name="identityNumber"
                  value={user.identityNumber}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="text-slate-700 font-medium">{user.identityNumber || "-"}</p>
              )}
            </div>

            {/* Pekerjaan / Occupation - Only for individuals */}
            {user.customerType === "individual" && (
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Pekerjaan</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="occupation"
                    value={user.occupation}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p className="text-slate-700 font-medium">{user.occupation || "-"}</p>
                )}
              </div>
            )}

            {/* Company Specific Fields */}
            {user.customerType === "company" && (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Perusahaan</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="companyName"
                      value={user.companyName}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{user.companyName || "-"}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">NPWP Perusahaan</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="taxNumber"
                      value={user.taxNumber}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{user.taxNumber || "-"}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">PIC / Penanggung Jawab</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="picName"
                      value={user.picName}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{user.picName || "-"}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Jabatan PIC</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="picPosition"
                      value={user.picPosition}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{user.picPosition || "-"}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Bidang Usaha</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="businessField"
                      value={user.businessField}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{user.businessField || "-"}</p>
                  )}
                </div>
              </>
            )}

            {/* Alamat */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Alamat Lengkap</label>
              {isEditing ? (
                <textarea
                  name="alamat"
                  value={user.alamat}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              ) : (
                <p className="text-slate-700 font-medium">{user.alamat || "-"}</p>
              )}
            </div>

            {/* Catatan / Notes */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Catatan Tambahan</label>
              {isEditing ? (
                <textarea
                  name="notes"
                  value={user.notes}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
              ) : (
                <p className="text-slate-700 font-medium">{user.notes || "-"}</p>
              )}
            </div>
          </div>

          {/* Tombol Simpan / Batal */}
          {isEditing && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-ghost"
                disabled={saving}
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className={`btn btn-primary px-8 rounded-xl ${saving ? 'loading' : ''}`}
                disabled={saving}
              >
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;
