import React, { useState, useEffect, useCallback } from "react";
import { FiMessageSquare, FiSend, FiUser, FiInfo, FiClock, FiCheckCircle, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import projectStageCommentService from "../../services/projectStageCommentService";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";

const StageCommunicationPanel = ({ stageId, projectId }) => {
  const { selectedCustomerId, selectedCustomer } = useCustomerPersona();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyTo, setReplyTo] = useState(null); // Parent ID for reply
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await projectStageCommentService.getCommentsByStage(stageId);
      if (response.success) {
        setComments(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setError("Gagal memuat diskusi.");
    } finally {
      setLoading(false);
    }
  }, [stageId]);

  useEffect(() => {
    if (stageId) fetchComments();
  }, [stageId, fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedCustomerId || !stageId) return;

    try {
      setSubmitting(true);
      const payload = {
        projectId,
        authorRole: "customer",
        authorId: selectedCustomerId,
        authorName: selectedCustomer?.name || "Konsumen (RKK User)",
        message: message.trim(),
        parentId: replyTo
      };

      const response = await projectStageCommentService.createComment(stageId, payload);
      if (response.success) {
        setMessage("");
        setReplyTo(null);
        fetchComments();
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Gagal mengirim tanggapan.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && comments.length === 0) {
    return (
      <div className="bg-white rounded-[32px] border border-neutral-30 p-8 text-center space-y-4 animate-pulse">
        <div className="w-12 h-12 bg-neutral-20 rounded-2xl mx-auto" />
        <div className="h-4 bg-neutral-20 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-neutral-20 rounded w-1/2 mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-[32px] border border-red-100 p-8 text-center space-y-3 animate-fadeIn">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 mx-auto shadow-sm">
          <FiAlertCircle size={24} />
        </div>
        <div>
          <p className="text-s-bold text-red-700 uppercase tracking-widest">Gagal Memuat</p>
          <p className="text-[10px] text-red-600 mt-1">{error}</p>
        </div>
        <button 
          onClick={fetchComments}
          className="btn btn-xs bg-red-100 hover:bg-red-200 text-red-700 border-none rounded-lg px-4 mt-2"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="bg-white rounded-[32px] border border-neutral-30 p-6 shadow-sm">
        <h3 className="text-heading-s-bold text-neutral-100 flex items-center gap-3">
          <FiMessageSquare className="text-primary-main" /> Update Resmi Proyek
        </h3>
        <p className="text-xs-regular text-neutral-60 mt-1">
          Jalur komunikasi resmi terkait perkembangan tahap ini.
        </p>
      </div>

      {/* Discussion List */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-2 min-h-[300px] lg:max-h-[60vh] scrollbar-thin scrollbar-thumb-neutral-30 scrollbar-track-transparent">
        {comments.length === 0 ? (
          <div className="bg-neutral-20/50 rounded-3xl p-10 text-center border-2 border-dashed border-neutral-30 flex flex-col items-center justify-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-neutral-30 shadow-sm">
              <FiInfo size={32} />
            </div>
            <div>
              <p className="text-s-bold text-neutral-60 uppercase tracking-widest">Belum Ada Update</p>
              <p className="text-xs-regular text-neutral-50 mt-1 italic">Admin/Pengawas belum mengirimkan update resmi untuk tahap ini.</p>
            </div>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-3 animate-fadeIn">
              {/* Parent Comment (Admin Update) */}
              <div className="bg-white rounded-[24px] p-5 border border-primary-main/10 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow duration-300">
                {comment.isOfficial && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-primary-main text-white text-[9px] font-black uppercase tracking-widest rounded-bl-xl shadow-sm">
                    Official Update
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 bg-primary-surface rounded-xl flex items-center justify-center text-primary-main shadow-inner">
                    <FiUser size={16} />
                  </div>
                  <div>
                    <p className="text-xs-bold text-neutral-100">{comment.authorName || "Admin RKK"}</p>
                    <p className="text-[10px] text-neutral-50 font-bold uppercase tracking-tighter flex items-center gap-1 mt-0.5">
                      <FiClock size={10} className="text-primary-main" /> {new Date(comment.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                </div>
                <div className="bg-neutral-20/40 rounded-2xl p-4 border border-neutral-30/30">
                  <p className="text-sm text-neutral-80 leading-relaxed italic font-medium">"{comment.message}"</p>
                </div>
                
                <button 
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  className={`mt-4 text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 transition-all px-4 py-2 rounded-full border ${
                    replyTo === comment.id 
                    ? "bg-neutral-100 text-white border-neutral-100" 
                    : "bg-white text-primary-main border-primary-main/20 hover:bg-primary-surface"
                  }`}
                >
                  <FiSend size={12} /> {replyTo === comment.id ? "Batalkan" : "Tanggapi Update"}
                </button>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-6 md:ml-8 space-y-3 border-l-2 border-neutral-30 pl-4 md:pl-6 py-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className={`p-4 rounded-2xl border transition-all hover:shadow-sm ${reply.authorRole === 'admin' ? 'bg-primary-surface/40 border-primary-main/20 shadow-sm' : 'bg-white border-neutral-30'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm ${reply.authorRole === 'admin' ? 'bg-primary-main text-white' : 'bg-neutral-80 text-white'}`}>
                            {reply.authorRole === 'admin' ? 'Admin' : 'Konsumen'}
                          </span>
                          <p className="text-[10px] font-black text-neutral-100 uppercase">{reply.authorName}</p>
                        </div>
                        <p className="text-[9px] font-bold text-neutral-40 uppercase tracking-tighter">{new Date(reply.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <p className="text-xs text-neutral-70 leading-relaxed font-medium">{reply.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reply Form */}
      <div className={`bg-white rounded-[32px] border-2 p-5 shadow-xl transition-all duration-500 ${replyTo ? "border-primary-main ring-4 ring-primary-main/5" : "border-neutral-30 shadow-neutral-100"}`}>
        {!selectedCustomerId ? (
          <div className="text-center py-4 space-y-3 animate-fadeIn">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
              <FiInfo size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest">Persona Diperlukan</p>
              <p className="text-[11px] text-neutral-50 font-medium px-4">Pilih persona Konsumen yang valid untuk menanggapi update resmi.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <label className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${replyTo ? "text-primary-main" : "text-neutral-40"}`}>
                <FiMessageSquare size={12} /> {replyTo ? "Mode Tanggapan" : "Pilih Update Dahulu"}
                {replyTo && <FiCheckCircle className="animate-bounce" />}
              </label>
              <button 
                type="button" 
                onClick={fetchComments}
                className="p-1.5 text-neutral-40 hover:text-primary-main hover:bg-neutral-20 rounded-lg transition-all"
                title="Refresh Diskusi"
              >
                <FiRefreshCw size={14} className={loading ? "animate-spin text-primary-main" : ""} />
              </button>
            </div>
            
            <div className="relative group">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={replyTo ? "Tulis tanggapan atau pertanyaan Anda di sini..." : "Silakan pilih salah satu update resmi di atas untuk mulai menanggapi."}
                disabled={!replyTo || submitting}
                className={`w-full rounded-2xl px-5 py-4 text-xs font-bold h-28 outline-none border-2 transition-all resize-none ${
                  replyTo 
                  ? "bg-white border-neutral-30 focus:border-primary-main focus:ring-4 focus:ring-primary-main/5 text-neutral-90" 
                  : "bg-neutral-20 border-transparent cursor-not-allowed opacity-50 text-neutral-40"
                }`}
              />
              {!replyTo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <p className="text-[9px] font-black uppercase text-neutral-40 bg-neutral-20 px-4 py-1 rounded-full border border-neutral-30/50 shadow-sm">Kunci: Pilih Update Di Atas</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!replyTo || !message.trim() || submitting}
              className="w-full py-4 bg-primary-main hover:bg-primary-hover active:scale-[0.98] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-xl shadow-primary-main/25"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <FiSend size={14} />
                  <span>Kirim Tanggapan</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StageCommunicationPanel;
