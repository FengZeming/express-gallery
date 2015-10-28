var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./models');
var jade = require('jade');
var gallery = require('./routes/gallery');

// using jade templating
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('./public'));

// parsing for http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.use('/gallery', gallery);

// redirect home route to main landing page
app.get('/', function (req, res) {
  res.redirect('/gallery');
});

// sync our database on startup
var server = app.listen(3000, function(){
  db.sequelize.sync();
});