import React, { useState, useEffect, useCallback } from "react";
import { FiX, FiMessageSquare, FiSend, FiUser, FiInfo, FiCheckCircle } from "react-icons/fi";
import projectStageCommentService from "../../services/projectStageCommentService";
import { useAdminPersona } from "../../context/AdminPersonaContext";

const AdminStageCommentModal = ({ isOpen, onClose, stage, projectId }) => {
  const { selectedAdminId } = useAdminPersona();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isOfficial, setIsOfficial] = useState(true);
  const [replyTo, setReplyTo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!stage?.id) return;
    try {
      setLoading(true);
      const response = await projectStageCommentService.getCommentsByStage(stage.id);
      if (response.success) {
        setComments(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoading(false);
    }
  }, [stage?.id]);

  useEffect(() => {
    if (isOpen && stage?.id) {
      fetchComments();
      setReplyTo(null);
      setMessage("");
    }
  }, [isOpen, stage?.id, fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedAdminId || !stage?.id) return;

    try {
      setSubmitting(true);
      const payload = {
        projectId,
        authorRole: "admin",
        authorId: selectedAdminId,
        authorName: "Admin RKK",
        message: message.trim(),
        parentId: replyTo,
        isOfficial: replyTo ? false : isOfficial
      };

      const response = await projectStageCommentService.createComment(stage.id, payload);
      if (response.success) {
        setMessage("");
        setReplyTo(null);
        fetchComments();
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Gagal mengirim update.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-end p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-xl h-full md:h-[92vh] md:rounded-[40px] shadow-2xl flex flex-col overflow-hidden animate-slideInRight border-l border-slate-100">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50">
              <FiMessageSquare size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-800">
                Update Tahapan: <span className="text-blue-600">{stage?.code}</span>
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-widest">
                  Customer-visible update
                </span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  Local Thread (Non-Realtime)
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-800 transition-all border border-slate-100">
            <FiX size={20} />
          </button>
        </div>

        {/* Comment List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-60 space-y-4">
              <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 animate-pulse">Sinkronisasi Diskusi...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-24 space-y-4 animate-fadeIn">
              <div className="w-20 h-20 bg-slate-100 rounded-[32px] flex items-center justify-center mx-auto text-slate-300">
                <FiInfo size={40} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Belum Ada Update Resmi</p>
                <p className="text-xs text-slate-400 font-medium mt-1">Gunakan form di bawah untuk membuat pengumuman pertama.</p>
              </div>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="space-y-4 animate-fadeIn">
                <div className={`p-6 rounded-[32px] border shadow-sm relative transition-all hover:shadow-md ${comment.isOfficial ? 'bg-white border-blue-100' : 'bg-slate-100 border-transparent'}`}>
                  {comment.isOfficial && (
                    <span className="absolute top-0 right-0 px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-bl-3xl shadow-sm">
                      Official Update
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm ${comment.authorRole === 'admin' ? 'bg-slate-800' : 'bg-slate-400'}`}>
                      <FiUser size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 uppercase tracking-wide">{comment.authorName}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(comment.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
                    <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{comment.message}"</p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <button 
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all px-4 py-2 rounded-full border ${
                        replyTo === comment.id 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-blue-600 border-blue-100 hover:bg-blue-50'
                      }`}
                    >
                      <FiSend size={12} /> {replyTo === comment.id ? "Batal Balas" : "Balas Konsumen"}
                    </button>
                    {comment.replies?.length > 0 && (
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{comment.replies.length} Tanggapan</span>
                    )}
                  </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-10 space-y-4 border-l-2 border-slate-200 pl-6 py-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="p-5 rounded-[24px] bg-white border border-slate-100 shadow-sm transition-all hover:border-blue-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${reply.authorRole === 'admin' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                              {reply.authorRole === 'admin' ? 'Admin' : 'Konsumen'}
                            </span>
                            <p className="text-[10px] font-black text-slate-700 uppercase">{reply.authorName}</p>
                          </div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(reply.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Form */}
        <div className="p-8 border-t border-slate-100 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          {!selectedAdminId ? (
            <div className="p-6 bg-amber-50 rounded-[2rem] text-center border border-amber-100 animate-pulse">
               <FiInfo className="mx-auto text-amber-500 mb-2" size={24} />
               <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">Pilih Admin Persona Dahulu</p>
               <p className="text-[11px] text-amber-700/60 font-medium mt-1">Identitas diperlukan untuk mempublikasikan update resmi.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between px-1">
                <label className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${replyTo ? 'text-blue-600' : 'text-slate-400'}`}>
                  {replyTo ? "Balas Tanggapan Konsumen" : "Konfigurasi Update Resmi"}
                </label>
                {!replyTo && (
                  <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 shadow-inner">
                    <input 
                      type="checkbox" 
                      checked={isOfficial} 
                      onChange={(e) => setIsOfficial(e.target.checked)}
                      id="isOfficial"
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isOfficial" className="text-[10px] font-black uppercase text-blue-600 cursor-pointer select-none">Official Post</label>
                  </div>
                )}
                {replyTo && (
                  <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 animate-fadeIn">
                     <FiCheckCircle size={12} />
                     <span className="text-[10px] font-black uppercase tracking-widest">Mode Balasan Aktif</span>
                  </div>
                )}
              </div>
              <div className="relative group">
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] p-6 text-xs font-bold h-32 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 focus:bg-white transition-all resize-none shadow-inner"
                  placeholder={replyTo ? "Tulis balasan profesional untuk konsumen..." : "Tulis ringkasan perkembangan pekerjaan untuk dipublikasikan ke timeline konsumen..."}
                />
              </div>
              <button 
                type="submit"
                disabled={submitting || !message.trim()}
                className="w-full py-5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all disabled:opacity-30 disabled:grayscale shadow-2xl shadow-slate-900/20"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <FiSend size={16} />
                )}
                <span>{submitting ? "Mempublikasikan..." : replyTo ? "Kirim Balasan" : "Publish ke Timeline"}</span>
              </button>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3 items-start animate-fadeIn">
                <FiInfo className="text-blue-500 mt-0.5 shrink-0" size={14} />
                <p className="text-[10px] text-blue-700 font-medium leading-relaxed italic">
                  <strong>Penting:</strong> Stage communication adalah jalur informasi transparansi untuk Konsumen. Update ini <strong>tidak mengubah Progress Resmi</strong> proyek. Progress resmi tetap diperbarui secara manual oleh Pengawas melalui modul Verifikasi.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStageCommentModal;
