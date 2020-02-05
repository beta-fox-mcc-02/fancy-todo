'use strict';
module.exports = (sequelize, DataTypes) => {
	const Model = sequelize.Sequelize.Model;
	class Todo extends Model {
		static associate(models) {
			Todo.belongsTo(models.User, { foreignKey: 'user_id' });
		}
	}

	Todo.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isNotEmpty: (value) => {
						if (!value) {
							throw new Error('Title is required');
						}
					}
				}
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isNotEmpty: (value) => {
						if (!value) {
							throw new Error('Description is required');
						}
					}
				}
			},
			status: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
				validate: {
					isNotEmpty: (value) => {
						if (value === '') {
							throw new Error('Status is required');
						}
					}
				}
			},
			due_date: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					isNotEmpty: (value) => {
						if (!value) {
							throw new Error('Due date is required');
						}
					}
				}
			},
			user_id: {
				type: DataTypes.INTEGER
			}
		},
		{ sequelize }
	);
	return Todo;
};
