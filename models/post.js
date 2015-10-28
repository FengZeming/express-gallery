module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('post', {
    url : DataTypes.STRING,
    shortDesc : DataTypes.TEXT,
    link : DataTypes.STRING,
    longDesc : DataTypes.TEXT
  }, {
    freezeTableName: true
  });
  return Post;
};