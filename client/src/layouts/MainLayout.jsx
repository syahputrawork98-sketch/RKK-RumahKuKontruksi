// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />
      <main className="flex-1">
        <Outlet /> {/* <- konten halaman akan muncul di sini */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
