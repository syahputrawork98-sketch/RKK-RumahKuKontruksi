import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaProjectDiagram, FaStream, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const NavbarKonsumen = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-teal-700 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dmv4vtgbw/image/upload/v1760437039/RKK-logo_ougu97.png"
            alt="RKK Logo"
            className="w-12 h-12 object-contain rounded-full p-1"
          />
          {/* Nama Konsumen di desktop */}
          <h2 className="hidden md:block text-xl font-semibold text-teal-700">
            Nama Konsumen
          </h2>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/konsumen/TimelineProyek"
            className={({ isActive }) =>
              `flex items-center gap-1 font-medium transition-colors ${
                isActive ? "text-teal-500" : "hover:text-teal-500"
              }`
            }
          >
            <FaStream /> Timeline
          </NavLink>

          <NavLink
            to="/konsumen/proyek"
            className={({ isActive }) =>
              `flex items-center gap-1 font-medium transition-colors ${
                isActive ? "text-teal-500" : "hover:text-teal-500"
              }`
            }
          >
            <FaProjectDiagram /> Proyek
          </NavLink>

          <NavLink
            to="/konsumen/profil"
            className={({ isActive }) =>
              `flex items-center gap-1 font-medium transition-colors ${
                isActive ? "text-teal-500" : "hover:text-teal-500"
              }`
            }
          >
            <FaUserCircle /> Profil
          </NavLink>

          <button
            className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-700 px-3 py-1 rounded transition-colors"
            onClick={() => alert("Logout clicked!")}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* BUTTON HAMBURGER MOBILE */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col gap-4 p-4">
            <NavLink
              to="/konsumen/timeline"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-colors ${
                  isActive ? "text-teal-500" : "hover:text-teal-500"
                }`
              }
            >
              <FaStream /> Timeline
            </NavLink>

            <NavLink
              to="/konsumen/proyek"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-colors ${
                  isActive ? "text-teal-500" : "hover:text-teal-500"
                }`
              }
            >
              <FaProjectDiagram /> Proyek
            </NavLink>

            <NavLink
              to="/konsumen/profil"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-colors ${
                  isActive ? "text-teal-500" : "hover:text-teal-500"
                }`
              }
            >
              <FaUserCircle /> Profil
            </NavLink>

            <button
              className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-700 px-3 py-1 rounded transition-colors"
              onClick={() => { setMenuOpen(false); alert("Logout clicked!"); }}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarKonsumen;
