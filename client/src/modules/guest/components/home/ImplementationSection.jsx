// client/src/modules/guest/components/home/ImplementationSection.jsx
import { motion } from "framer-motion";

export default function ImplementationSection() {
    return (
        <section className="bg-white py-24 border-t border-teal-100">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-12">

                <motion.img
                    src="https://plus.unsplash.com/premium_photo-1681692092648-9243865930fa?q=80&w=1170&auto=format&fit=crop"
                    alt="Implementasi Perancangan"
                    className="max-w-sm w-full rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                />

                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-heading-l-bold text-primary-main mb-4">
                        Implementasi dan Pengawasan Lapangan
                    </h2>

                    <p className="text-l-regular text-neutral-90">
                        Setelah desain disetujui, tim kami mengawal implementasi di
                        lapangan. Anda tidak perlu khawatir soal keterlambatan, kualitas,
                        atau pemborosan — semuanya dikontrol dengan sistem pemantauan kami.
                        <br /><br />
                        Setiap progres, dokumentasi, dan laporan harian dapat diakses
                        kapan pun. Dengan begitu, proses pembangunan menjadi lebih aman,
                        transparan, dan efisien — memastikan hasil akhir sesuai dengan
                        harapan Anda.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
