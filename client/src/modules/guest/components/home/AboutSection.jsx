// client/src/modules/guest/components/home/AboutSection.jsx
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/fadeUpVariant";

export default function AboutSection() {
    return (
        <section className="py-24 px-6 bg-neutral-20 overflow-hidden relative">
            {/* Background Decorative Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-main/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Left Column: Narrative */}
                    <motion.div
                        className="lg:w-1/2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                        }}
                    >
                        <span className="text-primary-main text-s-bold uppercase tracking-widest mb-4 block">Tentang RumahKu Konstruksi</span>
                        <h2 className="text-heading-l-bold md:text-display-s mb-8 text-neutral-100 leading-tight">
                            Solusi Konstruksi <br /> <span className="text-primary-main">Tanpa Keraguan</span>
                        </h2>
                        
                        <div className="space-y-6 text-l-regular text-neutral-80 leading-relaxed">
                            <p>
                                <strong>RumahKu Konstruksi</strong> hadir untuk membantu proses bangun dan renovasi rumah menjadi lebih jelas, terukur, dan mudah dipantau.
                            </p>
                            <p>
                                Kami menggabungkan layanan konstruksi dengan alur kerja digital agar klien bisa memahami progres, biaya, dan dokumentasi proyek secara lebih transparan. 
                                Tidak ada lagi kebingungan soal anggaran atau progres yang terhambat.
                            </p>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-8 md:gap-12">
                            <div className="text-left">
                                <p className="text-display-s font-extrabold text-primary-main">100+</p>
                                <p className="text-s-bold text-neutral-70 uppercase tracking-tight">Proyek Selesai</p>
                            </div>
                            <div className="hidden sm:block w-px h-12 bg-neutral-40"></div>
                            <div className="text-left">
                                <p className="text-display-s font-extrabold text-primary-main">50+</p>
                                <p className="text-s-bold text-neutral-70 uppercase tracking-tight">Mitra Ahli</p>
                            </div>
                            <div className="hidden sm:block w-px h-12 bg-neutral-40"></div>
                            <div className="text-left">
                                <p className="text-display-s font-extrabold text-primary-main">4.9/5</p>
                                <p className="text-s-bold text-neutral-70 uppercase tracking-tight">Rating Klien</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Value Cards */}
                    <motion.div
                        className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
                        }}
                    >
                        {[
                            { title: "RAB Transparan", desc: "Setiap rupiah yang dikeluarkan tercatat dan dapat diverifikasi.", icon: "💰" },
                            { title: "Progres Terpantau", desc: "Laporan harian lengkap dengan dokumentasi foto lapangan.", icon: "📸" },
                            { title: "Komunikasi Rapi", desc: "Koordinasi antara pemilik, mandor, dan pengawas dalam satu pintu.", icon: "💬" },
                            { title: "Dokumentasi Jelas", desc: "Semua data teknis dan administrasi tersimpan rapi secara digital.", icon: "📂" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-[32px] shadow-sm border border-neutral-30 hover:shadow-2xl hover:border-primary-main/20 transition-all duration-500 hover:-translate-y-2"
                                variants={fadeUp}
                            >
                                <div className="text-display-s mb-6 flex items-center justify-center w-16 h-16 bg-neutral-20 rounded-2xl">{item.icon}</div>
                                <h3 className="text-heading-s-bold text-neutral-100 mb-3">{item.title}</h3>
                                <p className="text-m-regular text-neutral-80 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
