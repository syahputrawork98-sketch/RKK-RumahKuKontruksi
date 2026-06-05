import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from '../components/admin/rab/rabUtils';

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
    
    if (!rabPlan?.categories || rabPlan.categories.length === 0) {
        doc.text('Tidak ada data item RAB.', 14, currentY);
        doc.save(`RAB_${project?.projectCode || 'Draft'}.pdf`);
        return;
    }

    const tableData = [];
    
    rabPlan.categories.forEach(cat => {
        // Category Header Row
        tableData.push([
            { content: cat.name || cat.code, colSpan: 6, styles: { fillColor: [230, 230, 230], fontStyle: 'bold' } }
        ]);
        
        if (cat.items && cat.items.length > 0) {
            cat.items.forEach((item, index) => {
                const subtotal = item.unitPrice * item.volume;
                tableData.push([
                    index + 1,
                    item.description,
                    item.volume,
                    item.unit,
                    formatCurrency(item.unitPrice),
                    formatCurrency(subtotal)
                ]);
            });
        }
    });

    // Total Row
    tableData.push([
        { content: 'TOTAL ANGGARAN', colSpan: 5, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: formatCurrency(rabPlan.totalAmount), styles: { fontStyle: 'bold' } }
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
    
    doc.save(`RAB_${project?.projectCode || 'Draft'}.pdf`);
};
