import { jsPDF as JSPDF } from 'jspdf'
import 'jspdf-autotable'

function report(name, columns, data) {
  const doc = new JSPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter',
  })
  doc.autoTable({
    columns,
    body: data,
    margin: { left: 0.5, top: 1.25 },
  })
  doc.setFontSize(16).text(`${name}`, 0.5, 1.0)
  doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1)
  doc.save(`${name}.pdf`)
}
export default {
  report,
}
