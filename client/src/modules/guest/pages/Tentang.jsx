import React from "react";
import TentangIntro from "../components/tentang/TentangIntro";
import TentangVisi from "../components/tentang/TentangVisi";
import TentangMisi from "../components/tentang/TentangMisi";
import TentangNilai from "../components/tentang/TentangNilai";
import TentangTim from "../components/tentang/TentangTim";

const Tentang = () => {
    return (
        <main className="pt-24 pb-16 space-y-12">
            <TentangIntro />
            <div className="space-y-20">
                <TentangVisi />
                <TentangMisi />
                <TentangNilai />
                <TentangTim />
            </div>
        </main>
    );
};

export default Tentang;
