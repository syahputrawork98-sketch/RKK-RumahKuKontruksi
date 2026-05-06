import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaTools, FaDraftingCompass, FaCalculator, FaEye, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

const Layanan = () => {
    const services = [
        {
            title: "Bangun Rumah Baru",
            desc: "Membantu Anda mewujudkan rumah impian dari nol dengan perencanaan matang dan konstruksi berkualitas.",
            icon: <FaHome className="text-4xl text-primary-main" />,
        },
        {
            title: "Renovasi Rumah",
            desc: "Transformasi hunian lama Anda menjadi lebih modern, fungsional, dan nyaman sesuai kebutuhan keluarga.",
            icon: <FaTools className="text-4xl text-primary-main" />,
        },
        {
            title: "Desain & Perencanaan",
            desc: "Layanan desain arsitektural dan interior yang mengedepankan estetika serta efisiensi ruang.",
            icon: <FaDraftingCompass className="text-4xl text-primary-main" />,
        },
        {
            title: "Estimasi Biaya / RAB",
            desc: "Penyusunan Rencana Anggaran Biaya yang transparan dan akurat untuk menghindari pembengkakan biaya.",
            icon: <FaCalculator className="text-4xl text-primary-main" />,
        },
        {
            title: "Pengawasan Proyek",
            desc: "Memastikan setiap tahapan pembangunan berjalan sesuai spesifikasi, jadwal, dan standar kualitas.",
            icon: <FaEye className="text-4xl text-primary-main" />,
        },
        {
            title: "Manajemen Proyek",
            desc: "Koordinasi menyeluruh antara tukang, material, dan jadwal untuk kelancaran proyek Anda.",
            icon: <FaTasks className="text-4xl text-primary-main" />,
        },
    ];

    return (
        <main className="pt-24 pb-16">
            {/* Hero Section */}
            <section className="public-section relative bg-primary-main text-white overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-hover/30 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-pressed/40 rounded-full -ml-36 -mb-36 blur-2xl"></div>

                <div className="public-container text-center relative z-10">
                    <motion.span 
                        className="public-badge !bg-white/10 !text-white !border-white/20 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        Layanan Konstruksi Terintegrasi
                    </motion.span>
                    <motion.h1 
                        className="public-hero-title mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Solusi Profesional untuk <br /> Rumah Impian Anda
                    </motion.h1>
                    <motion.p 
                        className="public-hero-subtitle mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Kami memastikan setiap tahapan bangun dan renovasi rumah Anda 
                        berjalan lebih terencana, transparan, dan terdokumentasi dengan baik.
                    </motion.p>

                    <motion.div 
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link 
                            to="/kontak" 
                            className="btn-public-white"
                        >
                            Konsultasi Sekarang
                        </Link>
                        <Link 
                            to="/cara-kerja" 
                            className="btn-public-outline !border-white !text-white hover:!bg-white hover:!text-primary-main"
                        >
                            Lihat Cara Kerja
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="public-section bg-white">
                <div className="public-container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {services.map((service, index) => (
                            <motion.div 
                                key={index}
                                className="public-card public-card-hover flex flex-col h-full"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-8 bg-primary-surface w-20 h-20 rounded-3xl flex items-center justify-center group-hover:bg-primary-main transition-colors duration-500">
                                    <div className="group-hover:text-white transition-colors duration-500">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="text-heading-m-bold mb-4 text-neutral-100 group-hover:text-primary-main transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-l-regular text-neutral-80 leading-relaxed flex-grow">
                                    {service.desc}
                                </p>
                                <div className="mt-8 flex items-center gap-2 text-primary-main text-m-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Konsultasikan Proyek Ini <span>→</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process/Value Section */}
            <section className="public-section bg-neutral-100 text-neutral-10 overflow-hidden relative">
                {/* Decorative background shape */}
                <div className="absolute top-0 right-0 w-[50%] h-full bg-primary-pressed/10 skew-x-12 transform translate-x-20"></div>

                <div className="public-container relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <motion.span 
                                className="public-eyebrow !text-primary-surface"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                Keunggulan Proses Kami
                            </motion.span>
                            <motion.h2 
                                className="public-title !text-neutral-10"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                Bukan Sekadar Mengerjakan, <br /> Tapi Mengontrol Proses
                            </motion.h2>
                            <motion.p 
                                className="public-subtitle !text-neutral-50 !mx-0"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                Kami percaya bahwa kunci keberhasilan proyek konstruksi adalah kontrol yang ketat dan transparansi total. Di RumahKu Konstruksi, setiap detail kecil diperhatikan agar Anda mendapatkan hasil terbaik tanpa stres.
                            </motion.p>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Terencana", desc: "Setiap kebutuhan direncanakan matang di awal." },
                                { title: "Transparan", desc: "Estimasi biaya dibuat terbuka tanpa biaya siluman." },
                                { title: "Terpantau", desc: "Progres pekerjaan harian dapat Anda pantau real-time." },
                                { title: "Terorganisir", desc: "Komunikasi proyek terpusat dan tercatat rapi." },
                                { title: "Terdokumentasi", desc: "Setiap perubahan pekerjaan diverifikasi dan dicatat." },
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <h4 className="text-heading-s-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-m-regular text-neutral-40">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="public-section-sm bg-neutral-20">
                <div className="public-container text-center">
                    <h2 className="public-title mb-8">Siap Mewujudkan Hunian Impian Anda?</h2>
                    <Link 
                        to="/kontak" 
                        className="btn-public-primary"
                    >
                        Konsultasikan Kebutuhan Anda
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Layanan;
