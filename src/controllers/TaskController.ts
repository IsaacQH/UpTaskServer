import type { Request, Response } from "express"
import Project from "../models/Project"
import Task from "../models/Tasks"

export class TaskController {

    //Controlador para crear el proyecto
    static createTask = async (req: Request, res:Response) => {    //Metodo para crear proyectos
        
        try {
            const task = new Task(req.body)  //Obtenemos el modelo de Task con los campos que dictamos en models Tasks
            task.project = req.project.id   //Le decimos cual es elid y lo asosiamos a task
            req.project.tasks.push(task.id)   //Agregamos al array de tasks en projects el task id
            Promise.allSettled([task.save(), req.project.save()])
            res.send('Task has been created successfully')
        } catch (error) {
            res.status(500).json({message: 'There was an error'})
        }
    }

    //Controlador para mostrar todas las tareas
    static getProjectTasks = async (req: Request, res:Response) => {    //Metodo para crear proyectos
        
        try {
            const task = await Task.find({project: req.project.id}).populate('project')  //Le decimos que busque el Task con el project id asociado
            res.json(task)  //Regresa todas las tareas de ese project
        } catch (error) {
            res.status(500).json({message: 'There was an error'})
        }
    }
}