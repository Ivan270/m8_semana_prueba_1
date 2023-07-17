import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { v2 as cloudinary } from 'cloudinary';

// CONFIGURAR CLOUDINARY CON CREDENCIALES GUARDADAS EN ENV
cloudinary.config({
	cloud_name: process.env.STORAGE_NAME,
	api_key: process.env.STORAGE_KEY,
	api_secret: process.env.STORAGE_SECRET,
});

// Intermediario con rutas. Para validar formatos de archivos, etc.
export const uploadFiles = (req, res, next) => {
	let pathDestino;
	let nombreFoto;
	let foto;
	try {
		foto = req.files.imagen;
		let formatosPermitidos = ['jpeg', 'png', 'webp', 'gif', 'svg'];
		let extension = `${foto.mimetype.split('/')[1]}`;

		if (!formatosPermitidos.includes(extension)) {
			return res.status(400).json({
				code: 400,
				message: `Formato no permitido ${extension}, formatos permitidos(${formatosPermitidos.join(
					' - '
				)})`,
			});
		}
		// console.log(foto);
		nombreFoto = `${Date.now()}-img.${extension}`;
		// pathDestino = path.join(__dirname, '/../../public/uploads', nombreFoto);

		// METODO CLOUDINARY
		cloudinary.uploader
			.upload_stream({ resource_type: 'auto' }, async (error, result) => {
				if (error) {
					console.log(error);
					return res.status(500).json({
						code: 500,
						message:
							'Error al subir la imagen en proceso de creación del producto',
					});
				}
				console.log(result);
				req.nombreImagen = nombreFoto;
				req.pathImagen = result.url;
				req.imagenId = result.public_id;
				next();
			})
			.end(foto.data);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ code: 500, message: 'Error al procesar solicitud' });
	}
};

export const deleteFile = (imageId) => {
	cloudinary.uploader.destroy(public_id, (error, result) => {
		if (error) {
			return console.log(
				'Error al eliminar la imagen del servicio cloud: ',
				error
			);
		}
		console.log(
			`Imagen con ID: ${imageId} eliminada con éxito en servicio cloud`
		);
	});
};
