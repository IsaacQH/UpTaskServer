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
            res.status(500).json({error: 'There was an error'})
        }
    }

    //Controlador para mostrar todas las tareas
    static getProjectTasks = async (req: Request, res:Response) => {    //Metodo para crear proyectos
        
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')  //Le decimos que busque el Task con el project id asociado
            res.json(tasks)  //Regresa todas las tareas de ese project
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    //Controlador para obtener tarea por ID
    static getTaskById = async (req:Request, res:Response) => {
        try {
            return res.json(req.task)
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    //Controlador para actualizar tarea por ID
    static updateTask = async (req:Request, res:Response) => {
        try {
            req.task.name = req.body.name   //Actualizamos la id por el body enviado
            req.task.description = req.body.description  //Actualizamos la descripcion por el body enviado
            await req.task.save()   //Guardamos cambios en la DB
            return res.send('Task has been updated')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    //Controlador para eliminar tarea por ID
    static deleteTask = async (req:Request, res:Response) => {
        try {
            req.project.tasks = req.project.tasks.filter( (task) => task.toString() !== req.task.id)  //Filtramos donde task sea diferente el id obtenido
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])  //Eliminiamos el task y guardamos el nuevoe arreglo
            return res.send('Task has been deleted')
        } catch (error) {
            res.status(500).json({error: 'There was an error'})
        }
    }

    //Controlador para actualizar STATUS de tarea por ID
    static updateStatus = async (req:Request, res:Response) => {
        try {
            const {status} =  req.body    //Leemos el body que se envia a traves del form
            req.task.status = status
            await req.task.save()
            res.send('Task status updated')
        } catch (error) {
            res.status(500).json({message: 'There was an error'})
        }
    }
}