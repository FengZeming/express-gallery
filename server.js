var express = require('express');
var app = express();
var jade = require('jade');
var db = require('./models');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var gallery = require('./routes/gallery');
var register = require('./routes/register');
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local').Strategy;


// using jade templating
app.set('view engine', 'jade');
app.set('views', './views');

// static html files in public directory
app.use(express.static('./public'));

// using express sessions for user authentication
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

// local strategy checks our local DB to authenticate users
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

// common routes
app.use('/gallery', gallery);
app.use('/register', register);
// redirect home route to main landing page
app.get('/', function (req, res) {
  res.redirect('/gallery');
});
// get login page
app.get('/login', function (req, res) {
  res.render('login');
});

// post, if the user attempted to click on an edit route,
// will redirect them back to the page they tried to
// access before hand
app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    // default route is gallery
    if (!user) {
      return res.render('login', {
        message: 'Invalid login'
      });
    }
    req.logIn(user, function() {
      return res.redirect(app.locals.attemptedUrl || '/gallery');
    });
  })(req, res, next);
});
// logout user then render our logout page for responsiveness
app.get('/logout', function (req, res) {
  req.logout();
  res.render('logout');
});

app.get('/404', function (req, res) {
  res.render('404');
});

app.all('*', function (req, res ){
  res.redirect('/404');
});
// sync our database on startup
var server = app.listen(3000, function(){
  db.sequelize.sync();
});