import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

class DocService {
  html2pdf = (element) => {
    const divHeight = element.offsetHeight;
    const divWidth = element.offsetWidth;

    const ratio = divHeight / divWidth;

    html2canvas(element, { width: divWidth, height: divHeight })
      .then((canvas) => {
        // console.log('canvas', canvas);
        let imgstring = canvas.toDataURL("image/png");
        let pdf = new jsPDF('p', 'px', 'a4');

        if (element) {
          console.log('elemeent ok');
          let width = pdf.internal.pageSize.getWidth();
          let height = pdf.internal.pageSize.getHeight();
          height = ratio * width;
          // pdf.deletePage(1);
          // pdf.addPage(width, height);
          pdf.addImage(imgstring, 'PNG', 0, 0, width, height);
          console.log('downloading...');
          pdf.save("download.pdf");
        }
      });
  }
}

const Doc = new DocService();
export default Doc;