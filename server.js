var express = require('express');
var app = express();
var CONFIG = require('./config/config.json');
var jade = require('jade');
var db = require('./models');
var User = db.User;
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var gallery = require('./routes/gallery');
var register = require('./routes/register');
var root = require('./routes/root');
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

// using jade templating
app.set('view engine', 'jade');
app.set('views', './views');

// static html files in public directory
app.use(express.static('./public'));

// using express sessions for user authentication
app.use(session(
  {
    secret : CONFIG.SESSION.secret,
    resave : false,
    saveUninitialized : true
  }
));

// parsing for http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(function(user) {
      done(null, user);
    });
});

// local strategy checks our local DB to authenticate users
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ where : { username : username } })
      .then(function(user) {
        if (!user) {
          return done(null, false, { message : 'Incorrect username' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message : 'Incorrect password' });
        }
        return done(null, user);
      });
  }
));

// common routes
app.use('/', root);
app.use('/gallery', gallery);
app.use('/register', register);

app.get('/404', function (req, res) {
  res.render('404');
});

app.all('*', function (req, res ) {
  res.redirect('/404');
});

// sync our database on startup
var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server started on 3000');
  db.sequelize.sync();
});