var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {
    listings : ['http://www.wired.com/wp-content/uploads/2015/01/Sense-of-Place_Mountain-Dwellings_Photograph-by-Pawel-Paniczko.jpg',
                'http://www.wired.com/wp-content/uploads/2015/02/Exteriors_The-Ivar-Aasen-Centre_Photograph-by-David-Borland-682x1024.jpg',
                'http://www.wired.com/wp-content/uploads/2015/02/Exteriors_Power-Transformation-Station_Pgotograph-by-Tim-Van-de-Velde.jpg',
                'http://www.wired.com/wp-content/uploads/2015/01/Sense-of-Place_Mountain-Dwellings_Photograph-by-Pawel-Paniczko.jpg',
                'http://www.wired.com/wp-content/uploads/2015/02/Exteriors_The-Ivar-Aasen-Centre_Photograph-by-David-Borland-682x1024.jpg',
                'http://www.wired.com/wp-content/uploads/2015/02/Exteriors_Power-Transformation-Station_Pgotograph-by-Tim-Van-de-Velde.jpg']
  });
});

router.get('/new', function (req, res) {
  res.render('new');
});

router.get('/:id', function (req, res) {
  res.render('single');
});

router.get('/:id/edit', function (req, res) {
  res.render('edit');
});
module.exports = router;