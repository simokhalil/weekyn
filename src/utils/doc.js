import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

class DocService {
  html2pdf = (element) => {
    const divHeight = element.offsetHeight;
    const divWidth = element.offsetWidth;

    const ratio = divHeight / divWidth;

    html2canvas(element, { width: divWidth, height: divHeight, allowTaint: true, useCORS: true })
      .then((canvas) => {
        // document.body.appendChild(canvas);
        let imgstring = canvas.toDataURL("image/png");
        let pdf = new jsPDF('p', 'px', 'a4', true);

        if (element) {
          let width = pdf.internal.pageSize.getWidth();
          let height = pdf.internal.pageSize.getHeight();
          height = ratio * width;
          // pdf.deletePage(1);
          // pdf.addPage(width, height);
          pdf.addImage(imgstring, 'PNG', 0, 0, width, height, '', 'FAST');
          // pdf.save("download.pdf");
          // pdf.output('dataurlnewwindow');
          window.open(pdf.output('bloburl'));
        }
      });
  }
}

const Doc = new DocService();
export default Doc;