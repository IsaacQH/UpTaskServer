
import mongoose, {Schema, Document} from "mongoose";

export type ProjectType = Document & {   //Hereda todas las propiedades de Document y ademas lo que definimos
    projectName: string,
    clientName: string,
    description: string
}                   //Esta es la "Interfaz de ProjectType". Esto es de Typescript

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,       //Le pedimos al Schema que se necesita
        trim: true,       //Elimina los espacios
    },
    clientName: {
        type: String,
        required: true,       //Le pedimos al Schema que se necesita
        trim: true,       //Elimina los espacios
    },
    description: {
        type: String,
        required: true,       //Le pedimos al Schema que se necesita
        trim: true,       //Elimina los espacios
    },
})   //Este es el Schema que la DB debe tener

const Project = mongoose.model<ProjectType>('Project', ProjectSchema) //Creamos el modelo, nombre unico
export default Project