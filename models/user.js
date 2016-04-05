'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    location: DataTypes.STRING,
    loggedin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Post);
        User.hasMany(models.Announcement);
      }
    }
  });
  return User;
};