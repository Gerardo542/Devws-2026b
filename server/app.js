import createError from 'http-errors'
import express from 'express'
import path, { dirname } from 'node:path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import createDebug from 'debug'
import { fileURLToPath } from 'node:url'
import hbs from 'hbs'
// Importan las rutas de la aplicacion
// eslint-disable-next-line import-x/no-rename-default
import indexRouter from '#routes/index.js'
// eslint-disable-next-line import-x/no-rename-default
import usersRouter from '#routes/users.js'
import { registerViteHelpers } from './lib/vite.js'

// Creacion del objeto debug
const debug = createDebug('dwssr-2026:server')

// Creando las variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Crear la aplicacion express
debug('🔨  Creando backend')
const app = express()

// Configura el motor de vistas con hbs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
// Registro helper
registerViteHelpers(hbs)

// Configura middlewares de la aplicacion
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Archivos estaticos para produccion
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')))
}

// Configura la carpeta de archivos estaticos
debug('🔨  Creando servidor de archivos estaticos')
app.use(express.static(path.join(__dirname, '..', 'public')))

// Registramos rutas de la aplicacion
debug('🛣️ Registrando rutas')
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// Manejador de errores
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app