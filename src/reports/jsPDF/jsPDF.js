import { jsPDF as JSPDF } from 'jspdf'
import 'jspdf-autotable'

function reportRequest(name, columns, data, parameters) {
  const company = {
    name: 'ITECH 3V SAC',
    email: 'itech3v@gmail.com',
    address: 'Calle Ruben Guerra, Lurifico',
    address2: 'Chepén-La Libertad-Perú',
    phone: '956 851 617',
    facebook: 'https://www.facebook.com/iTECH3V/',
  }
  const img = new Image()
  img.src = require('@/assets/images/logos/logo.png')
  const doc = new JSPDF({})

  // Figuras
  doc.addImage(img, 'PNG', 10, 5, 25, 25)
  doc.rect(140, 5, 55, 25)

  // Datos Genereales
  doc.setFont('helvetica').setFont(undefined, 'bold').setFontSize(21).text(company.name, 64, 11)
  doc.setFont('courier').setFont(undefined, 'normal').setFontSize(9).text(company.address, 62, 17)
  doc.setFont('courier').setFont(undefined, 'normal').setFontSize(9).text(company.address2, 67, 21)
  doc.setFont('courier').setFont(undefined, 'normal').setFontSize(9).text(company.phone, 79, 25)
  doc.setFont('courier').setFont(undefined, 'normal').setFontSize(9).text(company.email, 73, 29)
  doc.setFont('helvetica').setFont(undefined, 'bold').setFontSize(14).text('REPORTE DE', 145, 17)
  doc.setFont('helvetica').setFont(undefined, 'bold').setFontSize(14).text('REQUERIMIENTOS', 145, 21)

  doc.line(10, 35, 195, 35)

  doc.setFont('helvetica').setFont(undefined, 'normal').setFontSize(10).text('Fecha Inicio:', 10, 42)
  doc.setFont('helvetica').setFont(undefined, 'normal').setFontSize(10).text(parameters.date_min, 40, 42)

  doc.setFont('helvetica').setFont(undefined, 'normal').setFontSize(10).text('Fecha Termino:', 100, 42)
  doc.setFont('helvetica').setFont(undefined, 'normal').setFontSize(10).text(parameters.date_max, 140, 42)

  doc.setFont('helvetica').setFont(undefined, 'normal').setFontSize(10).text('Estado:', 10, 48)
  doc.setFont('helvetica').setFont(undefined, 'normal').setFontSize(10).text(parameters.status, 40, 48)

  doc.setFont('helvetica').setFont(undefined, 'normal').setFontSize(10).text('Tipo Requerimiento:', 100, 48)
  doc.setFont('helvetica').setFont(undefined, 'normal').setFontSize(10).text(parameters.type_request, 140, 48)

  doc.line(10, 53, 195, 53)

  doc.autoTable({
    columns,
    body: data,
    margin: { left: 10 },
    startY: doc.pageCount > 1 ? 0 : 55,
  })

  window.open(URL.createObjectURL(doc.output('blob')))
}
export default {
  reportRequest,
}
