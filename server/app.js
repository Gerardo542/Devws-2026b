//Funcion para manejar errores
//❌var createError = require('http-errors');
import createError from 'http-errors'
//Importa el framework express
//❌var express = require('express');
import express from 'express'
//Importa modulos para manejar rutas
//❌var path = require('path');
import path from 'node:path'
//Importa modulos para manejar cookies
//❌var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser'
//Importa modulos para manejar logs
//❌var logger = require('morgan');
import logger from 'morgan'
//importando biblioteca de debug
import createDebug from "debug" //👈
//Imports para crear dirname
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

//Importando el template engine de Handlebars
import hbs from 'hbs'

//Creacion del objeto debug
const debug = createDebug('dwssr-2026:server') //👈
//Creando las variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Importan las rutas de la aplicacion
//var indexRouter = require('./routes/index');
import indexRouter from '#routes/index.js'
//var usersRouter = require('./routes/users');
import usersRouter from '#routes/users.js'
//Importando el registrador del Helper
import { registerViteHelpers } from './lib/vite.js'

//Crear la aplicacion express
debug("🔨  Creando backend")
//Crea la aplicacion express
const app = express();

// Configura el motor de vistas con hbs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//Registro helper
registerViteHelpers(hbs)

// Configura middlewares de la aplicacion
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Archivos estaticos para produccion
if(process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '..','dist')));
}

//Configura la carpeta de archivos estaticos
debug("🔨  Creando servidor de archivos estaticos")
app.use(express.static(path.join(__dirname, '..','public')));

//Registramos rutas de la aplicacion
debug("🛣️ Registrando rutas")
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores, 
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//Ejemplo de codigo inalcanzable
//(()=>{
  //let age = 10
  //if(age == 10) {
  //  console.log("Codigo")
  //}
  //return age
//})()
export default app;