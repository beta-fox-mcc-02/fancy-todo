'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Location extends Model {
    static associate(models) {
      Location.hasMany(models.Todo, { foreignKey: 'id' })
    }
  }
  Location.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
      },
    },
    phone_number: DataTypes.STRING,
    google_place_id: DataTypes.TEXT
  }, { sequelize })
  return Location;
};