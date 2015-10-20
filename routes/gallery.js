var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/new', function (req, res) {
  res.render('new');
});

router.get('/:id', function (req, res) {
  res.render('single');
});


router.get('/:id/edit', function (req, res) {
  res.render('edit');
});
module.exports = router;