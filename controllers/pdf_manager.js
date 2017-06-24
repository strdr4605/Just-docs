const PDFDocument = require('pdfkit');
const fs = require('fs');
const uuid = require('uuid/v1');					
const path = './../pdfs/';


function generate(data) {

	var doc = new PDFDocument();
	var fileName = uuid()
	doc.pipe(fs.createWriteStream(path + fileName + ".pdf"));

	doc.fontSize(10).text('Some text with an embedded font!', 100, 100)

	doc.save();
	doc.end();
	return fileName
}

module.exports.path = path

module.exports.generate = generate