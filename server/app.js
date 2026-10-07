//Funcion para manejar errores de express
import createError from 'http-errors';
//importa el framework de express
import express from 'express';
//Importa modulos para manejar rutas
import path from 'path';
//importa modulos para mnejar cookies
import cookieParser from 'cookie-parser';
//importa modulos para manejar logs
import logger from 'morgan';

//importa las rutas de la aplicacion
import indexRouter from '#routes/index.js';
import usersRouter from '#routes/users.js';
import{registerHelpers} from './lib/vite.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import createDebug from 'debug';
//importando el template engine de handlebars
import hbs from 'hbs';
//creando las variables
const  __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);  
const debug = createDebug('devws-2026b:server');

//crea la aplicacion de express
debug('🔨 Creando Backend');
var app = express();

// configurar el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//registro helper
registerViteHelpers(hbs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//archivos estaticos para produccion
if(process.env.NODE_ENV === 'production'){
app.use(express.static(path.join(__dirname, '..', 'dist')));
}
debug('🔨 Creando servidor estatico');
app.use(express.static(path.join(__dirname,'..','public')));

debug('🚗Registrando rutas');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;