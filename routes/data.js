const express = require('express');
const router = express.Router();
const pdf = require('./../controllers/pdf_manager.js');

router.post('/', function(req, res, next) {
  	var url = pdf.generate(req.body)
  	res.send(url)
  	res.end()
});

module.exports = router;
