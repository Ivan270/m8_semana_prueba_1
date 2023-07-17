import Sequelize from 'sequelize';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import pg from 'pg';

import { config } from 'dotenv';
let database, username, password, host;

let rutaEnv = path.join(__dirname, '/../../.env');
config({ path: rutaEnv });

database = process.env.DB_DATABASE;
username = process.env.DB_USER;
password = process.env.DB_PASSWORD;
host = process.env.DB_HOST;

const sequelize = new Sequelize(database, username, password, {
	host: host,
	port: process.env.DB_PORT || 5432,
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 20000,
		idle: 5000,
	},
	dialectOptions,
	dialectModule: pg,
});

export default sequelize;
