var express = require('express');
var db = require('./../models');
var router = express.Router();

/*
  * GALLERY ROUTES
*/
router
  .route('/')

  .get(function (req, res) {
    // get all posts from our database
    db.post.findAll({ order : '"createdAt" DESC'})
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
  })

  .post(ensureAuthenticated, function (req, res) {
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
  * FORM TO POST NEW PHOTO
*/
router.get('/new', ensureAuthenticated, function (req, res) {
  res.render('new');
});

/*
  * INDIVIDUAL PAGES W/ SIDEBAR
*/
router.get('/:id', function (req, res) {
  // grab all of our posts for the sidebar
  db.post.findAll({
    limit : 3,
    order : '"createdAt" DESC',
    where : {
      id : {
        $ne : req.params.id
      }
    }
  })
    .then(function(posts){
      // then find our single post by id
      db.post.findById(req.params.id)
        .then(function(post){
          // render single template, passing in both promises
          res.render('single', {
            listings : posts,
            detail : post,
            id : req.params.id
          });
        });
    });
});

router
  .route('/:id/edit')
  .all(ensureAuthenticated)

  .get(function (req, res) {

    db.post.findById(req.params.id)
      .then(function(post){
        res.render('edit', {
          detail : post,
          id : req.params.id
        });
      });
  })

  .put(function(req, res) {
    db.post.findById(req.params.id)
    .then(function(foundPost) {
      foundPost.update({
        url : req.body.url,
        shortDesc : req.body.shortDesc,
        link : req.body.link,
        longDesc : req.body.longDesc })
      .then(function(newPost){
        res.redirect('/gallery/'+ newPost.id);
      });
    });
  })

  .delete(function(req, res){
    db.post.destroy({
      where : {
        id : req.params.id
      }
    })
    .then(function(){
      res.redirect('/gallery');
    })
  });

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// export for server.js
module.exports = router;