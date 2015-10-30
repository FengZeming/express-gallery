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
    db.post.findAll({
      order : '"createdAt" DESC'
    })
      .then(function(posts){
        // grab a copy
        var listingCopy = posts.map(function (c) {
          return c;
        });
        var listings2d = [];
        var masthead = listingCopy.splice(0, 1)[0];
        while(listingCopy.length) {
          // convert it to a 2D array for templating purposes
          listings2d.push(listingCopy.splice(0, 3));
        }
        // render our index template passing in the 2D array
        res.render('index', {
          listings : listings2d,
          user : req.user,
          masthead : masthead
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
  res.render('new', {
    user : req.user
  });
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
            id : req.params.id,
            user : req.user
          });
        });
    });
});

router
  .route('/:id/edit')
  // before each edit route, ensure the user is authenticated
  .all(ensureAuthenticated)

  .get(function (req, res) {
    // find by the id passed in through the url
    db.post.findById(req.params.id)
      .then(function(post){
        res.render('edit', {
          detail : post,
          id : req.params.id
        });
      });
  })
  // find by id
  .put(function(req, res) {
    db.post.findById(req.params.id)
    .then(function(foundPost) {
      // then update
      foundPost.update({
        url : req.body.url,
        shortDesc : req.body.shortDesc,
        link : req.body.link,
        longDesc : req.body.longDesc })
      .then(function(newPost){
        // then redirect to its detail page
        res.redirect('/gallery/'+ newPost.id);
      });
    });
  })
  // delete user from database
  .delete(function(req, res){
    db.post.destroy({
      where : {
        id : req.params.id
      }
    })
    .then(function(){
      // then redirect to gallery
      res.redirect('/gallery');
    })
  });
// make sure user is authenticated
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  // if user attempted to access a route, store it to return them afterwards
  req.app.locals.attemptedUrl = '/gallery' + req.url;
  res.redirect('/login');
}

// export for server.js
module.exports = router;