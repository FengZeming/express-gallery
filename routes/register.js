var express = require('express');
var db = require('./../models');
var router = express.Router();

router
  .route('/')

  .get(function (req, res) {
    res.render('register');
  })

  .post(function (req, res) {
    if (req.body.password == req.body.confirmPassword) {
      db.users.create({
        username : req.body.username,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword
      }).then(function() {
        res.redirect('/login');
      });
    } else {
      res.render('register', {
        messages: 'Passwords do not match.'
      });
    }
  });

module.exports = router;