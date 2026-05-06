// src/modules/guest/components/home/Slide.jsx
import { Link } from "react-router-dom";

const Slide = () => {
  return (
    <div>
      <section className="relative w-full text-neutral-10">
        <div className="carousel w-full h-[90vh]">
          {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Proyek Konstruksi"
            />
            <div className="absolute inset-0 bg-linear-to-b from-neutral-100/40 via-neutral-100/20 to-primary-pressed/60 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-4xl md:text-display font-extrabold mb-6 animate-fadeInUp leading-tight max-w-5xl text-neutral-10 drop-shadow-lg">
                Bangun Rumah Lebih Terencana, Transparan, dan Terpantau
              </h1>
              <p className="text-l-regular md:text-heading-s-regular mb-10 max-w-3xl text-neutral-10/90 leading-relaxed drop-shadow-md">
                Dari konsultasi, RAB, progres proyek, dokumentasi lapangan, hingga pembayaran termin 
                — semua proses pembangunan rumah dikelola lebih rapi dalam satu alur kerja.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/layanan" className="bg-white text-l-bold text-primary-main px-8 py-3.5 rounded-xl shadow-lg hover:bg-primary-surface hover:scale-105 transition-all duration-300">
                  Lihat Layanan
                </Link>
                <Link to="/cara-kerja" className="border-2 border-white px-8 py-3.5 rounded-xl text-l-bold text-white hover:bg-white hover:text-primary-main hover:scale-105 transition-all duration-300">
                  Cara Kerja
                </Link>
              </div>
            </div>
            <a
              href="#slide4"
              className="w-12 h-12 flex items-center justify-center rounded-full absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="w-12 h-12 flex items-center justify-center rounded-full absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
            >
              ❯
            </a>
          </div>

          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Desain Arsitektur"
            />
            <div className="absolute inset-0 bg-linear-to-b from-neutral-100/40 via-neutral-100/20 to-primary-pressed/60 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-4xl md:text-display font-extrabold mb-6 animate-fadeInUp leading-tight max-w-5xl text-neutral-10 drop-shadow-lg">
                Perencanaan Jelas dari Desain hingga RAB
              </h1>
              <p className="text-l-regular md:text-heading-s-regular mb-10 max-w-3xl text-neutral-10/90 leading-relaxed drop-shadow-md">
                Kami membantu Anda merancang dan mewujudkan rumah impian dengan
                sistem perencanaan yang efisien dan transparan.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-primary-main text-l-bold px-7 py-3 rounded-xl shadow-md hover:bg-primary-surface hover:scale-105 transition-all duration-300">
                  Konsultasi Gratis
                </button>
              </div>
            </div>
            <a
              href="#slide1"
              className="w-12 h-12 flex items-center justify-center rounded-full absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="w-12 h-12 flex items-center justify-center rounded-full absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
            >
              ❯
            </a>
          </div>

          {/* Slide 3 */}
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1591588582259-e675bd2e6088?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074"
              className="w-full h-full object-cover"
              alt="Pekerja Proyek"
            />
            <div className="absolute inset-0 bg-linear-to-b from-neutral-100/40 via-neutral-100/20 to-primary-pressed/60 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-4xl md:text-display font-extrabold mb-6 animate-fadeInUp leading-tight max-w-5xl text-neutral-10 drop-shadow-lg">
                Proyek Dipantau oleh Tim Lapangan yang Terkoordinasi
              </h1>
              <p className="text-l-regular md:text-heading-s-regular mb-10 max-w-3xl text-neutral-10/90 leading-relaxed drop-shadow-md">
                Didukung oleh tenaga ahli konstruksi yang kompeten dan
                terpercaya untuk menjamin kualitas proyek Anda.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-primary-main text-l-bold px-7 py-3 rounded-xl shadow-md hover:bg-primary-surface hover:scale-105 transition-all duration-300">
                  Lihat Tim Kami
                </button>
              </div>
            </div>
            <a
              href="#slide2"
              className="w-12 h-12 flex items-center justify-center rounded-full absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
            >
              ❮
            </a>
            <a
              href="#slide4"
              className="w-12 h-12 flex items-center justify-center rounded-full absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
            >
              ❯
            </a>
          </div>

          {/* Slide 4 */}
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="https://plus.unsplash.com/premium_photo-1681691757922-6d8b206abedc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
              className="w-full h-full object-cover"
              alt="Konstruksi Bangunan"
            />
            <div className="absolute inset-0 bg-linear-to-b from-neutral-100/40 via-neutral-100/20 to-primary-pressed/60 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-4xl md:text-display font-extrabold mb-6 animate-fadeInUp leading-tight max-w-5xl text-neutral-10 drop-shadow-lg">
                Semua Proses Lebih Terdokumentasi dan Terarah
              </h1>
              <p className="text-l-regular md:text-heading-s-regular mb-10 max-w-3xl text-neutral-10/90 leading-relaxed drop-shadow-md">
                RumahKu Konstruksi memudahkan kerja sama semua pihak dalam satu
                platform modern untuk hasil yang maksimal.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-primary-main text-l-bold px-7 py-3 rounded-xl shadow-md hover:bg-primary-surface hover:scale-105 transition-all duration-300">
                  Mulai Bangun Sekarang
                </button>
              </div>
            </div>
            <a
              href="#slide3"
              className="w-12 h-12 flex items-center justify-center rounded-full absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
            >
              ❮
            </a>
            <a
              href="#slide1"
              className="w-12 h-12 flex items-center justify-center rounded-full absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm"
            >
              ❯
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Slide;
