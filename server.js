var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./models');
var jade = require('jade');
var gallery = require('./routes/gallery');
var methodOverride = require('method-override');

// using jade templating
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('./public'));

// parsing for http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
  var method = req.body._method;
  delete req.body._method;
  return method;
}

}))

app.use('/gallery', gallery);

// redirect home route to main landing page
app.get('/', function (req, res) {
  res.redirect('/gallery');
});

// sync our database on startup
var server = app.listen(3000, function(){
  db.sequelize.sync();
});
