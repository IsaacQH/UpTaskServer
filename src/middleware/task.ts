
import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Tasks";

//Le decimos de forma global cual es la interfaz del projecto
declare global {
    namespace Express{
        interface Request{
            task:ITask
        }
    }
}

//Valida si el proyecto existe
export async function taskExists(req:Request, res:Response, next:NextFunction){
    try {
        const {taskId} = req.params //Obtenemos el ID del proyecto 
        const task = await Task.findById(taskId)  //Obtnemos el projecto segun el ID
        if(!task){   //Si no encuentra un proyecto
                const error = new Error('This project does not exists')
                return res.status(404).json({error: error.message})  //Devolveremos el error
        }
        req.task = task
        next()  //Pasa a la siguiente funcion
    } catch (error) {
        res.status(500).json({message: 'There was an error'})
    }
}

export async function taskBelongsToProject (req:Request, res:Response, next:NextFunction){
    if(req.task.project.toString() !== req.project.id.toString()){    //Si el project id es diferente al que mandamos. Compararlo con texto porque es objec t id
        const error = new Error('Not valid action')
        res.status(400).json({error: error.message})  
    }
    next()
}
