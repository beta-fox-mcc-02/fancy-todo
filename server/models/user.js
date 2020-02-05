'use strict';
const { BcryptHelper } = require('../helpers')
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.Sequelize.Model;
	class User extends Model {
		static associate(models) {
			User.hasMany(models.Todo, { foreignKey: 'id' });
		}
	}
	User.init(
		{
			email: {
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
					isEmail: {
						args: true,
						msg: 'Invalid email format'
					}
				}
			},
			password: {
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
					}
				}
			}
		},
		{
			sequelize,
			hooks: {
				beforeCreate: (user, options) => {
					const password = user.password
					user.password = BcryptHelper.encryptPassword(password)
				},
				beforeBulkUpdate: (user) => {
					const password = user.attributes.password
					user.attributes.password = BcryptHelper.encryptPassword(password)
				}
			}
		}
	);
	return User;
};
