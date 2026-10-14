import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1)Ignora los builddel front
  {
    ignores: [
      "dist/**",//Ignora carpeta de distribucion
      "node_modules/**",
    ]
  },
  //2) Configuracion del backend
  { files: ["server/**/*.{js}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType:"module",
       globals: {...globals.node} } },

         //3)Codigo del frontend
  { files: ["src/**/*.{js}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType:"module",
       globals: {...globals.browser} } ,
      rules:{"no-unused-vars":["error",{"argsIgnorePattern" : "^_"}]}
    },
    

       //4) Opcional si hay js en public
  { files: ["public/**/*.{js}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType:"module",
       globals: {...globals.browser} } },

         //2.1)Config Vite
      { files: ["vite.config.js}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: {
      ecmaVersion: "latest",
      sourceType:"module",
       globals: {...globals.node} } },
]);

