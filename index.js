import app from './src/app.js';
import sequelize from './src/database/database.js';
import chalk from 'chalk';

// Modelos
import './src/models/producto.model.js';
import './src/models/usuario.model.js';

const PORT = process.env.PORT || 3000;

const main = async () => {
	try {
		await sequelize.authenticate();
		console.log(chalk.bgBlue('>> Conectado con éxito a la base de datos'));
		await sequelize.sync({ force: false, alter: true });
		app.listen(PORT, () => {
			console.log(
				chalk.bgGreen('Servidor escuchando en http://localhost:' + PORT)
			);
		});
	} catch (error) {
		console.log(chalk.red('Ha ocurrido un error', error));
	}
};

main();
