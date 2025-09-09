
import mongoose from "mongoose"; //Habilitamos el ODM para conectar mongoDB con nodeJS
import colors from "colors"; //Habilitamos colores en consola servidor


export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)  //Hace la conexion a la DB
        const url = `${connection.host}:${connection.port}`  
        console.log(colors.magenta.bold(`MongoDB conectado en ${url}`))  //Muestra en consola el pierto conectado
    } catch (error) {
        console.log(colors.red.bold('Error al conectar a la base de datos'))
        process.exit(1)   //Cancelamos el proceso si no se conecta la DB y falla
    }
}
