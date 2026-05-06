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
            <section className="relative bg-primary-main text-neutral-10 py-24 px-4 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-hover/30 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-pressed/40 rounded-full -ml-36 -mb-36 blur-2xl"></div>

                <div className="container mx-auto text-center relative z-10">
                    <motion.span 
                        className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white text-s-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        Layanan Konstruksi Terintegrasi
                    </motion.span>
                    <motion.h1 
                        className="text-heading-l-bold md:text-display mb-8 leading-tight drop-shadow-md"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Solusi Profesional untuk <br /> Rumah Impian Anda
                    </motion.h1>
                    <motion.p 
                        className="text-l-regular md:text-heading-s-regular max-w-3xl mx-auto mb-10 text-neutral-10/90 leading-relaxed"
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
                            to="/contact" 
                            className="bg-white text-primary-main text-l-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:bg-primary-surface hover:scale-105"
                        >
                            Konsultasi Sekarang
                        </Link>
                        <Link 
                            to="/cara-kerja" 
                            className="border-2 border-white text-white text-l-bold py-4 px-10 rounded-xl transition-all hover:bg-white hover:text-primary-main"
                        >
                            Lihat Cara Kerja
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div 
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-md border border-neutral-30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="mb-6 bg-primary-surface w-16 h-16 rounded-xl flex items-center justify-center">
                                    {service.icon}
                                </div>
                                <h3 className="text-heading-m-bold mb-4 text-neutral-100">{service.title}</h3>
                                <p className="text-l-regular text-neutral-90 leading-relaxed">{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-neutral-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-heading-l-bold mb-8 text-neutral-100">Siap Mewujudkan Hunian Impian Anda?</h2>
                    <Link 
                        to="/contact" 
                        className="inline-block bg-primary-main hover:bg-primary-hover text-neutral-10 text-l-bold py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Konsultasikan Kebutuhan Anda
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Layanan;
