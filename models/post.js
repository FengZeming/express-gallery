module.exports = function(sequelize, DataTypes) {

  // define new table entry for posting
  var Post = sequelize.define('post', {
    url : DataTypes.STRING,
    shortDesc : DataTypes.TEXT,
    link : DataTypes.STRING,
    longDesc : DataTypes.TEXT
  }, {

    // makes our reference to the defined name
    freezeTableName: true
  });
  return Post;
};