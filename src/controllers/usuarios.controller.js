import Usuario from '../models/usuario.model.js';

export const addUsuario = async (req, res) => {
	let { nombre, rut, email, password, admin } = req.body;
	try {
		// Se crea un nuevo usuario, pero al hacerlo no devolverá la contraseña
		let nuevoUsuario = await Usuario.create({
			nombre,
			rut,
			email,
			password,
			admin,
		});

		res.status(201).json({
			code: 201,
			data: nuevoUsuario,
			message: `Usuario ${nuevoUsuario.nombre} creado con ID: ${nuevoUsuario.id}`,
		});
	} catch (error) {
		res
			.status(500)
			.json({ code: 500, message: 'Error al crear nuevo usuario' });
	}
};
export const login = async (req, res) => {
	res.json({ code: 200, message: 'Login correcto', token: req.token });
};

export const findAllUsuarios = async (req, res) => {
	try {
		let usuarios = await Usuario.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'password'],
			},
			order: [
				['id', 'ASC']
			]
		});
		res.json({ code: 200, message: 'ok', data: usuarios });
	} catch (error) {
		res
			.status(500)
			.json({ code: 500, message: 'Error al consultar los usuarios' });
	}
};
