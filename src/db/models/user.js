'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Item, {
      foreignKey: "userId",
      as: "items"
    });
  };
  
  return User;
};