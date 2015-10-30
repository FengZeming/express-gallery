var bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {

  // define new table entry for posting
  var User = sequelize.define('users', {
    username : {
      type : DataTypes.STRING,
      unique : true,
      required : true
    },
    password : {
      type : DataTypes.CHAR(60),
      required : true,
    },
    salt : {
      type : DataTypes.STRING,
      required : true
    }
  }, {
    instanceMethods : {
     validPassword : function (password) {
        var hashedAttempt = bcrypt.hashSync(password, this.salt);
        return (hashedAttempt == this.password);
      }
    },
    freezeTableName: true,
    hooks : {
      beforeCreate: function (user) {
          user.salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, user.salt);
        }
    }
  });
  return User;
};