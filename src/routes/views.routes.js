import { Router } from 'express';
import { verifyToken, validarAdmin } from "../middlewares/auth.middleware.js";
import Usuario from '../models/usuario.model.js';

const router = Router();

// Proteger ruta perfil
router.get(['/', '/home'], (req, res) => {
	res.render('home');
});
router.get('/login', (req, res) => {
	res.render('login');
});
router.get('/registro', (req, res) => {
	res.render('registro');
});

// Dashboard es vista protegida, verifica token y usuario debe ser admin
router.get('/dashboard', verifyToken, validarAdmin, (req, res) => {
	res.render('dashboard');
});
router.get('/perfil', verifyToken, async (req, res) => {
	let usuario = req.usuario;
	// let usuario = await Usuario.findByPk(usuarioToken.id);
	// if (!usuario) {
	// 	return res.send('<h1>Usuario ya no existe, verifique su cuenta</h1>');
	// }
	res.render('perfil', {
		usuario
	});
});
// router.get('/protegida',)

export default router;
