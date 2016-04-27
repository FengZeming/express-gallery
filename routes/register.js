var express = require('express');
var db = require('./../models');
var User = db.User;
var router = express.Router();
var bcrypt = require('bcrypt');

router
  .route('/')

  .get(function (req, res) {
    res.render('register');
  })

  // password confirmation first
  .post(function (req, res) {
    console.log(req.body.username);
    User.findOne({ where : { username : req.body.username } })
      .then(function(user) {
        if (req.body.password == req.body.confirmPassword && !user) {
          User.create({
              username : req.body.username,
              password : req.body.password
            }).then(function(user) {
              // redirect to login page
              req.login(user, function () {
                res.redirect('/gallery');
              });
            });

          // create user
        } else if (user) {
          res.render('register', {
            messages : 'Username already exists.'
          });
        } else {
          res.render('register', {
            messages : 'Passwords do not match.'
          });
        }
      })
  });

module.exports = router;