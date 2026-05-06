import React from "react";
import TentangIntro from "../components/tentang/TentangIntro";
import TentangVisi from "../components/tentang/TentangVisi";
import TentangMisi from "../components/tentang/TentangMisi";
import TentangNilai from "../components/tentang/TentangNilai";
import TentangTim from "../components/tentang/TentangTim";

const Tentang = () => {
    return (
        <main className="pt-20">
            <TentangIntro />
            <TentangVisi />
            <TentangMisi />
            <TentangNilai />
            <TentangTim />
        </main>
    );
};

export default Tentang;
