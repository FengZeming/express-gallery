var express = require('express');
var router = express.Router();
var listingsArray = require('./../listingsArray');

router.get('/', function (req, res) {
  res.render('index', {
    listings : listingsArray
  });
});

router.post('/', function (req, res) {
  res.render('post');
});

router.get('/new', function (req, res) {
  res.render('new');
});

router.get('/:id', function (req, res) {
  var picture_id = req.params.id;
  var this_picture = listingsArray.filter(function(c) {
    return c.id == picture_id;
  });
  if (this_picture.length > 0) {
    res.render('single', {
      listings : listingsArray,
      detail : this_picture[0]
    });
  } else {
    res.render('404');
  }
});

router.get('/:id/edit', function (req, res) {
  res.render('edit');
});
module.exports = router;