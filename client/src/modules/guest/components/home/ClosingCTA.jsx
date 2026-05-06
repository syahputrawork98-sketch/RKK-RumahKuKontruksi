// client/src/modules/guest/components/home/ClosingCTA.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ClosingCTA() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-primary-main"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-hover rounded-full -mr-64 -mt-64 blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-pressed rounded-full -ml-48 -mb-48 blur-3xl opacity-50"></div>
            
            <motion.div 
                className="max-w-4xl mx-auto relative z-10 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-heading-l-bold md:text-display text-white mb-8 leading-tight">
                    Siap Mewujudkan <br /> Proyek Impian Anda?
                </h2>

                <p className="text-l-regular md:text-heading-s-regular text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Mulai bangun rumah impian Anda dengan proses yang lebih terencana, 
                    transparan, dan terdokumentasi bersama RumahKu Konstruksi.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <Link 
                        to="/contact" 
                        className="bg-white text-primary-main text-l-bold py-4 px-10 rounded-2xl transition-all shadow-2xl shadow-primary-pressed/20 hover:scale-105 active:scale-95"
                    >
                        Konsultasi Sekarang
                    </Link>
                    <Link 
                        to="/cara-kerja" 
                        className="bg-primary-hover text-white border border-white/20 text-l-bold py-4 px-10 rounded-2xl transition-all hover:bg-white hover:text-primary-main hover:scale-105 active:scale-95"
                    >
                        Lihat Cara Kerja
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
