import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';

export const emitToken = async (req, res, next) => {
	let { email, password } = req.body;
	let usuario = await Usuario.findOne({
		where: {
			email,
			password,
		},
		attributes: ['id', 'nombre', 'rut', 'email', 'admin'],
	});
	if (!usuario) {
		return res
			.status(400)
			.json({ code: 400, message: 'Error de autenticación' });
	}

	// Recibe un objeto
	let token = jwt.sign(
		{
			exp: Math.floor(Date.now() / 1000) + 5 * 60,
			data: usuario,
		},
		process.env.PASSWORD_SECRET
	);

	req.token = token;
	next();
};
export const verifyToken = (req, res, next) => {
	try {
		// Si token viene por query string, se hace esto
		let { token } = req.query;

		if (!token) {
			// Si viene en los headers del body, se hace esto
			token = req.headers['authorization'];
			token = token.split(' ')[1];
			if (token.length == 0) {
				throw new Error('No se ha proporcionado un token');
			}
		}
		// Luego se valida el token
		jwt.verify(token, process.env.PASSWORD_SECRET, async (err, decoded) => {
			if (err) {
				// Code 401 === Unauthorized
				return res.status(401).json({
					code: 401,
					message:
						'Debe proporcionar un token válido (su token puede haber expirado)',
				});
			}
			// Se encuentra un usuario decodificando el token, para obtener data
			let usuario = await Usuario.findByPk(decoded.data.id, {
				attributes: ['id', 'nombre', 'rut', 'email', 'admin'],
			});

			if (!usuario) {
				return res
					.status(400)
					.json({ code: 400, message: 'Usuario ya no existe en el sistema' });
			}
			// Se entrega el usuario para sacarlo del middleware
			req.usuario = decoded.data;
			next();
		});
	} catch (error) {
		return res.status(401).json({ code: 401, message: error.message });
	}
};

export const validarAdmin = async (req, res, next) => {
	// Se toma el req.usuario proveniente de verifyToken
	let usuarioToken = req.usuario;
	let usuario = await Usuario.findByPk(usuarioToken.id);
	// 1. Verifica si usuario existe
	if (!usuario) {
		return res
			.status(400)
			.json({ code: 400, message: 'Usuario ya no existe en el sistema' });
	}
	// 2. Verifica si usuario es Admin
	if (!usuario.admin) {
		return res.status(403).json({
			code: 403,
			message:
				'Usuario no cuenta con los permisos necesarios para crear un producto',
		});
	}
	next();
};
