import { DataTypes } from 'sequelize';

import sequelize from '../database/database.js';

const Usuario = sequelize.define(
	'usuarios',
	{
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rut: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		timestamps: true,
	}
);

export default Usuario;
