import Producto from '../models/producto.model.js';
// Para borrar imagen en caso de error se ocupa fs
import fs from 'fs';

export const findAllProductos = async (req, res) => {
	try {
		let productos = await Producto.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt'],
			},
		});
		res.json({ code: 200, message: 'ok', data: productos });
	} catch (error) {
		res
			.status(500)
			.json({ code: 500, message: 'Error al consultar los productos' });
	}
};
export const addProductos = async (req, res) => {
	//console.log(req.body);

	let { nombre, descripcion, precio } = req.body;
	//console.log(req.files);
	// req.nombreImagen = nombreFoto; -> viene desde middleware
	// req.pathImagen = pathDestino; -> viene desde middleware

	try {
		let nuevoProducto = {
			nombre,
			descripcion,
			precio: Number(precio),
			imagen: req.nombreImagen,
			rutaImagen: `/public/uploads/${req.nombreImagen}`,
			publicIdImagen: 0,
		};
		let productoCreado = await Producto.create(nuevoProducto);
		res.status(201).json({
			code: 201,
			message: 'Producto se cargó con éxito',
			data: productoCreado,
		});
	} catch (error) {
		// Para borrar la imagen en caso de error.
		// Asi se evita llenar la carpeta de imagenes de peticiones erroneas
		console.log(error);
		fs.unlinkSync(req.pathImagen);
		res.status(500).send({
			code: 500,
			message: 'Error al crear el producto en la base de datos',
		});
	}
};
