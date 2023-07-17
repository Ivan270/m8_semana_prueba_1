import { Router } from 'express';
import {
	findAllProductos,
	addProductos,
} from '../controllers/productosCloud.controller.js';
import { uploadFiles as upload } from '../middlewares/uploadCloud.middleware.js';
import { verifyToken, validarAdmin } from '../middlewares/auth.middleware.js';
const router = Router();

router.get('/', findAllProductos);
// Se pasa primero el middleware, antes de la funcion del controlador
// Se protegerá esta ruta con otro middleware

router.post('/', verifyToken, validarAdmin, upload, addProductos);

export default router;
