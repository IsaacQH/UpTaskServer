
import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

//Le decimos de forma global cual es la interfaz del projecto
declare global {
    namespace Express{
        interface Request{
            project:IProject
        }
    }
}

//Valida si el proyecto existe
export async function validateProjectExists(req:Request, res:Response, next:NextFunction){
    try {
        const {projectId} = req.params //Obtenemos el ID del proyecto 
        const project = await Project.findById(projectId)  //Obtnemos el projecto segun el ID
        if(!project){   //Si no encuentra un proyecto
                const error = new Error('This project does not exists')
                return res.status(404).json({error: error.message})  //Devolveremos el error
        }
        req.project = project
        next()  //Pasa a la siguiente funcion
    } catch (error) {
        res.status(500).json({message: 'There was an error'})
    }
}
