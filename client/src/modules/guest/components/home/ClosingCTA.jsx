// client/src/modules/guest/components/home/ClosingCTA.jsx
import { motion } from "framer-motion";

export default function ClosingCTA() {
    return (
        <motion.section
            className="py-24 px-6 bg-primary-main text-neutral-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <div className="max-w-4xl mx-auto">
                <h2 className="text-heading-l-bold text-neutral-10 mb-6">
                    Siap Mewujudkan Proyek Impian Anda?
                </h2>

                <p className="text-l-regular text-neutral-40">
                    Dengan RumahKu Konstruksi, Anda tidak hanya membangun rumah — tetapi
                    juga membangun pengalaman yang lebih baik dalam setiap langkahnya.
                    Kami menghadirkan solusi menyeluruh untuk perencanaan, implementasi,
                    dan pengawasan proyek agar semua berjalan lancar, transparan, dan
                    terukur.
                    <br /><br />
                    Mulailah perjalanan Anda bersama kami hari ini, dan rasakan bagaimana
                    teknologi membuat proses konstruksi lebih mudah dan menyenangkan.
                </p>
            </div>
        </motion.section>
    );
}
