// client/src/modules/guest/components/home/AboutSection.jsx
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/fadeUpVariant";

export default function AboutSection() {
    return (
        <section className="py-24 px-6 bg-white">
            <motion.div
                className="max-w-6xl mx-auto text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.h2
                    className="text-heading-l-bold mb-6 text-primary-main"
                    variants={fadeUp}
                >
                    Tentang RumahKu Konstruksi
                </motion.h2>

                <motion.p
                    className="text-l-regular text-neutral-90 max-w-4xl mx-auto"
                    variants={fadeUp}
                    custom={1}
                >
                    <strong>RumahKu Konstruksi</strong> adalah platform digital yang
                    mempermudah proses pembangunan rumah dan proyek konstruksi modern.
                    Kami hadir untuk menjembatani <strong>konsumen</strong>,
                    <strong> mandor</strong>, dan <strong>pengawas proyek</strong> agar
                    dapat berkolaborasi dengan efisien, transparan, dan profesional.
                    <br />
                    <br />
                    Melalui sistem berbasis teknologi, setiap tahapan proyek dapat
                    dipantau secara <strong>real-time</strong>, mulai dari desain,
                    perencanaan, pembelian material, hingga penyelesaian akhir.
                    Tujuannya adalah memastikan proyek Anda berjalan
                    <strong> tepat waktu</strong>, <strong>sesuai anggaran</strong>, dan
                    <strong> bebas stres</strong>.
                </motion.p>
            </motion.div>
        </section>
    );
}
