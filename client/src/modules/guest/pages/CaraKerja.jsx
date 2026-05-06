import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaComments, FaSearchLocation, FaEdit, FaFileContract, FaHammer, FaChartLine, FaCheckCircle, FaUserTie, FaFileImage, FaPencilRuler, FaBoxOpen } from "react-icons/fa";

const CaraKerja = () => {
    const designSteps = [
        {
            title: "Konsultasi Kebutuhan",
            desc: "Diskusi visi, gaya arsitektur, dan kebutuhan ruang hunian Anda.",
            icon: <FaComments />,
        },
        {
            title: "Brief & Referensi",
            desc: "Pengumpulan data referensi desain dan batasan teknis lahan.",
            icon: <FaSearchLocation />,
        },
        {
            title: "Penugasan Arsitek",
            desc: "Tim arsitek RKK ditugaskan untuk mulai mengolah ide Anda.",
            icon: <FaUserTie />,
        },
        {
            title: "Konsep Desain",
            desc: "Pembuatan denah awal dan visualisasi 3D (rendering).",
            icon: <FaFileImage />,
        },
        {
            title: "Revisi Desain",
            desc: "Proses penyesuaian desain hingga sesuai dengan keinginan Anda.",
            icon: <FaPencilRuler />,
        },
        {
            title: "Finalisasi Gambar Kerja",
            desc: "Penyusunan dokumen teknis (DED) lengkap untuk pembangunan.",
            icon: <FaEdit />,
        },
        {
            title: "Handover File Desain",
            desc: "Penyerahan seluruh file desain final kepada customer.",
            icon: <FaBoxOpen />,
        },
        {
            title: "Lanjut Konstruksi",
            desc: "Opsional: Lanjut ke pembangunan lapangan bersama tim RKK.",
            icon: <FaHammer />,
        },
    ];

    const constructionSteps = [
        {
            title: "Konsultasi Pekerjaan",
            desc: "Diskusi lingkup pembangunan, baik renovasi maupun bangun baru.",
            icon: <FaComments />,
        },
        {
            title: "Survey Lokasi",
            desc: "Pengecekan fisik lahan/bangunan dan pengukuran akurat.",
            icon: <FaSearchLocation />,
        },
        {
            title: "Penyusunan RAB",
            desc: "Penghitungan estimasi biaya pembangunan yang transparan.",
            icon: <FaFileContract />,
        },
        {
            title: "Persetujuan Kerja",
            desc: "Penandatanganan kontrak dan jadwal pelaksanaan proyek.",
            icon: <FaCheckCircle />,
        },
        {
            title: "Eksekusi Proyek",
            desc: "Pembangunan fisik dimulai oleh tenaga profesional kami.",
            icon: <FaHammer />,
        },
        {
            title: "Monitoring Progres",
            desc: "Pantau laporan progres harian & mingguan secara real-time.",
            icon: <FaChartLine />,
        },
        {
            title: "Verifikasi Tahapan",
            desc: "Pengecekan kualitas pekerjaan di setiap milestone proyek.",
            icon: <FaCheckCircle />,
        },
        {
            title: "Serah Terima",
            desc: "Proyek selesai, inspeksi akhir, dan serah terima kunci.",
            icon: <FaBoxOpen />,
        },
    ];

    return (
        <main className="pt-24 pb-16">
            {/* Hero Section */}
            <section className="public-section relative bg-primary-main text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-hover/30 rounded-full -ml-36 -mb-36 blur-2xl"></div>

                <div className="public-container text-center relative z-10">
                    <motion.span 
                        className="public-badge !bg-white/20 !text-white !border-white/20 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        Alur Kerja Terintegrasi
                    </motion.span>
                    <motion.h1 
                        className="public-hero-title mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Cara Kerja RKK
                    </motion.h1>
                    <motion.p 
                        className="public-hero-subtitle mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Pilih alur sesuai kebutuhan Anda: mulai dari desain rumah <br className="hidden md:block" />
                        atau langsung ke tahap konstruksi lapangan.
                    </motion.p>

                    <motion.div 
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link to="/kontak" className="btn-public-white">Konsultasi Sekarang</Link>
                        <Link to="/layanan" className="btn-public-outline !border-white !text-white hover:!bg-white hover:!text-primary-main">Lihat Layanan</Link>
                    </motion.div>
                </div>
            </section>

            {/* Dual Workflow Section */}
            <section className="public-section bg-white">
                <div className="public-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Flow A: Design */}
                        <div className="space-y-12">
                            <div className="bg-primary-surface p-8 rounded-[40px] border border-primary-main/10">
                                <span className="text-primary-main text-s-bold uppercase tracking-widest mb-3 block">Alur 01</span>
                                <h2 className="text-heading-m-bold md:text-heading-l-bold text-neutral-100">Desain & Arsitek</h2>
                                <p className="text-m-regular text-neutral-70 mt-3">
                                    Untuk Anda yang belum memiliki desain bangunan atau ingin redesign total.
                                </p>
                            </div>

                            <div className="relative pl-8 space-y-10 border-l-2 border-dashed border-primary-main/30 ml-6">
                                {designSteps.map((step, index) => (
                                    <motion.div 
                                        key={index}
                                        className="relative"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="absolute -left-[45px] top-0 w-8 h-8 bg-white border-2 border-primary-main rounded-full flex items-center justify-center z-10 shadow-sm text-primary-main">
                                            <span className="text-[10px] font-bold">{index + 1}</span>
                                        </div>
                                        <div className="flex gap-5">
                                            <div className="w-12 h-12 shrink-0 bg-white border border-neutral-30 rounded-xl flex items-center justify-center text-primary-main text-xl shadow-xs">
                                                {step.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-m-bold text-neutral-100">{step.title}</h4>
                                                <p className="text-s-regular text-neutral-60 mt-1">{step.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="bg-neutral-20 p-6 rounded-2xl border border-neutral-30 italic text-s-regular text-neutral-60">
                                <strong>Catatan:</strong> Setelah desain final, customer bisa lanjut ke konstruksi bersama RKK atau menggunakan file desain secara mandiri.
                            </div>
                        </div>

                        {/* Flow B: Construction */}
                        <div className="space-y-12">
                            <div className="bg-neutral-20 p-8 rounded-[40px] border border-neutral-30">
                                <span className="text-neutral-60 text-s-bold uppercase tracking-widest mb-3 block">Alur 02</span>
                                <h2 className="text-heading-m-bold md:text-heading-l-bold text-neutral-100">Konstruksi Lapangan</h2>
                                <p className="text-m-regular text-neutral-70 mt-3">
                                    Untuk Anda yang sudah siap bangun/renovasi dengan desain sendiri atau dari RKK.
                                </p>
                            </div>

                            <div className="relative pl-8 space-y-10 border-l-2 border-dashed border-neutral-40 ml-6">
                                {constructionSteps.map((step, index) => (
                                    <motion.div 
                                        key={index}
                                        className="relative"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="absolute -left-[45px] top-0 w-8 h-8 bg-white border-2 border-neutral-60 rounded-full flex items-center justify-center z-10 shadow-sm text-neutral-60">
                                            <span className="text-[10px] font-bold">{index + 1}</span>
                                        </div>
                                        <div className="flex gap-5">
                                            <div className="w-12 h-12 shrink-0 bg-white border border-neutral-30 rounded-xl flex items-center justify-center text-neutral-70 text-xl shadow-xs">
                                                {step.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-m-bold text-neutral-100">{step.title}</h4>
                                                <p className="text-s-regular text-neutral-60 mt-1">{step.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust / Control Section */}
            <section className="public-section bg-neutral-20">
                <div className="public-container">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <motion.span 
                                className="public-eyebrow"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                Keamanan Proyek
                            </motion.span>
                            <motion.h2 
                                className="public-title mb-8"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                Setiap Tahap <br /> Lebih Terkontrol
                            </motion.h2>
                            <motion.p 
                                className="public-subtitle !mx-0"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                Alur kerja yang terstruktur di RumahKu Kontruksi memastikan setiap rupiah dan setiap jam kerja di lapangan dapat dipertanggungjawabkan. Kami menghilangkan ketidakpastian dalam proses konstruksi konvensional.
                            </motion.p>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Estimasi Jelas", desc: "Biaya dihitung rinci sebelum pekerjaan dimulai." },
                                { title: "Kontrol Perubahan", desc: "Setiap perubahan pekerjaan harus disetujui bersama." },
                                { title: "Monitoring Berkala", desc: "Progres dipantau tim ahli secara rutin." },
                                { title: "Dokumentasi Rapi", desc: "Setiap tahap memiliki arsip digital yang lengkap." },
                                { title: "Komunikasi Terarah", desc: "Koordinasi terpusat melalui satu platform." },
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="bg-white p-6 rounded-2xl border border-neutral-30 shadow-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <h4 className="text-heading-s-bold text-primary-main mb-2">{item.title}</h4>
                                    <p className="text-m-regular text-neutral-70">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="public-section">
                <div className="public-container text-center bg-primary-main rounded-[40px] py-16 px-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full -ml-36 -mb-36"></div>
                    
                    <h2 className="public-hero-title mb-8 relative z-10">Siap Memulai Proyek Anda dengan <br className="hidden md:block" /> Proses yang Terpercaya?</h2>
                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <Link 
                            to="/kontak" 
                            className="btn-public-white"
                        >
                            Konsultasi Sekarang
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CaraKerja;
