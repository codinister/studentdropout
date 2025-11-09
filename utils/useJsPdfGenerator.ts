import useGetQuery from '@/state/query/useGetQuery';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// 'rgba(255, 159, 64, 0.5)'

// 'rgba(54, 162, 235, 0.5)',

const addLogoToPDF = async (doc: jsPDF) => {
  const img = await fetch('/logo.jpg'); // make sure logo.jpg is in your /public folder
  const blob = await img.blob();
  const reader = new FileReader();

  return new Promise<void>((resolve) => {
    reader.onload = function (event) {
      const imageData = event.target?.result as string;
      doc.addImage(imageData, 'JPEG', 160, 10, 35, 35); // x, y, width, height
      resolve();
    };
    reader.readAsDataURL(blob);
  });
};

const useJsPdfGenerator = ({ ...options }) => {
  const sett = useGetQuery('settings', '/settings/get-settings');

  const setting = sett.length > 0 ? sett : [];

  const { tableColumn, tableRows, reportTitle } = options;

  const schoolName = setting[0]?.schoolName || '';

  const genPdf = async () => {
    const doc = new jsPDF();

    // Add logo first
    await addLogoToPDF(doc);

    doc.setFontSize(18);
    doc.text(schoolName, 14, 15);
    doc.setFontSize(12);
    doc.text(reportTitle, 14, 25);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 32);
    doc.line(14, 35, 196, 35);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [63, 81, 181], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { left: 14, right: 14 },
    });

    const pdfBlob = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfBlob);
    window.open(pdfURL);
  };
  return { genPdf };
};

export default useJsPdfGenerator;
