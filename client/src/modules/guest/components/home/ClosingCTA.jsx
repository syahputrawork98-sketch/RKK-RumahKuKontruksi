// client/src/modules/guest/components/home/ClosingCTA.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ClosingCTA() {
    return (
        <section className="public-section relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-primary-main"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-hover rounded-full -mr-64 -mt-64 blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-pressed rounded-full -ml-48 -mb-48 blur-3xl opacity-50"></div>
            
            <motion.div 
                className="public-container max-w-4xl relative z-10 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="public-hero-title mb-8">
                    Siap Mewujudkan <br /> Proyek Impian Anda?
                </h2>

                <p className="public-hero-subtitle mb-12">
                    Mulai bangun rumah impian Anda dengan proses yang lebih terencana, 
                    transparan, dan terdokumentasi bersama RumahKu Konstruksi.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <Link 
                        to="/contact" 
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
                </div>
            </motion.div>
        </section>
    );
}
