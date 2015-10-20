var express = require('express');
var app = express();
var gallery = require('./routes/gallery');
var jade = require('jade');

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('./public'));

app.get('/', function (req, res) {

});

app.use('/gallery', gallery);

var server = app.listen(3000);