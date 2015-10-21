var express = require('express');
var router = express.Router();
var listingsArray = require('./../listingsArray');

router.get('/', function (req, res) {
  var listingCopy = listingsArray.map(function (c) {
    return c;
  });
  var listings2d = [];
  while(listingCopy.length) {
    listings2d.push(listingCopy.splice(0, 3));
  }
  res.render('index', {
    listings : listings2d
  });
});

router.get('/new', function (req, res) {
  res.render('new');
});

router.post('/', function (req, res) {
  var newPicture = {
    picture : req.body.url,
    description : req.body.short,
    link : req.body.link,
    id : req.body.id,
    long_description : req.body.long
  };
  listingsArray.push(newPicture);
  res.render('single',{
    listings : listingsArray,
    detail : newPicture
  });
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