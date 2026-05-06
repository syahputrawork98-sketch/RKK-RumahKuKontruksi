import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaComments, FaSearchLocation, FaEdit, FaFileContract, FaHammer, FaChartLine, FaCheckCircle } from "react-icons/fa";

const CaraKerja = () => {
    const steps = [
        {
            title: "Konsultasi Kebutuhan",
            desc: "Diskusi awal untuk memahami visi, kebutuhan ruang, gaya arsitektur, dan anggaran yang Anda miliki.",
            icon: <FaComments className="text-3xl" />,
        },
        {
            title: "Survey & Pengumpulan Data",
            desc: "Tim kami melakukan survey lokasi untuk pengukuran akurat dan pengecekan kondisi lingkungan proyek.",
            icon: <FaSearchLocation className="text-3xl" />,
        },
        {
            title: "Penyusunan Desain dan RAB",
            desc: "Pembuatan konsep desain visual dan Rencana Anggaran Biaya yang detail dan transparan.",
            icon: <FaEdit className="text-3xl" />,
        },
        {
            title: "Persetujuan Kontrak",
            desc: "Finalisasi kesepakatan kerja, jadwal pembangunan, dan penandatanganan kontrak yang aman bagi kedua belah pihak.",
            icon: <FaFileContract className="text-3xl" />,
        },
        {
            title: "Eksekusi Proyek",
            desc: "Pembangunan fisik dimulai oleh tenaga profesional dengan standar kualitas material yang terjaga.",
            icon: <FaHammer className="text-3xl" />,
        },
        {
            title: "Monitoring Progres",
            desc: "Anda mendapatkan laporan progres real-time melalui sistem kami, memastikan transparansi setiap tahapan.",
            icon: <FaChartLine className="text-3xl" />,
        },
        {
            title: "Serah Terima",
            desc: "Inspeksi akhir bersama dan serah terima kunci bangunan yang sudah siap dihuni dengan jaminan kualitas.",
            icon: <FaCheckCircle className="text-3xl" />,
        },
    ];

    return (
        <main className="pt-24 pb-16">
            {/* Hero Section - Fixed Contrast */}
            <section className="public-section relative bg-primary-main text-white overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-hover/30 rounded-full -ml-36 -mb-36 blur-2xl"></div>

                <div className="public-container text-center relative z-10">
                    <motion.span 
                        className="public-badge !bg-white/20 !text-white !border-white/20 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        Alur Kerja Terstruktur
                    </motion.span>
                    <motion.h1 
                        className="public-hero-title mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Cara Kerja RumahKu Kontruksi
                    </motion.h1>
                    <motion.p 
                        className="public-hero-subtitle mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Setiap proyek dikelola melalui tahapan yang jelas, mulai dari konsultasi, RAB, 
                        eksekusi, monitoring, hingga serah terima kunci bangunan Anda.
                    </motion.p>

                    <motion.div 
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link 
                            to="/contact" 
                            className="btn-public-white"
                        >
                            Konsultasi Sekarang
                        </Link>
                        <Link 
                            to="/layanan" 
                            className="btn-public-outline !border-white !text-white hover:!bg-white hover:!text-primary-main"
                        >
                            Lihat Layanan
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Steps Timeline Section */}
            <section className="public-section bg-white relative overflow-hidden">
                <div className="public-container max-w-5xl relative">
                    {/* Vertical Line for Desktop */}
                    <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-px bg-neutral-30 hidden md:block"></div>

                    <div className="space-y-20">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div 
                                    key={index}
                                    className={`relative flex flex-col md:flex-row items-center md:items-start gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse text-right'}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Central Indicator */}
                                    <div className="absolute left-10 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-primary-main z-10 flex items-center justify-center hidden md:flex">
                                        <div className="w-2 h-2 rounded-full bg-primary-main"></div>
                                    </div>

                                    {/* Step Image/Icon Area */}
                                    <div className={`md:w-1/2 flex ${isEven ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-primary-main/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all"></div>
                                            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-primary-surface rounded-[32px] flex items-center justify-center text-primary-main border border-primary-main/20 shadow-lg transform group-hover:-rotate-6 transition-all duration-500">
                                                <div className="text-4xl md:text-5xl">{step.icon}</div>
                                            </div>
                                            <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary-main text-white text-s-bold rounded-full flex items-center justify-center shadow-lg">
                                                0{index + 1}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step Content Area */}
                                    <div className="md:w-1/2">
                                        <div className="public-card public-card-hover !bg-neutral-20/50 hover:!bg-white group">
                                            <span className="public-eyebrow">Langkah {index + 1}</span>
                                            <h3 className="public-title !text-heading-m-bold md:!text-heading-l-bold group-hover:text-primary-main transition-colors">{step.title}</h3>
                                            <p className="text-l-regular text-neutral-80 leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
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
                    
                    <h2 className="public-hero-title !text-heading-l-bold mb-8 relative z-10">Siap Memulai Proyek Anda dengan <br className="hidden md:block" /> Proses yang Terpercaya?</h2>
                    <div className="flex flex-wrap justify-center gap-4 relative z-10">
                        <Link 
                            to="/contact" 
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
