import React, { useState } from 'react';
import { FiRefreshCw, FiAlertCircle, FiCheck, FiSend } from 'react-icons/fi';

const DesignRevisionForm = ({ 
  onSubmit, 
  loading = false, 
  majorCount = 0, 
  minorCount = 0,
  actorRole = 'customer' 
}) => {
  const [revisionType, setRevisionType] = useState('minor');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const isMajorLimitReached = majorCount >= 3;
  const isMinorLimitReached = minorCount >= 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!note.trim()) {
      setError('Catatan revisi wajib diisi.');
      return;
    }

    if (revisionType === 'major' && isMajorLimitReached) {
      setError('Batas revisi besar telah tercapai.');
      return;
    }

    if (revisionType === 'minor' && isMinorLimitReached) {
      setError('Batas revisi kecil telah tercapai.');
      return;
    }

    onSubmit({ revisionType, note });
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Jenis Revisi Lokal</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRevisionType('minor')}
            disabled={isMinorLimitReached}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
              revisionType === 'minor' 
                ? 'border-teal-500 bg-teal-50 text-teal-700' 
                : 'border-slate-100 text-slate-400 opacity-60 hover:opacity-100'
            } ${isMinorLimitReached ? 'cursor-not-allowed grayscale' : ''}`}
          >
            <span className="text-[10px] font-black uppercase">Minor</span>
            <span className="text-[8px] font-bold">Max 5 ({minorCount}/5)</span>
          </button>

          <button
            type="button"
            onClick={() => setRevisionType('major')}
            disabled={isMajorLimitReached}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
              revisionType === 'major' 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-slate-100 text-slate-400 opacity-60 hover:opacity-100'
            } ${isMajorLimitReached ? 'cursor-not-allowed grayscale' : ''}`}
          >
            <span className="text-[10px] font-black uppercase">Major</span>
            <span className="text-[8px] font-bold">Max 3 ({majorCount}/3)</span>
          </button>
        </div>
        <p className="text-[8px] text-slate-400 font-bold px-1 italic">
          {revisionType === 'major' 
            ? "* Major: Perubahan konsep, layout ruang utama, atau fasad bangunan." 
            : "* Minor: Penyesuaian detail material, warna, atau posisi elemen kecil."}
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Catatan Revisi</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-bold h-24 outline-none focus:ring-2 focus:ring-slate-800/20 italic"
          placeholder="Jelaskan bagian mana yang perlu diperbaiki..."
          disabled={loading || (revisionType === 'major' ? isMajorLimitReached : isMinorLimitReached)}
        />
      </div>

      {((revisionType === 'major' && isMajorLimitReached) || (revisionType === 'minor' && isMinorLimitReached)) && (
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3 items-start text-[10px] font-bold text-rose-700 animate-pulse">
          <FiAlertCircle className="flex-shrink-0 mt-0.5" size={14} />
          <p className="uppercase leading-tight">
            Batas revisi {revisionType} (Max {revisionType === 'major' ? '3' : '5'}) telah tercapai. 
            Permintaan revisi tambahan hanya dapat dilakukan melalui koordinasi langsung dengan Admin RKK.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex gap-2 items-center text-[10px] font-bold text-red-700 animate-shake">
          <FiAlertCircle className="flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || (revisionType === 'major' ? isMajorLimitReached : isMinorLimitReached)}
        className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 ${
          (revisionType === 'major' ? isMajorLimitReached : isMinorLimitReached)
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            : 'bg-slate-800 hover:bg-slate-900 text-white shadow-slate-800/30'
        }`}
      >
        {loading ? <FiRefreshCw className="animate-spin" /> : (revisionType === 'major' ? isMajorLimitReached : isMinorLimitReached) ? <FiAlertCircle /> : <FiSend />}
        {(revisionType === 'major' ? isMajorLimitReached : isMinorLimitReached) ? 'Limit Revisi Tercapai' : 'Ajukan Revisi (Lokal)'}
      </button>

      <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 space-y-2">
        <div className="flex gap-2">
          <FiAlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-[9px] text-amber-700 font-black leading-relaxed uppercase">
            SIMULASI LOKAL: Batas revisi (3 Major / 5 Minor) berlaku dalam fase pengembangan v1.
          </p>
        </div>
        <p className="text-[8px] text-slate-400 font-bold leading-tight italic">
          * Pengajuan revisi ini hanya bersifat instruksi desain lokal dan tidak memiliki implikasi legal atau perubahan kontrak fisik.
        </p>
      </div>
    </form>
  );
};

export default DesignRevisionForm;
