import { DataTypes } from 'sequelize';

import sequelize from '../database/database.js';

const Producto = sequelize.define(
	'productos',
	{
		nombre: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		precio: {
			type: DataTypes.DECIMAL(11, 2),
		},
		imagen: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rutaImagen: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		publicIdImagen: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

export default Producto;
