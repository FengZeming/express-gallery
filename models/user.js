module.exports = function(sequelize, DataTypes) {

  // define new table entry for posting
  var User = sequelize.define('users', {
    username : DataTypes.STRING,
    password : DataTypes.STRING
  }, {
    classMethods : {
      validPassword : function (password) {
        return (password === this.password);
      }
    },
    freezeTableName: true
  });
  User.sync({ force : true }).then(function() {
    User.create({
      username : 'alexAdmin',
      password : 'password'
    })
  });
  return User;
};