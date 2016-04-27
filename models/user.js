var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true
    },
    password : {
      type : DataTypes.STRING,
      allowNull : false
    },
    salt : {
      type : DataTypes.STRING,
      required : true
    }
  }, {
    classMethods : {
      associate : function(models) {
        User.hasMany(models.Post)
      }
    }
  }, {
    instanceMethods : {
      validPassword : function (password) {
        var hashedAttempt = bcrypt.hashSync(password, this.salt);
        return (hashedAttempt == this.password);
      },
      associate : function(models) {
        User.hasMany(models.Post, {
          onDelete: 'cascade'
        })
      }
    }
  }, {
    freezeTableName : true
  }, {
  hooks : {
    beforeCreate : function (user) {
        user.salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, user.salt);
      }
  }
}

  );
  // User.sync({ force : true })
  // .then(function() {
  //   return Promise.all([
  //     User.create({
  //       username : 'user1',
  //       password : 'password',
  //       salt : ''
  //     }),

  //   ]);
  // });

  return User;
};