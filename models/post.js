module.exports = function(sequelize, DataTypes) {
  // define new table entry for posting
  var Post = sequelize.define('Post', {
    url : {
      type : DataTypes.STRING,
      allowNull : false
    },
    title : {
      type : DataTypes.TEXT,
      allowNull : false
    },
    link : {
      type : DataTypes.STRING,
      allowNull : false
    },
    info : {
      type : DataTypes.TEXT,
      allowNull : false
    }
  }, {
    classMethods : {
      associate : function(models) {
        Post.belongsTo(models.User);
      }
    }
  }, {
    // Disable modification of tablenames. makes table into photo not photos
    freezeTableName : true
  });

  return Post;
};
