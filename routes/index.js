var express = require('express');
var router = express.Router();
// const test = require('./../controllers/pdf_test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/formular', function(req, res, next) {
  res.render('formular', { title: 'Express' });
});

module.exports = router;
