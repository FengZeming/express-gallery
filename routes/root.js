var express = require('express');
var app = express();
var passport = require('passport');
var db = require('./../models');
var Post = db.Post;
var User = db.User
var router = express.Router();

/*
  * GALLERY ROUTES
*/
router.route('/')
  .get(function (req, res) {
    // get all posts from our database
    Post.findAll({
      order : '"createdAt" DESC'
    })
      .then(function(posts) {
        // grab a copy
        var listingCopy = posts.map(function (c) {
          return c;
        });
        var listings2d = [];
        var masthead = listingCopy.splice(0, 1)[0];
        while (listingCopy.length) {
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

// get login page
router.get('/login', function (req, res) {
  res.render('login');
});

// post, if the user attempted to click on an edit route,
// will redirect them back to the page they tried to
// access before hand
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    // default route is gallery
    if (!user) {
      return res.render('login', info);
    }
    req.logIn(user, function() {
      return res.redirect(app.locals.attemptedUrl || '/gallery');
    });
  })(req, res, next);
});

// logout user then render our logout page for responsiveness
router.get('/logout', function (req, res) {
  req.logout();
  res.render('logout');
});

module.exports = router;