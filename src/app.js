import express from 'express';
import upload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import { create } from 'express-handlebars';

import viewsRoutes from './routes/views.routes.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// HBS Config
const hbs = create({
	partialsDir: [path.resolve(__dirname, './views/partials/')],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));

// Middlewares generales
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
// Para cuando datos no se mandan en json y si en la url por ejemplo
app.use(express.urlencoded({ extended: true }));
// Todas las imagenes subidas se guardaran en req.files y no req.body, req.query, req.params
app.use(upload());
// Public folder
app.use('/public', express.static(path.join(__dirname, '/../public')));

// Rutas endpoints

// Rutas de vista
app.use('/', viewsRoutes);

export default app;
