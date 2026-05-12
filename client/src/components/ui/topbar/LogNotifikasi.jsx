// client/src/components/ui/topbar/LogNotifikasi.jsx
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const categoryColor = {
    pembayaran: "bg-blue-100 text-blue-700",
    proyek: "bg-green-100 text-green-700",
    user: "bg-purple-100 text-purple-700",
    sistem: "bg-orange-100 text-orange-700",
};

const LogNotifikasi = ({ notifList = [], onMarkRead, onMarkAllRead }) => {
    return (
        <div className="w-96 bg-white rounded-3xl shadow-2xl border border-teal-100 overflow-hidden z-50 animate-fadeIn">
            <div className="px-6 py-4 bg-teal-600 flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-widest">
                    Notifikasi
                </h3>
                {notifList.some(n => !n.readAt) && (
                    <button 
                        onClick={onMarkAllRead}
                        className="text-[10px] font-black text-teal-100 hover:text-white uppercase tracking-widest transition-colors"
                    >
                        Mark All Read
                    </button>
                )}
            </div>

            {notifList.length === 0 ? (
                <div className="py-12 px-6 text-center space-y-4">
                    <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-300 mx-auto">
                        <FiCheckCircle size={32} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-neutral-900 uppercase tracking-tight">Tidak Ada Notifikasi</p>
                        <p className="text-[10px] font-bold text-neutral-400 mt-1 uppercase italic tracking-tighter leading-relaxed">
                            Semua sudah terpantau dengan baik.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {notifList.map((item, i) => (
                        <div
                            key={item.id || i}
                            onClick={() => !item.readAt && onMarkRead(item.id)}
                            className={`px-6 py-5 border-b border-neutral-50 cursor-pointer transition-all duration-300 hover:bg-neutral-50 ${!item.readAt ? "bg-teal-50/30" : ""}`}
                        >
                            <div className="flex items-start gap-4">
                                {/* STATUS INDICATOR */}
                                <div className="pt-1.5 shrink-0">
                                    {!item.readAt ? (
                                        <span className="w-2.5 h-2.5 bg-teal-600 rounded-full inline-block animate-pulse shadow-lg shadow-teal-600/20"></span>
                                    ) : (
                                        <FiCheckCircle className="text-neutral-300" />
                                    )}
                                </div>

                                {/* CONTENT */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest bg-neutral-100 text-neutral-500">
                                            {item.eventType?.replace(/_/g, ' ') || 'SYSTEM'}
                                        </span>
                                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-tighter">
                                            {new Date(item.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>

                                    <p className={`text-xs font-black text-neutral-900 leading-tight mb-1 truncate ${!item.readAt ? "text-teal-700" : ""}`}>
                                        {item.title}
                                    </p>

                                    <p className="text-[10px] font-medium text-neutral-500 line-clamp-2 leading-relaxed">
                                        {item.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <div className="p-3 bg-neutral-50 text-center border-t border-neutral-100">
                <button className="text-[9px] font-black text-neutral-400 hover:text-teal-600 uppercase tracking-widest transition-colors">
                    Lihat Semua Aktivitas
                </button>
            </div>
        </div>
    );
};


export default LogNotifikasi;
