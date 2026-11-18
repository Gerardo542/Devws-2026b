//Importando modulos de express
import express from 'express';

import getUsers from './users.controller.js';

//Creando un enrutador de express
const router = express.Router();

//Enrutando GET "/users"
router.get("/", getUsers);

export default router;