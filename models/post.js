module.exports = function(sequelize, DataTypes) {

  // define new table entry for posting
  var Post = sequelize.define('post', {
    url : {
      type: DataTypes.STRING,
      allowNull : false
    },
    shortDesc : {
      type: DataTypes.TEXT,
      allowNull : false
    },
    link : {
      type: DataTypes.STRING,
      allowNull : false
    },
    longDesc : {
      type: DataTypes.TEXT,
      allowNull : false
    }
  }, {

    // makes our reference to the defined name
    freezeTableName: true
  });
  return Post;
};