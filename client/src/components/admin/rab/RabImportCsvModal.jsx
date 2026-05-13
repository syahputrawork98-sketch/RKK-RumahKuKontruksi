import React, { useState, useRef } from 'react';
import { FiUpload, FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { Modal, SubmitButton } from "./RabUIAtoms";

const RabImportCsvModal = ({ isOpen, onClose, onImport, submitting }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState([]);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({ total: 0, valid: 0, invalid: 0 });
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        
        if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
            setError("Hanya file .csv yang diperbolehkan.");
            return;
        }

        setFile(selectedFile);
        setError(null);
        parseCSV(selectedFile);
    };

    const parseCSV = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
            
            if (lines.length < 2) {
                setError("File CSV kosong atau hanya berisi header.");
                return;
            }

            const header = lines[0].split(",").map(h => h.trim().toLowerCase());
            const requiredColumns = ["category_code", "category_name", "item_description", "volume", "unit", "unit_price"];
            
            const missing = requiredColumns.filter(col => !header.includes(col));
            if (missing.length > 0) {
                setError(`Kolom wajib hilang: ${missing.join(", ")}`);
                return;
            }

            const rows = [];
            let validCount = 0;
            let invalidCount = 0;

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(",").map(v => v.trim());
                const row = {};
                header.forEach((h, index) => {
                    row[h] = values[index];
                });

                // Validation
                const isValid = row.category_code && row.category_name && row.item_description && 
                                !isNaN(parseFloat(row.volume)) && row.unit && !isNaN(parseFloat(row.unit_price));

                if (isValid) {
                    validCount++;
                    rows.push({
                        ...row,
                        volume: parseFloat(row.volume),
                        unit_price: parseFloat(row.unit_price),
                        isValid: true
                    });
                } else {
                    invalidCount++;
                    rows.push({ ...row, isValid: false });
                }
            }

            setPreview(rows);
            setStats({ total: lines.length - 1, valid: validCount, invalid: invalidCount });
        };
        reader.readAsText(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (stats.valid === 0) return;
        
        const validItems = preview.filter(item => item.isValid);
        onImport(validItems);
    };

    return (
        <Modal title="Import RAB via CSV" onClose={onClose} wide>
            <div className="space-y-6">
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                    <h4 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <FiInfo /> Petunjuk Format CSV
                    </h4>
                    <p className="text-[10px] text-indigo-800 font-bold leading-relaxed mb-3">
                        Gunakan header berikut: <code className="bg-white px-1 rounded text-indigo-600">category_code, category_name, item_description, volume, unit, unit_price, location, notes</code>
                    </p>
                    <div className="bg-white/50 p-2 rounded-lg font-mono text-[9px] text-indigo-900 border border-indigo-100 overflow-x-auto whitespace-nowrap">
                        01,Pekerjaan Persiapan,Pembersihan lokasi,120,m2,8500,Area Depan,Catatan...
                    </div>
                </div>

                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="group border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 hover:border-indigo-400 hover:bg-indigo-50/30 cursor-pointer transition-all"
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept=".csv"
                    />
                    <div className="w-16 h-16 bg-slate-100 group-hover:bg-indigo-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-all">
                        <FiUpload size={32} />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-black text-slate-800">{file ? file.name : "Pilih File CSV"}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Klik untuk menelusuri file Anda</p>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black text-red-600 uppercase flex items-center gap-2 animate-shake">
                        <FiAlertCircle /> {error}
                    </div>
                )}

                {preview.length > 0 && !error && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Preview Data ({stats.total} baris)</h5>
                            <div className="flex gap-4">
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                                    <FiCheckCircle /> {stats.valid} Valid
                                </span>
                                {stats.invalid > 0 && (
                                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-1.5">
                                        <FiAlertCircle /> {stats.invalid} Invalid
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto border border-slate-100 rounded-2xl">
                            <table className="w-full text-left text-[10px]">
                                <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
                                    <tr className="font-black text-slate-400 uppercase">
                                        <th className="p-3">Kat</th>
                                        <th className="p-3">Deskripsi</th>
                                        <th className="p-3 text-right">Vol</th>
                                        <th className="p-3 text-right">Harga</th>
                                        <th className="p-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {preview.map((row, idx) => (
                                        <tr key={idx} className={row.isValid ? "text-slate-700" : "bg-red-50 text-red-600"}>
                                            <td className="p-3 font-bold">{row.category_code}</td>
                                            <td className="p-3 font-medium max-w-[150px] truncate">{row.item_description}</td>
                                            <td className="p-3 text-right font-black">{row.volume} {row.unit}</td>
                                            <td className="p-3 text-right font-black">{row.unit_price}</td>
                                            <td className="p-3 text-center">
                                                {row.isValid ? (
                                                    <span className="text-emerald-500">OK</span>
                                                ) : (
                                                    <span className="text-red-500 font-black">FAIL</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <SubmitButton 
                            label={submitting ? "Mengimport..." : `Import ${stats.valid} Item Valid`} 
                            disabled={submitting || stats.valid === 0} 
                            onClick={handleSubmit}
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default RabImportCsvModal;
