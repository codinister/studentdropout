"use client";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { usePathname } from "next/navigation";

type VisualReportProps = {
  logoUrl: string;
  schoolName: string;
};

function VisualReport({ logoUrl, schoolName }: VisualReportProps) {
  const pathname = usePathname();

  const generatePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const sections = document.querySelectorAll<HTMLElement>(".report-section");
    let y = 10;

    for (let i = 0; i < sections.length; i++) {
      const el = sections[i];
      if (!el) continue;

      const canvas = await html2canvas(el, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = 180;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (y + pdfHeight > 280 && i !== 0) {
        doc.addPage();
        y = 10;
      }

      if (logoUrl) doc.addImage(logoUrl, "PNG", 15, 5, 20, 20);
      doc.setFontSize(16);
      doc.text(schoolName, 40, 15);
      doc.setFontSize(12);
      doc.text(
        `Report - ${
          pathname?.replace("/", "").toUpperCase() || "DASHBOARD"
        }`,
        40,
        22
      );

      doc.addImage(imgData, "PNG", 15, y + 25, pdfWidth, pdfHeight);

      const pageCount = doc.getNumberOfPages();
      const pageNumber = `Page ${doc.getCurrentPageInfo().pageNumber} of ${pageCount}`;
      const date = `Generated: ${new Date().toLocaleDateString()}`;
      doc.setFontSize(10);
      doc.text(pageNumber, 160, 290);
      doc.text(date, 15, 290);

      y += pdfHeight + 30;
    }

    doc.save("Full_Student_Report.pdf");
  };

  return (
    <div className="mb-6">
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        onClick={generatePDF}
      >
        Download Full PDF Report
      </button>
    </div>
  );
}

export default VisualReport;