const express = require('express');
const router = express.Router();
const path = require('path')
const pdf = require('./../controllers/pdf_manager.js');

router.get('/', function(req, res, next) {
	var fileName = req.query.id + ".pdf"
	var localPath = __dirname + "/../pdfs/" + fileName;
	res.sendFile(path.resolve(localPath));
});

module.exports = router;