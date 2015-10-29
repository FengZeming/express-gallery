var express = require('express');
var app = express();
var jade = require('jade');
var db = require('./models');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var gallery = require('./routes/gallery');
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local').Strategy;


// using jade templating
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('./public'));
app.use(session(
  {
    secret : 'asdgkcjsdhcadafhjksdjfhawkdjfhc',
    resave : false,
    saveUninitialized : true
  }
));
// parsing for http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(methodOverride(function(req, res){
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
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(obj, done) {
  done(null, JSON.parse(obj));
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({ where : { username : username }})
      .then(function(user){
        if (!user) {
          return done(null, false, { message : 'Incorrect username'});
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message : 'Incorrect password'});
        }
        return done(null, user);
      });
  }
));
app.use('/gallery', gallery);

// redirect home route to main landing page
app.get('/', function (req, res) {
  res.redirect('/gallery');
});

app.get('/login', function (req, res) {
  res.render('login', {
    user : req.user,
    messages : req.flash('error')
  });
});

app.post('/login',
  passport.authenticate('local', {
    failureRedirect : '/login',
    failureFlash : true
  }), function (req, res) {
    return res.redirect(app.locals.attemptedUrl || '/gallery');
  }
);
app.get('/logout', function (req, res) {
  req.logout();
  res.render('logout');
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.post('/register', function (req, res) {
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

// sync our database on startup
var server = app.listen(3000, function(){
  db.sequelize.sync();
});