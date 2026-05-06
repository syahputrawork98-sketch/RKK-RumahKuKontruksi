// client/src/modules/guest/components/home/PlanningSection.jsx
import { motion } from "framer-motion";

export default function PlanningSection() {
    return (
        <section className="bg-primary-surface py-24 border-t border-primary-border">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">

                <motion.img
                    src="https://images.unsplash.com/photo-1608303588026-884930af2559?q=80&w=703&auto=format&fit=crop"
                    alt="Perancangan dan Perencanaan"
                    className="max-w-sm w-full rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                />

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-heading-l-bold text-primary-main mb-4">
                        Perancangan dan Perencanaan
                    </h2>

                    <p className="text-l-regular text-neutral-90">
                        Semua proyek besar dimulai dari perencanaan yang baik. Kami
                        membantu Anda dalam setiap langkah — mulai dari desain arsitektur,
                        analisa kebutuhan, hingga perhitungan biaya material. Dengan tim
                        profesional dan pendekatan sistematis, hasil rancangan mencerminkan
                        gaya hidup Anda sekaligus efisien secara fungsional.
                        <br /><br />
                        Kami juga menyediakan simulasi 3D agar Anda dapat melihat hasil
                        akhir bangunan sebelum pembangunan dimulai. Setiap detail
                        dipertimbangkan: dari tata ruang, pencahayaan alami, hingga
                        sirkulasi udara — memastikan rumah Anda nyaman, estetis, dan
                        tahan lama.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
