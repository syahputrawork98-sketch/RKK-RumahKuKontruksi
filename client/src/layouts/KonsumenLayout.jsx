// client/src/layouts/KonsumenLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarKonsumen from "../components/konsumen/NavbarKonsumen";
import FooterKonsumen from "../components/konsumen/FooterKonsumen";
import { motion } from "framer-motion";

const KonsumenLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* ====== NAVBAR UNTUK KONSUMEN LOGIN ====== */}
      <NavbarKonsumen />

      {/* ====== BAGIAN KONTEN (BERGANTI SESUAI ROUTE) ====== */}
      <motion.main
        className="flex-1 container mx-auto px-6 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Outlet />
      </motion.main>

      {/* ====== FOOTER KHUSUS KONSUMEN ====== */}
      <FooterKonsumen />
    </div>
  );
};

export default KonsumenLayout;
