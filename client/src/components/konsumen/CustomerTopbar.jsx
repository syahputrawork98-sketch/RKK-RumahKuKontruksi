import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { 
  FaUserCircle, 
  FaProjectDiagram, 
  FaStream, 
  FaWallet, 
  FaFileAlt, 
  FaHome, 
  FaBell, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes, 
  FaChevronDown,
  FaQuestionCircle,
  FaUserCog,
  FaCheckDouble
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import projectService from "../../services/projectService";
import notificationService from "../../services/notificationService";

const CustomerTopbar = () => {
  const { customers, selectedCustomerId, selectedCustomer, handleSelectCustomer, loading: personaLoading } = useCustomerPersona();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isPersonaListOpen, setIsPersonaListOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  
  const [notifList, setNotifList] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();

  const fetchActiveProject = async () => {
    if (selectedCustomerId) {
      try {
        const response = await projectService.getProjects({ 
          customerId: selectedCustomerId,
          status: 'active' 
        });
        if (response.success && response.data.length > 0) {
          setActiveProject(response.data[0]);
        } else {
          const allProj = await projectService.getProjects({ customerId: selectedCustomerId });
          if (allProj.success && allProj.data.length > 0) {
            setActiveProject(allProj.data[0]);
          } else {
            setActiveProject(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch context project:", err);
      }
    }
  };

  const fetchNotifications = async () => {
    if (!selectedCustomerId) return;
    try {
      const [listRes, countRes] = await Promise.all([
        notificationService.getNotifications('customer', selectedCustomerId),
        notificationService.getUnreadCount('customer', selectedCustomerId)
      ]);
      setNotifList(listRes.data || []);
      setUnreadCount(countRes.data?.count || 0);
    } catch (err) {
      console.error("Failed to fetch customer notifications:", err);
    }
  };

  useEffect(() => {
    fetchActiveProject();
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [selectedCustomerId]);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      fetchNotifications();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead('customer', selectedCustomerId);
      fetchNotifications();
    } catch (err) {
      console.error("Error marking all read:", err);
    }
  };

  const navLinks = [
    { name: "Beranda", path: "/konsumen/dashboard", icon: <FaHome /> },
    { name: "Proyek Saya", path: "/konsumen/proyek", icon: <FaProjectDiagram /> },
    { 
      name: "Timeline Progress", 
      path: "/konsumen/timeline-proyek", 
      icon: <FaStream />,
      aliases: ["/konsumen/TimelineProyek", "/konsumen/timeline"] 
    },
    { name: "Permintaan Desain", path: "/konsumen/permintaan-desain", icon: <FaProjectDiagram /> },
    { name: "Pembayaran", path: "/konsumen/pembayaran", icon: <FaWallet /> },
    { name: "Dokumen", path: "/konsumen/dokumen", icon: <FaFileAlt /> },
  ];

  const handleLogout = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    setIsNotifOpen(false);
    setIsPersonaListOpen(false);
  }, [location.pathname]);

  const isLinkActive = (link) => {
    if (location.pathname === link.path) return true;
    if (link.aliases && link.aliases.some(alias => location.pathname.startsWith(alias))) return true;
    if (location.pathname.startsWith(link.path)) return true;
    return false;
  };

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full z-[100] shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* --- LEFT: BRAND & PROJECT CONTEXT --- */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Link to="/konsumen/dashboard" className="flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/dmv4vtgbw/image/upload/v1760437039/RKK-logo_ougu97.png"
                alt="RKK Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full"
              />
              <div className="hidden sm:block text-left">
                <h1 className="text-teal-700 font-bold text-lg leading-tight uppercase tracking-tight">RKK</h1>
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">Customer Portal</p>
              </div>
            </Link>

            <div className="h-8 w-px bg-gray-100 hidden lg:block" />

            {/* Project Badge */}
            {activeProject ? (
              <div className="hidden lg:flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100 max-w-[200px]">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-[10px] font-bold text-teal-800 truncate">
                  Proyek: <span className="text-teal-600">{activeProject.name}</span>
                </span>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Belum Ada Proyek Aktif
                </span>
              </div>
            )}
          </div>

          {/* --- CENTER: DESKTOP NAV --- */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={() => 
                  `px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                    isLinkActive(link) 
                    ? "bg-teal-50 text-teal-600" 
                    : "text-gray-500 hover:text-teal-600 hover:bg-gray-50"
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>

          {/* --- RIGHT: ACTIONS & USER --- */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Notification Button */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-2.5 rounded-full transition-colors relative ${isNotifOpen ? "bg-teal-50 text-teal-600" : "text-gray-400 hover:bg-gray-50 hover:text-teal-600"}`}
              >
                <FaBell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
                    >
                      <div className="p-4 bg-teal-600 text-white flex justify-between items-center">
                        <h3 className="font-bold text-sm uppercase tracking-widest">Notifikasi</h3>
                        {notifList.some(n => !n.readAt) && (
                          <button 
                            className="text-[10px] bg-white/20 px-2 py-1 rounded hover:bg-white/30 transition-colors uppercase font-black"
                            onClick={(e) => { e.stopPropagation(); handleMarkAllRead(); }}
                          >
                            Mark All Read
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifList.length === 0 ? (
                          <div className="p-8 text-center text-gray-400 italic text-xs">
                            Tidak ada notifikasi baru.
                          </div>
                        ) : (
                          notifList.map((notif) => (
                            <div 
                              key={notif.id} 
                              onClick={() => !notif.readAt && handleMarkAsRead(notif.id)}
                              className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer relative ${!notif.readAt ? "bg-teal-50/30" : ""}`}
                            >
                              {!notif.readAt && <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-full" />}
                              <p className={`text-sm mb-1 leading-relaxed ${!notif.readAt ? "font-bold text-teal-900" : "text-gray-600"}`}>
                                {notif.title}
                              </p>
                              <p className="text-[11px] text-gray-500 line-clamp-2 mb-1">{notif.message}</p>
                              <p className="text-[9px] text-gray-400 uppercase font-black tracking-wider">
                                {new Date(notif.createdAt).toLocaleDateString('id-ID')} • {new Date(notif.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="p-3 text-center bg-gray-50">
                        <button 
                          className="text-[10px] text-teal-600 font-black uppercase tracking-widest hover:underline"
                          onClick={() => navigate("/konsumen/dokumen")}
                        >
                          Lihat Aktivitas
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-1 md:p-1.5 hover:bg-gray-50 rounded-full transition-all group border border-transparent hover:border-gray-100"
              >
                <img 
                  src={`https://ui-avatars.com/api/?name=${selectedCustomer?.name || 'User'}&background=0D9488&color=fff`} 
                  alt={selectedCustomer?.name} 
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border-2 border-teal-100 group-hover:border-teal-500 transition-colors shadow-sm"
                />
                <div className="hidden lg:block text-left mr-1">
                  <p className="text-xs font-bold text-gray-800 leading-none mb-1">{selectedCustomer?.name?.split(' ')[0] || 'Guest'}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-[9px] text-teal-600 font-black uppercase tracking-widest leading-none">Konsumen</p>
                    <div className="w-1 h-1 bg-teal-300 rounded-full" />
                  </div>
                </div>
                <FaChevronDown className={`text-gray-400 text-xs transition-transform ${isUserDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isUserDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
                    >
                      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Akun Aktif</p>
                          <span className="text-[9px] bg-teal-500 text-white px-1.5 py-0.5 rounded-full font-black uppercase">Local Dev</span>
                        </div>
                        <p className="font-bold text-gray-800 text-sm truncate">{selectedCustomer?.name || 'Belum Terpilih'}</p>
                        <p className="text-xs text-gray-500 truncate italic">{selectedCustomer?.email || '-'}</p>
                      </div>

                      <div className="p-2">
                        <button 
                          onClick={() => {
                            setIsPersonaListOpen(!isPersonaListOpen);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-teal-700 bg-teal-50 hover:bg-teal-100 transition-all font-bold"
                        >
                          <div className="flex items-center gap-3">
                            <FaUserCog /> <span>Ganti Persona</span>
                          </div>
                          <FaChevronDown className={`text-xs transition-transform ${isPersonaListOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {isPersonaListOpen && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-2 space-y-1 max-h-48 overflow-y-auto pr-1"
                            >
                              {customers.map((c) => (
                                <button
                                  key={c.id}
                                  onClick={() => handleSelectCustomer(c.id)}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                                    selectedCustomerId === c.id 
                                    ? "bg-teal-600 text-white" 
                                    : "hover:bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full ${selectedCustomerId === c.id ? "bg-white" : "bg-teal-400"}`} />
                                  <span className="truncate">{c.name}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="h-px bg-gray-50 my-2" />

                        <Link to="/konsumen/profil" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-teal-50 hover:text-teal-600 transition-all">
                          <FaUserCog /> <span>Detail Profil</span>
                        </Link>
                      </div>

                      <div className="p-2 border-t border-gray-50">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all font-semibold"
                        >
                          <FaSignOutAlt /> <span>Keluar Portal</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden p-2 text-gray-500 hover:text-teal-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col p-4 gap-1">
              {activeProject && (
                <div className="lg:hidden flex items-center gap-2 bg-teal-50 px-4 py-3 rounded-xl mb-3">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="text-xs font-bold text-teal-800 truncate">
                     {activeProject.name}
                  </span>
                </div>
              )}
              
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={() => 
                    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all ${
                      isLinkActive(link) 
                      ? "bg-teal-50 text-teal-600" 
                      : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              ))}
              
              <div className="h-px bg-gray-50 my-2" />
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-500 font-bold hover:bg-red-50 transition-all"
              >
                <FaSignOutAlt /> Keluar Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default CustomerTopbar;
