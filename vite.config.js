//Importando configurador de Vite
import {defineConfig} from 'vite';
//Importando un admin de rutas
import { resolve } from 'node:path';

export default defineConfig({
    //Director de Raiz de los archivos fuente del front-end
    root: 'src',
    //Configurar un servidor de desarrollo
    server: {
        //Puerto de escucha
        port: 5173,
        //Rigidez del puerto
        strict: true,
    },
    //Configurando el Build
    build:{
        //Directorio de salida del js para produccion
        outDir: "../dist",
        //Asegurando limpieza del folder de produccion
        emptyOutDir: true,
        //Generar manifiesto para el servidor
        manifest: true,
        //Opciones de empaquetado
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js'),
            }
        }
    },
    //Configuracion para el desarrollo
    publicDir: false
})