var PDFDocument = require('pdfkit');
var fs = require('fs');


function test() {
	var doc = new PDFDocument();
	doc.pipe(fs.createWriteStream('out.pdf'));

	doc.fontSize(10).text('Some text with an embedded font!', 100, 100)

	doc.save();
	doc.end();
}

test()