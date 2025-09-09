
import express from "express";  //Llamamos a la libreria express
import dotenv from 'dotenv'  //Importamos la opcion de variables de entonno .env
import { connectDB } from "./config/db"; // Importamos la concection a DB

dotenv.config()  //Habilitamos las variables de entorno

connectDB() // Iniciamos la de datos

const app = express()  //Creando instancia express - Iniciamos la aplicacion

export default app