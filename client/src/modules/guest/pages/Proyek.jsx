import React from "react";
import { motion } from "framer-motion";

const Proyek = () => {
    const projects = [
        {
            id: 1,
            title: "Renovasi Rumah Tinggal - Bekasi",
            status: "Berjalan",
            progress: 65,
            type: "Renovasi",
            image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 2,
            title: "Pembangunan Rumah 2 Lantai - Depok",
            status: "Perencanaan",
            progress: 25,
            type: "Bangun Baru",
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 3,
            title: "Renovasi Dapur & Interior - Jakarta Timur",
            status: "Selesai",
            progress: 100,
            type: "Interior",
            image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 4,
            title: "Pembangunan Ruko Kecil - Tangerang",
            status: "Berjalan",
            progress: 45,
            type: "Komersial",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800",
        },
    ];

    return (
        <main className="pt-24 pb-16">
            {/* Hero Section */}
            <section className="relative bg-neutral-20 text-neutral-10 py-24 px-4 overflow-hidden border-b border-neutral-30">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-main/5 rounded-full -ml-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary-hover/10 rounded-full -mr-36 -mb-36 blur-2xl"></div>

                <div className="container mx-auto text-center relative z-10">
                    <motion.span 
                        className="inline-block bg-primary-main/10 text-primary-main text-s-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-primary-main/20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        Showcase Proyek
                    </motion.span>
                    <motion.h1 
                        className="text-heading-l-bold md:text-display mb-8 text-neutral-100 leading-tight drop-shadow-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Proyek RumahKu Kontruksi
                    </motion.h1>
                    <motion.p 
                        className="text-l-regular md:text-heading-s-regular text-neutral-80 max-w-3xl mx-auto mb-10 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Lihat beberapa contoh pekerjaan dan progres proyek yang menggambarkan 
                        cara kami bekerja secara terencana, transparan, dan terdokumentasi.
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
                            Konsultasikan Proyek Anda
                        </Link>
                        <Link 
                            to="/cara-kerja" 
                            className="border-2 border-primary-main text-primary-main text-l-bold py-4 px-10 rounded-xl transition-all hover:bg-primary-main hover:text-white"
                        >
                            Lihat Cara Kerja
                        </Link>
                    </motion.div>
                </div>
            </section>

                    <div className="grid md:grid-cols-2 gap-10">
                        {projects.map((project) => (
                            <motion.div 
                                key={project.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-md border border-neutral-30 group hover:shadow-xl transition-all duration-300"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative h-72 overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-m-bold text-primary-main shadow-md">
                                        {project.type}
                                    </div>
                                </div>
                                <div className="p-8 text-left">
                                    <h3 className="text-heading-m-bold mb-4 text-neutral-100 group-hover:text-primary-main transition-colors">
                                        {project.title}
                                    </h3>
                                    
                                    <div className="flex items-center justify-between mb-6">
                                        <span className={`px-4 py-1.5 rounded-xl text-s-bold ${
                                            project.status === "Selesai" ? "bg-success-surface text-success-main border border-success-border" :
                                            project.status === "Berjalan" ? "bg-primary-surface text-primary-main border border-primary-border" :
                                            "bg-warning-surface text-warning-main border border-warning-border"
                                        }`}>
                                            {project.status}
                                        </span>
                                        <span className="text-neutral-70 text-m-bold">{project.progress}% Selesai</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full h-3 bg-neutral-30 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-primary-main"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${project.progress}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            viewport={{ once: true }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Proyek;
