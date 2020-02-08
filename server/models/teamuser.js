'use strict';
module.exports = (sequelize, DataTypes) => {
  class TeamUser extends sequelize.Sequelize.Model{}
  TeamUser.init({
    UserId: DataTypes.INTEGER,
    TodoId: DataTypes.INTEGER
  }, {
    sequelize
  })
  TeamUser.associate = function(models) {
    // associations can be defined here
  };
  return TeamUser;
};