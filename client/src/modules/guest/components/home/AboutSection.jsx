// client/src/modules/guest/components/home/AboutSection.jsx
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/fadeUpVariant";

export default function AboutSection() {
    return (
        <section className="py-24 px-6 bg-neutral-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-16">
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
                        <h2 className="text-heading-l-bold md:text-display mb-8 text-primary-main leading-tight">
                            Solusi Konstruksi <br /> <span className="text-neutral-100">Tanpa Keraguan</span>
                        </h2>
                        
                        <div className="space-y-6 text-l-regular text-neutral-90">
                            <p>
                                <strong>RumahKu Konstruksi</strong> hadir untuk membantu proses bangun dan renovasi rumah menjadi lebih jelas, terukur, dan mudah dipantau.
                            </p>
                            <p>
                                Kami menggabungkan layanan konstruksi dengan alur kerja digital agar klien bisa memahami progres, biaya, dan dokumentasi proyek secara lebih transparan. 
                                Tidak ada lagi kebingungan soal anggaran atau progres yang terhambat.
                            </p>
                        </div>

                        <div className="mt-10 flex gap-6">
                            <div className="text-center">
                                <p className="text-heading-m-bold text-primary-main">100+</p>
                                <p className="text-s-regular text-neutral-70">Proyek Selesai</p>
                            </div>
                            <div className="w-px h-12 bg-neutral-40"></div>
                            <div className="text-center">
                                <p className="text-heading-m-bold text-primary-main">50+</p>
                                <p className="text-s-regular text-neutral-70">Mitra Ahli</p>
                            </div>
                            <div className="w-px h-12 bg-neutral-40"></div>
                            <div className="text-center">
                                <p className="text-heading-m-bold text-primary-main">4.9/5</p>
                                <p className="text-s-regular text-neutral-70">Rating Klien</p>
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
                                className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                variants={fadeUp}
                            >
                                <div className="text-display-s mb-4">{item.icon}</div>
                                <h3 className="text-heading-s-bold text-primary-main mb-2">{item.title}</h3>
                                <p className="text-m-regular text-neutral-80 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
