import jsPDF from 'jspdf';
import 'jspdf-autotable';

const safeString = (value) => value || "-";

export const exportSupervisorWeeklyReportToPdf = (report) => {
    if (!report) return;

    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text('Laporan Mingguan Pengawas', 14, 22);
    
    // Project & Report Info
    doc.setFontSize(11);
    doc.text(`Proyek: ${safeString(report.project?.name)} (${safeString(report.project?.projectCode)})`, 14, 32);
    
    const startDate = report.weekStartDate ? new Date(report.weekStartDate).toLocaleDateString('id-ID') : '-';
    const endDate = report.weekEndDate ? new Date(report.weekEndDate).toLocaleDateString('id-ID') : '-';
    doc.text(`Periode: ${startDate} - ${endDate}`, 14, 38);
    
    doc.text(`Status: ${safeString(report.status)}`, 14, 44);
    doc.text(`Progress Fisik (Snapshot): ${report.verifiedProgressSnapshot || 0}%`, 14, 50);

    let currentY = 60;

    // Summary section
    doc.setFontSize(14);
    doc.text('Ringkasan Evaluasi', 14, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    const summaryLines = doc.splitTextToSize(safeString(report.summary), 180);
    doc.text(summaryLines, 14, currentY);
    currentY += (summaryLines.length * 5) + 10;

    // Details Table Data
    const detailsData = [
        ['Kualitas (Quality)', safeString(report.qualityNotes)],
        ['Keselamatan (Safety)', safeString(report.safetyNotes)],
        ['Kendala (Blockers)', safeString(report.blockerNotes)],
        ['Rekomendasi', safeString(report.recommendation)],
        ['Draft Konsumen', safeString(report.customerSummaryDraft)]
    ];

    doc.autoTable({
        startY: currentY,
        head: [['Kategori', 'Catatan']],
        body: detailsData,
        theme: 'grid',
        headStyles: { fillColor: [15, 23, 42] },
        styles: { fontSize: 10 },
        columnStyles: {
            0: { cellWidth: 40, fontStyle: 'bold' }
        }
    });

    currentY = doc.lastAutoTable.finalY + 10;

    // Additional Notes
    if (report.notes && report.notes.length > 0) {
        doc.setFontSize(14);
        doc.text('Catatan Detail Tambahan', 14, currentY);
        currentY += 8;
        
        const notesData = report.notes.map(note => [
            safeString(note.severity).toUpperCase(),
            safeString(note.type).toUpperCase(),
            safeString(note.content),
            note.progress !== null && note.progress !== undefined ? `${note.progress}%` : '-'
        ]);

        doc.autoTable({
            startY: currentY,
            head: [['Severity', 'Type', 'Detail', 'Progress']],
            body: notesData,
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42] },
            styles: { fontSize: 9 }
        });
    }

    const safeFileName = String(report.project?.projectCode || "Draft").replace(/[^a-z0-9-_]/gi, "_");
    doc.save(`Laporan_Mingguan_${safeFileName}.pdf`);
};
