import React from "react";
import SectionHeading from "./SectionHeading";
import NilaiCard from "./NilaiCard";
import { FaHandshake, FaShieldAlt, FaTools } from "react-icons/fa";

const TentangNilai = () => {
    const values = [
        {
            icon: FaShieldAlt,
            title: "Terencana",
            desc: "Setiap langkah pembangunan dihitung dengan matang sejak awal untuk hasil yang optimal.",
        },
        {
            icon: FaHandshake,
            title: "Transparan",
            desc: "Keterbukaan informasi biaya dan progres adalah janji utama kami kepada klien.",
        },
        {
            icon: FaTools,
            title: "Profesional",
            desc: "Didukung oleh tenaga ahli yang kompeten dan sistem kerja yang terorganisir.",
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <SectionHeading
                title="Nilai-Nilai Kami"
                subtitle="Prinsip yang membentuk identitas Rumahku Konstruksi"
            />

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {values.map((item, index) => (
                    <NilaiCard key={index} {...item} />
                ))}
            </div>
        </section>
    );
};

export default TentangNilai;
