import React from "react";
import { motion } from "framer-motion";

const TentangIntro = () => {
    return (
        <section className="py-8">
            <motion.div
                className="max-w-5xl mx-auto text-center px-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                    Tentang Rumahku Konstruksi
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                    <strong>RumahKu Kontruksi</strong> didirikan untuk menjawab tantangan industri konstruksi yang seringkali tidak terencana dan sulit dipantau. Kami percaya bahwa membangun rumah impian tidak seharusnya menjadi proses yang penuh kekhawatiran. Melalui teknologi, kami membawa standar baru dalam hal transparansi, akuntabilitas, dan profesionalisme di setiap jengkal proyek Anda.
                </p>
            </motion.div>
        </section>
    );
};

export default TentangIntro;
