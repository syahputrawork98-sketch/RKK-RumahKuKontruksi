// client/src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb"; // Icon untuk tombol login
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Icon menu burger & close

// URL logo yang dihosting di Cloudinary
const Logo =
  "https://res.cloudinary.com/dmv4vtgbw/image/upload/v1760437039/rumahku-kontruksi-high-resolution-logo-transparent_rxswjp.png";

const Navbar = () => {
  // State untuk toggle menu navigasi di mobile
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // State untuk toggle modal login
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu items list
  const menuItems = [
    { label: "Beranda", path: "/" },
    { label: "Layanan", path: "/layanan" },
    { label: "Cara Kerja", path: "/cara-kerja" },
    { label: "Proyek", path: "/proyek" },
    { label: "Tentang", path: "/about" },
    { label: "Kontak", path: "/contact" },
  ];

  return (
    <>
      {/* ========================== */}
      {/* ======== NAVBAR ========= */}
      {/* ========================== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-md py-2" 
          : "bg-white/90 backdrop-blur-md py-4"
      }`}>
        <div className="public-container flex items-center justify-between px-6 lg:px-10">
          {/* === KIRI: LOGO === */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={Logo}
              alt="Logo RumahKu Konstruksi"
              className="w-32 lg:w-40 hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* === TENGAH: MENU NAVIGASI (Desktop) === */}
          <div className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <NavLink
                end={item.path === "/"}
                key={item.label}
                to={item.path}
                className={({ isActive }) => 
                  `text-m-bold transition-all duration-300 hover:text-primary-main relative group ${
                    isActive ? "text-primary-main" : "text-neutral-80"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-main transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* === KANAN: TOMBOL LOGIN DAN MENU MOBILE === */}
          <div className="flex items-center gap-4">
            {/* Tombol login desktop */}
            <button
              className="btn-public-primary hidden lg:flex !py-2.5 !px-6 !rounded-xl"
              onClick={() => setIsModalOpen(true)}
            >
              <TbLogin2 size={20} />
              Masuk
            </button>

            {/* Tombol toggle menu burger mobile */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-primary-main hover:bg-primary-surface rounded-full transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>

        {/* === MOBILE MENU OVERLAY === */}
        <div className={`fixed inset-0 top-[72px] bg-white z-40 transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}>
          <div className="flex flex-col p-8 gap-6 h-full">
            {menuItems.map((item, index) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => 
                  `text-heading-s-bold py-4 border-b border-neutral-20 transition-all ${
                    isActive ? "text-primary-main pl-4" : "text-neutral-100"
                  }`
                }
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              className="btn-public-primary mt-6 !py-4"
              onClick={() => {
                setIsModalOpen(true);
                setMenuOpen(false);
              }}
            >
              <TbLogin2 size={24} />
              Masuk
            </button>
          </div>
        </div>
      </nav>

      {/* ========================== */}
      {/* ======= MODAL LOGIN ====== */}
      {/* ========================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-100/60 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          {/* Box modal utama */}
          <div className="bg-white rounded-[32px] shadow-2xl w-11/12 max-w-md p-8 relative animate-scaleIn border border-neutral-30">
            {/* Tombol close */}
            <button
              className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-20 text-neutral-80 hover:bg-primary-surface hover:text-primary-main transition-all cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              <HiX size={20} />
            </button>

            {/* Judul modal */}
            <div className="text-center mb-8">
              <h2 className="text-heading-l-bold text-neutral-100 mb-2">
                Selamat Datang
              </h2>
              <p className="text-m-regular text-neutral-70">
                Masuk untuk mengelola proyek konstruksi Anda
              </p>
            </div>

            {/* Form login */}
            <form className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-s-bold text-neutral-80 mb-2 ml-1">
                  Alamat Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="contoh@email.com"
                  className="w-full bg-neutral-20 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary-main transition-all text-neutral-100"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-s-bold text-neutral-80 mb-2 ml-1">
                  Kata Sandi
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-neutral-20 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary-main transition-all text-neutral-100"
                  required
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-neutral-30 text-primary-main focus:ring-primary-main" />
                  <span className="text-s-regular text-neutral-70 group-hover:text-neutral-100 transition-colors">Ingat saya</span>
                </label>
                <a href="#" className="text-s-bold text-primary-main hover:text-primary-hover transition-colors">Lupa sandi?</a>
              </div>

              <button
                type="button"
                onClick={() => alert("Login hanya tampilan frontend.")}
                className="btn-public-primary w-full"
              >
                Masuk Sekarang
              </button>

              <p className="text-m-regular text-center text-neutral-70 mt-6">
                Belum punya akun?{" "}
                <a
                  href="#"
                  className="text-m-bold text-primary-main hover:underline"
                >
                  Daftar
                </a>
              </p>
            </form>
          </div>
        </div>
      )}

    </>
  );
};

export default Navbar;
