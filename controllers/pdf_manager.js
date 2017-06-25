const PDFDocument = require('pdfkit');
const fs = require('fs');
const uuid = require('uuid/v1');					
const path = __dirname + '/../pdfs/';

var font = __dirname + "/LiberationSans-Regular.ttf"
var fontB = __dirname + "/LiberationSans-Bold.ttf"

var pageWidth = 500
var rightColumnWidth = 160
var rightColumnOffset = pageWidth - rightColumnWidth
var leftColumnOffset = 30
var signatureOffset = 300
var alignRight = {width: pageWidth, align: 'right', lineGap: 5 }
var alignRight2 = {width: rightColumnWidth, align: 'left', lineGap: 5, continued: false }
var alignRight3 = {width: rightColumnWidth, align: 'left', lineGap: 5, continued: true }
var alignCenter = {align: "center", lineGap: 5}
var alignContent = {width: pageWidth, align: "left", lineGap: 3, continued: true }
var alignContent2 = {width: pageWidth, align: "left", lineGap: 3, continued: false }

var local = {
	"instanta" : "JUDECĂTORIA RÂŞCANI",
	"r_nume": "Rotari Vasile",
	"r_adresa": "mun. Chişinău, Str. Dimo 1",
	"p_nume": "Popa Mihai",
	"p_adresa": "mun. Chişinău, str. V. Alecsandri nr. 49",
	"imprumut_data": "12.05.2017",
	"imprumut_suma": 500,
	"restituire_data": "15.06.2017",
	"suma_dobanda": 300,
	"cerere_data": "25.06.2017",
	"suma_penalitate": 300
}

function instanta(doc, data) {
	doc.translate(rightColumnOffset,0).font(font, 13).text(data.instanta, alignRight2)
}

function reclamant(doc, data) {
	var text = data.r_nume + "\n"+"Domiciliu: " + data.r_adresa;
	doc.moveDown()
	doc.font(fontB, 12).text("Reclamant: ", alignRight3).font(font, 12).text(text, alignRight2).restore();
}

function parat(doc, data) {
	var text = data.p_nume + "\n"+"Domiciliu: " + data.p_adresa;
	doc.moveDown()
	doc.font(fontB, 12).text("Pârât: ", alignRight3).font(font, 12).text(text, alignRight2).restore();
}

function cerereTitlu(doc, data) {
	var text = "CERERE DE CHEMARE ÎN JUDECATĂ\nprivind încasarea datoriei"
	doc.translate(-rightColumnOffset,0).moveDown().moveDown()
	doc.font(fontB, 13).text(text, alignCenter);
}

function continut(doc, data) {
	var text = "    La data de " + data.imprumut_data + " am dat cu împrumut suma de " + data.imprumut_suma + " lei. "
	doc.moveDown()
	doc.font(font, 12).text(text, alignContent)
	var text2 = "La data " + data.restituire_data + " suma de " + data.imprumut_suma + " lei urma să fie restituită. "
	doc.font(font, 12).text(text2, alignContent)
	var text3 = "Deoarece împrumutul nu a fost restituit în termen, consider oportun să fie încasată și suma de " + data.suma_dobanda 
	+ " lei cu titlu de dobândă pentru perioada de întârziere de la data " + data.restituire_data + " până la data de " + data.cerere_data 
	+ " precum și suma de " + data.suma_penalitate + " lei cu titlu de penalitate."
	doc.font(font, 12).text(text3, alignContent2)
	var text4 = "    Conform art. art.872, alin.(1) Cod Civil al RM, în cazul în care împrumutatul nu restituie în termen împrumutul,"
	+ " împrumutătorul poate cere pentru întreaga sumă datorată o dobândă în mărimea prevăzută la art.619, Cod Civil al RM dacă legea" 
	+ " sau contractul nu prevede altfel. În conformitate cu art. 619 al. (1) şi (2), Cod civil, dobânda de întârziere se compune din"
	+ " suma datoriei iniţiale înmulţită cu rata de refinanţare (de bază) a Băncii Naţionale a Moldovei sumată cu 9% pentru fiecare zi" 
	+ " de întârziere, împărţită la numărul de zile dintr-un an (365 de zile) şi, ulterior, înmulţită cu numărul efectiv al zilelor de"
	+ " întârziere. Pentru suma datoriei finale se adună suma dobânzii de întârziere cu suma datoriei iniţiale. "
	doc.font(font, 12).text(text4, alignContent2)
	var text5 = "    În drept, îmi întemeiez pretenţiile pe art. 166, 167, 174  CPC, art.619, 867, 871(4), 872(1), Cod civil."
	doc.font(font, 12).text(text5, alignContent2)
}

function solicit(doc, data) {
	var cost_asistenta = 3000
	var taxa_stat = 352

	var text = "Solicit:\n"
	+ "    1. Admiterea acţiunii.\n"
	+ "    2. Încasarea de la " + data.p_nume + " a sumei de " + data.imprumut_suma 
	+ " lei şi a dobânzii de întârziere în sumă de " + data.suma_dobanda + " lei. (Tabelul de calcul al dobânzii se anexează.)\n"
	+ "    3. A încasa de la pârât cheltuielile de judecată în mărime de " + eval(cost_asistenta + taxa_stat) 
	+ " de lei, ceea ce constituie " + cost_asistenta + " de lei pentru asistenţă juridică şi " + taxa_stat + " de lei taxa de stat."
	doc.moveDown()
	doc.font(font, 12).text(text, alignContent2)
}

function semnatura(doc, data) {
	var text = "Reclamant:\n" + data.r_nume
	doc.moveDown().moveDown()
	doc.translate(leftColumnOffset, 0).font(font, 12).text(text, alignContent)
	doc.translate(-leftColumnOffset, 0)
	doc.translate(signatureOffset, 0).font(font, 12).text("_______________", alignRight2)
}

function temp_format_data(data) {
	local.instanta = data.instanta || local.instanta
	local.r_nume = data.r_nume || local.r_nume
	local.r_adresa = data.r_adresa || local.r_adresa
	local.p_nume = data.p_nume || local.p_nume
	local.p_adresa = data.p_adresa || local.p_adresa
	local.imprumut_data = data.imprumut_data || local.imprumut_data
	local.imprumut_suma = data.imprumut_suma || local.imprumut_suma
	local.restituire_data = data.restituire_data || local.restituire_data
	local.suma_dobanda = data.suma_dobanda || local.suma_dobanda
	local.cerere_data = data.cerere_data || local.cerere_data
	local.suma_penalitate = data.suma_penalitate || local.suma_penalitate

	return local
}

function generate(data) {
	console.log(data)
	data = temp_format_data(data)
	var doc = new PDFDocument( { size: "legal", margin: 60} );
	var fileName = uuid()
	doc.pipe(fs.createWriteStream(path + fileName + ".pdf"));

	[instanta, reclamant, parat, cerereTitlu, continut, solicit, semnatura].forEach(function(x) { x(doc, local)})

	doc.save();
	doc.end();
	return fileName
}

module.exports.path = path

module.exports.generate = generate