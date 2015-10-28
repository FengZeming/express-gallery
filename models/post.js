module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('post', {
    url : DataTypes.STRING,
    shortDesc : DataTypes.TEXT,
    link : DataTypes.STRING,
    longDesc : DataTypes.TEXT
  }, {
    freezeTableName: true
  });

Post.sync({ force : true })
  .then(function() {
    Post.create({
      url : 'http://www.wired.com/wp-content/uploads/2015/01/Sense-of-Place_Mountain-Dwellings_Photograph-by-Pawel-Paniczko.jpg',
      shortDesc : 'Sense of Place Mountain Dwellings',
      link : 'www.fantasticnorway.no',
      longDesc : 'Welcome to our online portfolio, we are small group of passionate designers and architects, looking to change and create amazing digital images to inspire others to follow in our innovate steps. Free Architect WordPress Theme',
    }),
    Post.create({
      url : 'http://www.wired.com/wp-content/uploads/2015/02/Exteriors_The-Ivar-Aasen-Centre_Photograph-by-David-Borland-682x1024.jpg',
      shortDesc : 'The Ivar Aesen Centre',
      link : 'www.fantasticnorway.no',
      longDesc : 'Welcome to our online portfolio, we are small group of passionate designers and architects, looking to change and create amazing digital images to inspire others to follow in our innovate steps. Free Architect WordPress Theme',
    }),
    Post.create({
      url : 'http://demo.mountainthemes.com/14/wp-content/uploads/2015/05/Architecture_HD_wallpaper_a004.jpg',
      shortDesc : 'Awesome Architecture',
      link : 'www.fantasticnorway.no',
      longDesc : 'Welcome to our online portfolio, we are small group of passionate designers and architects, looking to change and create amazing digital images to inspire others to follow in our innovate steps. Free Architect WordPress Theme',
    }),
    Post.create({
      url : 'http://www.wired.com/wp-content/uploads/2015/01/Sense-of-Place_Mountain-Dwellings_Photograph-by-Pawel-Paniczko.jpg',
      shortDesc : 'Sense of Place Mountain Dwellings',
      link : 'www.fantasticnorway.no',
      longDesc : 'Welcome to our online portfolio, we are small group of passionate designers and architects, looking to change and create amazing digital images to inspire others to follow in our innovate steps. Free Architect WordPress Theme',
    }),
    Post.create({
      url : 'http://www.wired.com/wp-content/uploads/2015/02/Exteriors_The-Ivar-Aasen-Centre_Photograph-by-David-Borland-682x1024.jpg',
      shortDesc : 'The Ivar Aesen Centre',
      link : 'www.fantasticnorway.no',
      longDesc : 'Welcome to our online portfolio, we are small group of passionate designers and architects, looking to change and create amazing digital images to inspire others to follow in our innovate steps. Free Architect WordPress Theme',
    }),
    Post.create({
      url : 'http://www.wired.com/wp-content/uploads/2015/02/Exteriors_Power-Transformation-Station_Pgotograph-by-Tim-Van-de-Velde.jpg',
      shortDesc : 'Poer-Transformation Station',
      link : 'www.fantasticnorway.no',
      longDesc : 'Welcome to our online portfolio, we are small group of passionate designers and architects, looking to change and create amazing digital images to inspire others to follow in our innovate steps. Free Architect WordPress Theme',
    })
  });

  return Post;
};