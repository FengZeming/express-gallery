var express = require('express');
var db = require('./../models');
var router = express.Router();

router
  .route('/')

  .get(function (req, res) {
    res.render('register');
  })
  // password confirmation first
  .post(function (req, res) {
    if (req.body.password == req.body.confirmPassword) {
      // create user
      db.users.create({
        username : req.body.username,
        password : req.body.password
      }).then(function(user) {
        // redirect to login page
        req.login(user, function (){
          res.redirect('/gallery');
        });
      });
    } else {
      res.render('register', {
        messages: 'Passwords do not match.'
      });
    }
  });

module.exports = router;