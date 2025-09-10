
import express from "express";  //Llamamos a la libreria express
import dotenv from 'dotenv'  //Importamos la opcion de variables de entonno .env
import { connectDB } from "./config/db"; // Importamos la concection a DB
import projectRoutes from './routes/projectRoutes'


//Habilitamos las variables de entorno
dotenv.config()  

// Iniciamos la de datos
connectDB() 

//Creando instancia express - Iniciamos la aplicacion
const app = express()  
app.use(express.json())   //Habilitamos la lectura de objetos JSON

//Routes
app.use('/api/projects', projectRoutes)   //Ruta que manejara los projectos


export default app