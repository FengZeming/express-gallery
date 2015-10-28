var express = require('express');
var db = require('./../models');
var router = express.Router();

/*
  * LANDING PAGE
*/
router.get('/', function (req, res) {

  // get all posts from our database
  db.post.findAll()
    .then(function(posts){

      // grab a copy
      var listingCopy = posts.map(function (c) {
        return c;
      });
      var listings2d = [];
      while(listingCopy.length) {

        // convert it to a 2D array for templating purposes
        listings2d.push(listingCopy.splice(0, 3));
      }

      // render our index template passing in the 2D array
      res.render('index', {
        listings : listings2d
      });
    });
});

/*
  * FORM TO POST NEW PHOTO
*/
router.get('/new', function (req, res) {
  res.render('new');
});

/*
  * HANDLES POST REQUEST FROM /new FORM
*/
router.post('/', function (req, res) {

  // create it in our database
  db.post.create({
    url : req.body.url,
    shortDesc : req.body.shortDesc,
    link : req.body.link,
    longDesc : req.body.longDesc
  }).then(function(newPost){

    // then redirect to its individual page
    res.redirect('/gallery/' + newPost.id);
  });
});

/*
  * INDIVIDUAL PAGES W/ SIDEBAR
*/
router.get('/:id', function (req, res) {

  // grab the parameter given
  var picture_id = req.params.id;

  // grab all of our posts for the sidebar
  db.post.findAll()
    .then(function(posts){

      // then find our single post by id
      db.post.findById(picture_id)
        .then(function(post){

          // render single template, passing in both promises
          res.render('single', {
            listings : posts,
            detail : post
          });
        });
    });
});

// todo
router.get('/:id/edit', function (req, res) {
  res.render('edit');
});

// export for server.js
module.exports = router;