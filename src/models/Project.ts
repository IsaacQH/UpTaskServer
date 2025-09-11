
import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import Task, { ITask } from "./Tasks";

export interface IProject extends Document {   //Hereda todas las propiedades de Document y ademas lo que definimos
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<ITask & Document>[]  //Relacionamos el Task 
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
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ]
}, {timestamps:true})   //Este es el Schema que la DB debe tener

const Project = mongoose.model<IProject>('Project', ProjectSchema) //Creamos el modelo, nombre unico
export default Project