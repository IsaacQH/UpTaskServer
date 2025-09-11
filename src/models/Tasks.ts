import mongoose, {Schema, Document, Types} from "mongoose";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETE: 'complete'
} as const  //Creamos una constante

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]  //Obtenemos solo los valores de ''

export interface ITask extends Document {   //Hereda todas las propiedades de Document y ademas lo que definimos
    name: string,
    description: string,
    project: Types.ObjectId,   //Obtenemos el id del projecto del otro modelo
    status: TaskStatus
}                   //Esta es la "Interfaz de Task". Esto es de Typescript

export const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,       //Le pedimos al Schema que se necesita
        trim: true,       //Elimina los espacios
    },
    description: {
        type: String,
        required: true,       //Le pedimos al Schema que se necesita
        trim: true,       //Elimina los espacios
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'   //Manda a traer la referencia del modelo Project
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING   //Estado inicial
    }
}, {timestamps:true})   //Este es el Schema que la DB debe tener

const Task = mongoose.model<ITask>('Task', TaskSchema) //Creamos el modelo, nombre unico
export default Task