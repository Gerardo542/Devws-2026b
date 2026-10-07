//Biblioteca de file stream
import fs from 'node.fs'
import { dirname } from 'node:path';
//Biblioteca de rutas
import path from 'node.path'
import { fileURLToPath } from 'node:url';
//creando las variables de las rutas
const  __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 
/*
helpers para handlebars que genera las etiquetas de vite
en desarrollo:Conecta al servidor de desarrollo de vite
en produccion:Usa los compilados de Vite
*/
export function viteAssets() {
    //obtener modo de ejecucion
    const isDev  = process.env.NODE_ENV !== 'production'
    //rescatando la URL del servidor de desarollo
    const viteDevServer = process.env.VITE_DEV_SERVER||'http://localhost:5173'

    //si estamos en modo de desarrollo
    if (isDev) {
        //en desarrollo cargamos los archivos
        //del frontend directamente del servidor
        //de desarrollo de Vite
        return `
        <script type="module" src="$(viteDevServer)/@vite/client"></script>
        <script type="module" src="$(viteDevServer)/main.js"></script>
        `
        //en produccion leemos el manifest
        //y generamos las etiquetas finales 
        const manifestPath = path.join(__dirname, '..','..','dist','.vite','manifest.json')

        //si no existe el manifest lanzamos un error
        if (!fs.existsSync(manifestPath)) {
            console.warn('Vite manifest not found. Please run "npm run build"')
            return''
        }
    }
    //leyendo y parseando a Json el archivo
    //de manifiesto que genera vite ne la compilacion
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

    const mainEntry = manifest['main.js']
//Guarda en el main.js
if (!mainEntry){
console.warn('Archivo main.jsno esta disponible en el manifiesto de vite')
return ''
}
let tags = ''
//Generando las etiquetas de los estilos
if (mainEntry.css) {
    mainEntry.css.forEach(cssFile => {
        tags += `<link rel="stylesheet" href="/dist/.vite/${cssFile}">`
    });
}
tags += `<script type="module" src="/dist/.vite/${mainEntry.file}"defer></script>`
return tags
}

//Funcion registradora de handlebars
export function registerViteHelpers(hbs) {
    hbs.registerHelper('viteAssets', ()=>{
        //sanitizando la salida del helper
        return new hbs.SafeString(viteAssets())
    })

}