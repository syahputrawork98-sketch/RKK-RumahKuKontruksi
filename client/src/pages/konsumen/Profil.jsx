import React, { useState, useEffect } from "react";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import customerService from "../../services/customerService";
import RoleDataState from "../../components/common/RoleDataState";

const Profil = () => {
  const { selectedCustomerId, selectedCustomer } = useCustomerPersona();
  const [user, setUser] = useState({
    nama: "",
    email: "",
    nomor: "",
    alamat: "",
    tanggalBergabung: "",
    jenisKelamin: "Pria",
    tempatTanggalLahir: "Jakarta, 01 Jan 1990",
    fotoProfil: "",
    idKonsumen: "",
    jumlahProyek: 0,
    statusAkun: "Aktif",
    identityNumber: "N/A",
    occupation: "N/A",
    notes: ""
  });

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedCustomer) {
      setUser({
        nama: selectedCustomer.name || "",
        email: selectedCustomer.email || "",
        nomor: selectedCustomer.phone || "",
        alamat: selectedCustomer.address || "",
        tanggalBergabung: selectedCustomer.joinedAt ? new Date(selectedCustomer.joinedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "01 Jan 2024",
        jenisKelamin: "Pria", 
        tempatTanggalLahir: "Jakarta, 01 Jan 1990",
        fotoProfil: selectedCustomer.avatar || `https://ui-avatars.com/api/?name=${selectedCustomer.name}&background=0D9488&color=fff`,
        idKonsumen: selectedCustomer.id || "RKK-XXX",
        jumlahProyek: selectedCustomer._count?.projects || 0,
        statusAkun: "Aktif",
        identityNumber: selectedCustomer.identityNumber || "N/A",
        occupation: selectedCustomer.occupation || "N/A",
        notes: selectedCustomer.notes || ""
      });
      setLoading(false);
    }
  }, [selectedCustomer]);


  // Hitung umur dari tanggal lahir
  const hitungUmur = (tanggalLahir) => {
    if (!tanggalLahir) return "-";
    const lahir = new Date(tanggalLahir);
    const today = new Date();
    let umur = today.getFullYear() - lahir.getFullYear();
    const m = today.getMonth() - lahir.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < lahir.getDate())) umur--;
    return umur;
  };

  const tanggalLahirOnly = user.tempatTanggalLahir.split(", ")[1] || "01 Jan 1990";

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Simpan perubahan
  const handleSave = () => {
    setIsEditing(false);
    alert("Profil berhasil diperbarui! (hanya frontend mock)");
  };

  if (loading) return <RoleDataState type="loading" message="Memuat profil Anda..." />;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Foto Profil & Info Dasar */}
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
          <img
            src={user.fotoProfil}
            alt="Foto Profil"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-teal-500"
          />
          {isEditing ? (
            <input
              type="text"
              name="nama"
              value={user.nama}
              onChange={handleChange}
              className="input input-bordered w-full text-center mb-2"
            />
          ) : (
            <h2 className="text-xl font-bold text-teal-700 mb-1">{user.nama}</h2>
          )}

          <span
            className={`badge ${user.statusAkun === "Aktif" ? "badge-success" : "badge-error"} mb-2`}
          >
            {user.statusAkun}
          </span>
          <p className="text-gray-500">ID: {user.idKonsumen}</p>
          <p className="mt-2 text-gray-600">Jumlah Proyek: {user.jumlahProyek}</p>
          <p className="mt-1 text-gray-600">Umur: {hitungUmur(tanggalLahirOnly)} Tahun</p>
        </div>

        {/* Form Data Pribadi */}
        <div className="md:col-span-2 p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-teal-700 mb-4">Data Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Nama Lengkap</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nama"
                  value={user.nama}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="text-gray-800">{user.nama}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="text-gray-800">{user.email}</p>
              )}
            </div>

            {/* Nomor Telepon */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Nomor Telepon</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nomor"
                  value={user.nomor}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="text-gray-800">{user.nomor}</p>
              )}
            </div>

            {/* Alamat */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">Alamat Lengkap</label>
              {isEditing ? (
                <textarea
                  name="alamat"
                  value={user.alamat}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              ) : (
                <p className="text-gray-800">{user.alamat}</p>
              )}
            </div>

            {/* Tanggal Bergabung */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Tanggal Bergabung</label>
              <p className="text-gray-800">{user.tanggalBergabung}</p>
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Jenis Kelamin</label>
              {isEditing ? (
                <select
                  name="jenisKelamin"
                  value={user.jenisKelamin}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option>Pria</option>
                  <option>Wanita</option>
                  <option>Lainnya</option>
                </select>
              ) : (
                <p className="text-gray-800">{user.jenisKelamin}</p>
              )}
            </div>

            {/* Tempat & Tanggal Lahir */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">Tempat & Tanggal Lahir</label>
              {isEditing ? (
                <input
                  type="text"
                  name="tempatTanggalLahir"
                  value={user.tempatTanggalLahir}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              ) : (
                <p className="text-gray-800">{user.tempatTanggalLahir}</p>
              )}
            </div>
          </div>

          {/* Tombol Edit / Simpan / Batal */}
          <div className="mt-6 flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-lg border border-amber-100">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Status: Hold (Fase Local CRUD)</span>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-warning text-white opacity-50 cursor-not-allowed"
                disabled
              >
                Edit Profil (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
