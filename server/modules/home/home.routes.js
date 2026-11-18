//Importando modulos de express
import express from  'express'

//Importando la accion que quiero enrutar
import renderHome from './home.controller.js';

//Creando un enrutador de express
const router = express.Router();

//enrutando Action Methods del controlador Home

// Get "/"
router.get('/', renderHome)

export default router;