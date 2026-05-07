import React from "react";
import { Outlet } from "react-router-dom";
import CustomerTopbar from "../components/konsumen/CustomerTopbar";
import FooterKonsumen from "../components/konsumen/FooterKonsumen";
import { motion } from "framer-motion";

const KonsumenLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* ====== NAVBAR CUSTOMER PORTAL ====== */}
      <CustomerTopbar />

      {/* ====== BAGIAN KONTEN ====== */}
      <motion.main
        className="flex-1 container mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-12"
        initial={{ opacity: 0, y: 10 }}
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
