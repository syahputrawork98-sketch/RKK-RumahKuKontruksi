// client/src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

// URL logo
const Logo = "https://res.cloudinary.com/dmv4vtgbw/image/upload/v1760437039/rumahku-kontruksi-high-resolution-logo-transparent_rxswjp.png";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-30 pt-20 pb-10 px-6">
      <div className="public-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Kolom 1: Brand */}
          <div className="flex flex-col space-y-6">
            <img
              src={Logo}
              alt="RumahKu Kontruksi Logo"
              className="w-40 lg:w-48"
            />
            <p className="text-m-regular text-neutral-70 leading-relaxed">
              Platform konstruksi terpercaya untuk mewujudkan hunian impian Anda dengan proses yang terencana, transparan, dan terdokumentasi dengan baik.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-surface flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-white transition-all">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-surface flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-white transition-all">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-surface flex items-center justify-center text-primary-main hover:bg-primary-main hover:text-white transition-all">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h3 className="text-heading-s-bold text-neutral-100 mb-8 uppercase tracking-widest">
              Navigasi
            </h3>
            <ul className="space-y-4 text-m-regular text-neutral-70">
              <li>
                <Link to="/" className="hover:text-primary-main transition-colors">Beranda</Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-primary-main transition-colors">Layanan</Link>
              </li>
              <li>
                <Link to="/cara-kerja" className="hover:text-primary-main transition-colors">Cara Kerja</Link>
              </li>
              <li>
                <Link to="/proyek" className="hover:text-primary-main transition-colors">Proyek</Link>
              </li>
              <li>
                <Link to="/tentang" className="hover:text-primary-main transition-colors">Tentang</Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-primary-main transition-colors">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Kami */}
          <div>
            <h3 className="text-heading-s-bold text-neutral-100 mb-8 uppercase tracking-widest">
              Layanan Kami
            </h3>
            <ul className="space-y-4 text-m-regular text-neutral-70">
              <li>
                <Link to="/layanan" className="hover:text-primary-main transition-colors">Bangun Rumah Baru</Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-primary-main transition-colors">Renovasi Hunian</Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-primary-main transition-colors">Desain Arsitektur</Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-primary-main transition-colors">Estimasi Biaya / RAB</Link>
              </li>
              <li>
                <Link to="/layanan" className="hover:text-primary-main transition-colors">Manajemen Proyek</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami */}
          <div>
            <h3 className="text-heading-s-bold text-neutral-100 mb-8 uppercase tracking-widest">
              Hubungi Kami
            </h3>
            <ul className="space-y-4 text-m-regular text-neutral-70">
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-primary-main shrink-0" />
                <a href="mailto:rumahkukontruksi@outlook.com" className="hover:text-primary-main transition-colors">
                  rumahkukontruksi@outlook.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-primary-main shrink-0" />
                <span>+62 812-8888-8888</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary-main shrink-0" />
                <span>Jl. Konstruksi No. 123, Jakarta Selatan, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-neutral-30 flex flex-col md:flex-row justify-between items-center gap-6 text-m-regular text-neutral-50">
          <p>© 2025 RumahKu Kontruksi. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-primary-main">Kebijakan Privasi</Link>
            <Link to="#" className="hover:text-primary-main">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
