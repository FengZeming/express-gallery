var express = require('express');
var router = express.Router();
var db = require('./../models');

router.get('/', function (req, res) {
  db.post.findAll()
    .then(function(posts){
      var listingCopy = posts.map(function (c) {
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
});

router.get('/new', function (req, res) {
  res.render('new');
});

router.post('/', function (req, res) {
  db.post.create({
    url : req.body.url,
    shortDesc : req.body.shortDesc,
    link : req.body.link,
    longDesc : req.body.longDesc
  });
  res.render('post');
});

router.get('/:id', function (req, res) {
  var picture_id = req.params.id;
  db.post.findAll()
    .then(function(posts){
      db.post.findById(picture_id)
        .then(function(post){
          res.render('single', {
            listings : posts,
            detail : post
          });
        });
    });
});

router.get('/:id/edit', function (req, res) {
  res.render('edit');
});
module.exports = router;