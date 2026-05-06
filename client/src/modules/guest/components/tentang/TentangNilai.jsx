import React from "react";
import SectionHeading from "./SectionHeading";
import NilaiCard from "./NilaiCard";
import { FaHandshake, FaShieldAlt, FaTools } from "react-icons/fa";

const TentangNilai = () => {
    const values = [
        {
            icon: FaHandshake,
            title: "Integritas",
            desc: "Mengutamakan kejujuran dan transparansi dalam semua proses.",
        },
        {
            icon: FaShieldAlt,
            title: "Keamanan",
            desc: "Menjamin kenyamanan dan keamanan seluruh pihak yang terlibat.",
        },
        {
            icon: FaTools,
            title: "Profesionalisme",
            desc: "Standar tinggi dalam pengerjaan proyek konstruksi.",
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
