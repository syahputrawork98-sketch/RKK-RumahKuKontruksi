// src/modules/guest/components/home/Slide.jsx

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
            <div className="absolute inset-0 bg-linear-to-br from-neutral-100/70 via-primary-pressed/50 to-primary-main/40 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeInUp">
                Solusi Digital untuk Bangun Rumah & Proyek Impian Anda
              </h1>
              <p className="text-lg md:text-xl mb-10 max-w-2xl text-primary-surface">
                RumahKu Konstruksi menghubungkan konsumen, mandor, dan pengawas
                proyek dalam satu ekosistem digital yang transparan dan efisien.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-l-bold text-primary-main  px-7 py-3 rounded-xl shadow-md hover:bg-primary-surface hover:scale-105 transition-all duration-300">
                  Mulai Sekarang
                </button>
                <button className="border-2 border-white px-7 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-main hover:scale-105 transition-all duration-300">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
            <a
              href="#slide4"
              className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 border-none hover:bg-white/40 text-white"
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 border-none hover:bg-white/40 text-white"
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
            <div className="absolute inset-0 bg-linear-to-br from-neutral-100/70 via-primary-pressed/50 to-primary-main/40 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeInUp">
                Dari Desain Hingga Realisasi
              </h1>
              <p className="text-lg md:text-xl mb-10 max-w-2xl text-primary-surface">
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
              className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 border-none hover:bg-white/40 text-white"
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 border-none hover:bg-white/40 text-white"
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
            <div className="absolute inset-0 bg-linear-to-br from-neutral-100/70 via-primary-pressed/50 to-primary-main/40 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeInUp">
                Tim Profesional & Berpengalaman
              </h1>
              <p className="text-lg md:text-xl mb-10 max-w-2xl text-primary-surface">
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
              className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 border-none hover:bg-white/40 text-white"
            >
              ❮
            </a>
            <a
              href="#slide4"
              className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 border-none hover:bg-white/40 text-white"
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
            <div className="absolute inset-0 bg-linear-to-br from-neutral-100/70 via-primary-pressed/50 to-primary-main/40 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fadeInUp">
                Kolaborasi, Transparansi, dan Inovasi
              </h1>
              <p className="text-lg md:text-xl mb-10 max-w-2xl text-primary-surface">
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
              className="btn btn-circle absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 border-none hover:bg-white/40 text-white"
            >
              ❮
            </a>
            <a
              href="#slide1"
              className="btn btn-circle absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 border-none hover:bg-white/40 text-white"
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
