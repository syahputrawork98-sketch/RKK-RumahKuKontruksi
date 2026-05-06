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

            {/* Showcase Grid */}
            <section className="py-24 px-6 bg-white">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {projects.map((project) => (
                            <motion.div 
                                key={project.id}
                                className="group bg-white rounded-[40px] overflow-hidden shadow-sm border border-neutral-30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                {/* Image Area */}
                                <div className="relative h-80 overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-neutral-100/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-s-bold text-primary-main shadow-lg border border-white/20">
                                            {project.type}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className={`px-4 py-2 rounded-2xl text-s-bold shadow-lg ${
                                            project.status === "Selesai" ? "bg-success-main text-white" :
                                            project.status === "Berjalan" ? "bg-primary-main text-white" :
                                            "bg-warning-main text-white"
                                        }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-10 flex flex-col flex-grow">
                                    <h3 className="text-heading-m-bold md:text-heading-l-bold mb-4 text-neutral-100 group-hover:text-primary-main transition-colors leading-tight">
                                        {project.title}
                                    </h3>
                                    
                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-neutral-70 text-m-bold">Progres Pembangunan</span>
                                            <span className="text-primary-main text-l-bold">{project.progress}%</span>
                                        </div>

                                        {/* Premium Progress Bar */}
                                        <div className="w-full h-3 bg-neutral-20 rounded-full overflow-hidden p-0.5 border border-neutral-30">
                                            <motion.div 
                                                className="h-full bg-primary-main rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${project.progress}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                viewport={{ once: true }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Final CTA Section */}
            <section className="py-24 px-6 bg-neutral-20">
                <div className="container mx-auto text-center max-w-4xl">
                    <motion.h2 
                        className="text-heading-l-bold md:text-display mb-8 text-neutral-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Punya Rencana Bangun <br /> atau Renovasi?
                    </motion.h2>
                    <motion.p 
                        className="text-l-regular text-neutral-80 mb-12 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Kami membantu Anda merencanakan setiap detail pekerjaan secara matang sebelum eksekusi dimulai. 
                        Wujudkan hunian impian dengan proses yang transparan dan hasil berkualitas.
                    </motion.p>
                    <motion.div 
                        className="flex flex-wrap justify-center gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link 
                            to="/contact" 
                            className="bg-primary-main text-white text-l-bold py-4 px-12 rounded-2xl transition-all shadow-xl hover:bg-primary-hover hover:scale-105"
                        >
                            Mulai Konsultasi
                        </Link>
                        <Link 
                            to="/layanan" 
                            className="border-2 border-primary-main text-primary-main text-l-bold py-4 px-12 rounded-2xl transition-all hover:bg-primary-main hover:text-white"
                        >
                            Lihat Layanan
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default Proyek;
