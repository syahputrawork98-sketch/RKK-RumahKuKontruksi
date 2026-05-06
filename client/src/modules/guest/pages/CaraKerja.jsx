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
            {/* Hero Section */}
            <section className="relative bg-neutral-100 text-neutral-10 py-24 px-4 overflow-hidden border-b border-neutral-30">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-main/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-hover/10 rounded-full -ml-36 -mb-36 blur-2xl"></div>

                <div className="container mx-auto text-center relative z-10">
                    <motion.span 
                        className="inline-block bg-primary-main/10 text-primary-main text-s-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-primary-main/20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        Alur Kerja Terstruktur
                    </motion.span>
                    <motion.h1 
                        className="text-heading-l-bold md:text-display mb-8 text-neutral-100 leading-tight drop-shadow-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Cara Kerja RumahKu Kontruksi
                    </motion.h1>
                    <motion.p 
                        className="text-l-regular md:text-heading-s-regular text-neutral-80 max-w-3xl mx-auto mb-10 leading-relaxed"
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
                            className="bg-primary-main text-white text-l-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:bg-primary-hover hover:scale-105"
                        >
                            Konsultasi Sekarang
                        </Link>
                        <Link 
                            to="/proyek" 
                            className="border-2 border-primary-main text-primary-main text-l-bold py-4 px-10 rounded-xl transition-all hover:bg-primary-main hover:text-white"
                        >
                            Lihat Proyek
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div 
                                key={index}
                                className="flex flex-col md:flex-row items-center md:items-start gap-8 group"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                {/* Step Number & Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-2xl bg-primary-main text-white flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center md:text-left bg-white p-8 rounded-3xl border border-neutral-30 shadow-sm hover:shadow-md transition-shadow flex-grow">
                                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                        <span className="text-primary-main text-m-bold uppercase tracking-wider">Langkah {index + 1}</span>
                                        <div className="h-px bg-neutral-30 flex-grow hidden md:block"></div>
                                    </div>
                                    <h3 className="text-heading-m-bold mb-4 text-neutral-100">{step.title}</h3>
                                    <p className="text-l-regular text-neutral-90 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center bg-primary-main rounded-[40px] py-16 px-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 relative z-10">Mulai Bangun Rumah Impian Anda Hari Ini</h2>
                    <Link 
                        to="/contact" 
                        className="inline-block bg-white text-primary-main hover:bg-gray-100 font-bold py-4 px-12 rounded-2xl transition-all shadow-xl hover:shadow-2xl relative z-10"
                    >
                        Hubungi Kami Sekarang
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default CaraKerja;
