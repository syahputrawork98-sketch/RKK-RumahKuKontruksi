// client/src/components/Navbar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb"; // Icon untuk tombol login
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Icon menu burger & close

// URL logo yang dihosting di Cloudinary
const Logo =
  "https://res.cloudinary.com/dmv4vtgbw/image/upload/v1760437039/rumahku-kontruksi-high-resolution-logo-transparent_rxswjp.png";

const Navbar = () => {
  // State untuk toggle menu navigasi di mobile
  const [menuOpen, setMenuOpen] = useState(false);

  // State untuk toggle modal login
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* ========================== */}
      {/* ======== NAVBAR ========= */}
      {/* ========================== */}
      <nav className="fixed top-0 left-0 right-0 bg-white backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* === KIRI: LOGO === */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={Logo}
              alt="Logo RumahKu Konstruksi"
              className="w-32 md:w-36 hover:scale-105 transition-transform"
            />
          </Link>

          {/* === TENGAH: MENU NAVIGASI === */}
          <div
            className={`absolute md:static top-12 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out ${
              menuOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible md:visible md:opacity-100"
            }`}
          >
            {/* Menu disusun fleksibel agar bisa berubah menjadi kolom di mobile */}
            <div className=" flex flex-col md:flex-row md:items-center justify-center md:gap-8 p-4 md:p-0">
              {/* Map daftar menu */}
              {["Beranda", "Tentang", "Kontak"].map((item) => (
                <NavLink
                  end={item === "Beranda"}
                  key={item}
                  to={
                    item === "Beranda"
                      ? "/"
                      : item === "Tentang"
                      ? "/about"
                      : "/contact"
                  }
                  className={({ isActive }) => {
                    return (
                      "py-2 md:py-0 transition-colors " +
                      (isActive
                        ? "text-l-bold text-primary-main"
                        : "text-secondary-main hover:text-primary-hover text-l-regular")
                    );
                  }}
                  onClick={() => setMenuOpen(false)} // menutup menu setelah klik
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </div>

          {/* === KANAN: TOMBOL LOGIN DAN MENU MOBILE === */}
          <div className="flex items-center gap-4">
            {/* Tombol login desktop (ada teks Sign In) */}
            <button
              className="hidden md:flex items-center gap-2 bg-primary-main hover:bg-primary-hover text-neutral-10 text-l-bold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
              onClick={() => setIsModalOpen(true)} // buka modal login
            >
              <TbLogin2 size={20} />
              Sign In
            </button>

            {/* Tombol login mobile (hanya ikon) */}
            <button
              className="md:hidden text-primary-main hover:text-primary-hover transition-colors"
              onClick={() => setIsModalOpen(true)} // buka modal login
            >
              <TbLogin2 size={24} />
            </button>

            {/* Tombol toggle menu burger mobile */}
            <button
              className="md:hidden text-secondary-main hover:text-primary-hover transition-colors"
              onClick={() => setMenuOpen(!menuOpen)} // buka/tutup menu
            >
              {menuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ========================== */}
      {/* ======= MODAL LOGIN ====== */}
      {/* ========================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-neutral-100/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
          // Klik area luar modal untuk menutup
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          {/* Box modal utama */}
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 relative animate-scaleIn">
            {/* Tombol close (✕ di pojok kanan atas) */}
            <button
              className="absolute right-4 top-4 text-secondary-main hover:text-secondary-hover text-heading-m-regular cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            {/* Judul modal */}
            <h2 className="text-heading-m-bold text-center mb-6">
              Masuk ke Akun Anda
            </h2>

            {/* Form login */}
            <form className="space-y-4">
              {/* Input email */}
              <div>
                <label htmlFor="email" className="block text-m-regular mb-1">
                  Alamat Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="nama@company.com"
                  className="w-full border border-neutral-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-focus"
                  required
                />
              </div>

              {/* Input password */}
              <div>
                <label htmlFor="password" className="block text-m-regular mb-1">
                  Kata Sandi
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-neutral-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-focus"
                  required
                />
              </div>

              {/* Tombol login */}
              <button
                type="button"
                onClick={() => alert("Login hanya tampilan frontend.")}
                className="w-full bg-primary-main hover:bg-primary-hover text-l-bold text-neutral-10 py-2 rounded-lg transition-colors shadow-md"
              >
                SIGN IN
              </button>

              {/* Link ke halaman daftar */}
              <p className="text-sm text-center text-neutral-90 mt-3">
                Belum punya akun?{" "}
                <a
                  href="#"
                  className="text-m-bold text-primary-main hover:underline "
                >
                  Daftar Sekarang
                </a>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ========================== */}
      {/* ======= ANIMASI CSS ====== */}
      {/* ========================== */}
      <style>{`
        /* Animasi muncul overlay (fade-in) */
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        /* Animasi modal muncul dari skala kecil (zoom-in) */
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0 }
          to { transform: scale(1); opacity: 1 }
        }

        .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out forwards }
      `}</style>
    </>
  );
};

export default Navbar;
