var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jade = require('jade');
var gallery = require('./routes/gallery');
var listingsArray = require('./listingsArray');

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use('/gallery', gallery);

app.get('/', function (req, res) {
  var listingCopy = listingsArray.map(function (c) {
    return c;
  });
  var listings2d = [];
  while(listingCopy.length) {
    listings2d.push(listingCopy.splice(0, 3));
  }
  res.render('index', {
    listings : listings2d
  });
});


var server = app.listen(3000);