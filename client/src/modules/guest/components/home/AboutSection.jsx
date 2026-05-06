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
                    <strong>RumahKu Konstruksi</strong> lahir dari keinginan untuk menyelesaikan masalah klasik dalam pembangunan rumah: ketidakpastian biaya, progres yang sulit dipantau, dan komunikasi yang terhambat. 
                    <br />
                    <br />
                    Kami menjembatani <strong>konsumen</strong>, <strong>mandor</strong>, dan <strong>pengawas proyek</strong> dalam satu platform profesional. Dengan sistem monitoring yang terintegrasi, setiap detail pekerjaan — mulai dari RAB hingga foto progres harian — terdokumentasi dengan transparan untuk memastikan hunian Anda selesai <strong>tepat waktu</strong> dan <strong>sesuai kualitas</strong>.
                </motion.p>
            </motion.div>
        </section>
    );
}
