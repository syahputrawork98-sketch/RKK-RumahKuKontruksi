// client/src/modules/guest/components/home/ImplementationSection.jsx
import { motion } from "framer-motion";
import { FaCheckCircle, FaClipboardList, FaHardHat, FaCamera } from "react-icons/fa";

export default function ImplementationSection() {
    const features = [
        { title: "Laporan Progres Harian", icon: <FaClipboardList /> },
        { title: "Pengawasan Kualitas Ketat", icon: <FaHardHat /> },
        { title: "Dokumentasi Foto Lapangan", icon: <FaCamera /> },
        { title: "Timeline Lebih Terkontrol", icon: <FaCheckCircle /> },
    ];

    return (
        <section className="bg-white py-24 overflow-hidden border-t border-neutral-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
                    {/* Visual Side */}
                    <motion.div 
                        className="lg:w-1/2 relative"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://plus.unsplash.com/premium_photo-1681692092648-9243865930fa?q=80&w=1170&auto=format&fit=crop"
                            alt="Implementasi Perancangan"
                            className="w-full rounded-[40px] shadow-2xl relative z-10"
                        />
                        
                        {/* Overlapping Progress Card */}
                        <motion.div 
                            className="absolute -top-6 -left-6 md:-left-12 bg-neutral-100 p-6 rounded-[32px] shadow-2xl z-20 text-white max-w-[240px] border border-white/10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-primary-main rounded-full flex items-center justify-center">
                                    <FaCheckCircle className="text-white" />
                                </div>
                                <p className="text-s-bold">Progres Real-time</p>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-main w-3/4"></div>
                                </div>
                                <p className="text-xs-regular text-neutral-40">Fondasi & Struktur (75%)</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary-main text-s-bold uppercase tracking-widest mb-4 block">Tahap 02: Implementasi</span>
                        <h2 className="text-heading-l-bold md:text-display-s text-neutral-100 mb-6 leading-tight">
                            Eksekusi Lapangan yang <br /> <span className="text-primary-main">Transparan & Terpantau</span>
                        </h2>

                        <p className="text-l-regular text-neutral-80 mb-10 leading-relaxed">
                            Kami memastikan setiap tahapan pembangunan berjalan sesuai spesifikasi 
                            dan jadwal yang telah ditentukan. Anda mendapatkan kendali penuh 
                            melalui sistem pelaporan kami.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <motion.div 
                                    key={index}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-20 border border-neutral-30 hover:border-primary-main/30 hover:bg-white transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="text-primary-main text-xl">
                                        {feature.icon}
                                    </div>
                                    <span className="text-m-bold text-neutral-100">{feature.title}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
