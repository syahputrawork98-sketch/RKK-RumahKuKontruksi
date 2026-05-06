import React from "react";
import SectionHeading from "./SectionHeading";
import TimCard from "./TimCard";

const TentangTim = () => {
    const team = [
        { name: "Muhammad Syahputra", role: "Founder & CEO", img: "/img/syahputra.jpg" },
        { name: "Nama Lain", role: "CTO", img: "/img/ctopic.jpg" },
        { name: "Nama Lain", role: "Lead Engineer", img: "/img/engineer.jpg" },
    ];

    return (
        <section className="py-16">
            <SectionHeading
                title="Tim Kami"
                subtitle="Orang-orang hebat di balik Rumahku Konstruksi"
            />

            <div className="grid md:grid-cols-3 max-w-5xl mx-auto gap-8">
                {team.map((t, index) => (
                    <TimCard key={index} {...t} />
                ))}
            </div>
        </section>
    );
};

export default TentangTim;
