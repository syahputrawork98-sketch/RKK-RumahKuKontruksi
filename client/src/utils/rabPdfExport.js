import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from '../components/admin/rab/rabUtils';

const safeNumber = (value) => Number(value) || 0;

export const exportRabToPdf = (project, rabPlan) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text('Rencana Anggaran Biaya (RAB)', 14, 22);
    
    // Project Info
    doc.setFontSize(11);
    doc.text(`Proyek: ${project?.name || 'Tidak ada nama'}`, 14, 32);
    doc.text(`Klien: ${project?.customer?.name || '-'}`, 14, 38);
    doc.text(`Tipe RAB: ${rabPlan?.type || '-'}`, 14, 44);
    
    let currentY = 52;
    
    const safeFileName = String(project?.projectCode || project?.name || "Draft").replace(/[^a-z0-9-_]/gi, "_");
    const safeCategories = Array.isArray(rabPlan?.categories) ? rabPlan.categories : [];
    
    if (safeCategories.length === 0) {
        doc.text('Tidak ada data item RAB.', 14, currentY);
        doc.save(`RAB_${safeFileName}.pdf`);
        return;
    }

    const tableData = [];
    let calculatedTotal = 0;
    
    safeCategories.forEach(cat => {
        // Category Header Row
        tableData.push([
            { content: cat.name || cat.code || "Tanpa Kategori", colSpan: 6, styles: { fillColor: [230, 230, 230], fontStyle: 'bold' } }
        ]);
        
        const safeItems = Array.isArray(cat.items) ? cat.items : [];
        if (safeItems.length > 0) {
            safeItems.forEach((item, index) => {
                const safeVol = safeNumber(item.volume);
                const safePrice = safeNumber(item.unitPrice);
                const subtotal = safeVol * safePrice;
                calculatedTotal += subtotal;
                
                tableData.push([
                    index + 1,
                    item.description || "-",
                    safeVol,
                    item.unit || "-",
                    formatCurrency(safePrice),
                    formatCurrency(subtotal)
                ]);
            });
        }
    });

    const finalTotal = safeNumber(rabPlan?.totalAmount) || calculatedTotal;

    // Total Row
    tableData.push([
        { content: 'TOTAL ANGGARAN', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: formatCurrency(finalTotal), styles: { fontStyle: 'bold' } }
    ]);

    doc.autoTable({
        startY: currentY,
        head: [['No', 'Uraian Pekerjaan', 'Vol', 'Sat', 'Harga Satuan', 'Subtotal']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [15, 23, 42] },
        styles: { fontSize: 9 },
        margin: { top: 20 }
    });
    
    doc.save(`RAB_${safeFileName}.pdf`);
};
