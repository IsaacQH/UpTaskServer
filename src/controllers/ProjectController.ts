
import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {

    //Controlador para crear el proyecto
    static createProject = async (req: Request, res:Response) => {    //Metodo para crear proyectos
        const project = new Project(req.body)      //Le decimos que se crea un objeto Project con los datos enviados en el form
        try {
            await project.save()       //Guardamos el proyecto en la abse de datos
            res.send('Proyecto creado correctamente')
        } catch (error) {
            console.log(error)  
        }
    }

    //Controlador para mostrat todos los proyectos
    static getAllProjects = async (req: Request, res:Response) => {    //Metodo para obtener los proyectos
        try {
            const projects = await Project.find({})  //Obtenemos los proyectos como varios objetos
            res.json(projects)   //Le decimos al programa que es un json lo que otenemos
        } catch (error) {
            console.log(error)
        }
    }

    
    //Controlador para mostrar un proyecto
    static getProyectById = async (req: Request, res:Response) => {    //Metodo para obtener los proyectos
        const {id} = req.params
        try {
            const project = await Project.findById(id)  //Obtenemos el pryecto del parametro id enviado
            
            if(!project){   //Si no encuentra un proyecto
                const error = new Error('This project does not exists')
                return res.status(404).json({error: error.message})  //Devolveremos el error
            }
            res.json(project)   //Le decimos al programa que es un json lo que otenemos
        } catch (error) {
            console.log(error)
        }
    }

    //Controlador para actualizar un proyecto
    static updateProject = async (req: Request, res:Response) => {    //Metodo para obtener los proyectos
        const {id} = req.params
        console.log(req.body)
        try {
            const project = await Project.findByIdAndUpdate(id, req.body) //Busca el id y lo actualiza con lo que le mandemos en body
            if(!project){   //Si no encuentra un proyecto
                const error = new Error('This project does not exists')
                return res.status(404).json({error: error.message})  //Devolveremos el error
            }
            await project.save()
            res.send('Project was updated')

        } catch (error) {
            console.log(error)
        }
    }


    //Controlador para eliminar un proyecto
    static deleteProject = async (req: Request, res:Response) => {    //Metodo para obtener los proyectos
        const {id} = req.params
        console.log(req.body)
        try {
            const project = await Project.findById(id)  //Busca el ID
            if(!project){   //Si no encuentra un proyecto
                const error = new Error('This project does not exists')
                return res.status(404).json({error: error.message})  //Devolveremos el error
            }
            await project.deleteOne()     //Elimina el project con el id dado
            res.send('Project Deleted') 

        } catch (error) {
            console.log(error)
        }
    }


}