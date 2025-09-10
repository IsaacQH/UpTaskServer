

import { Router } from "express";  //Importamos Router
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()  //Creamos la instancia de router

//Ruta crear proyecto junto al controlador y validacion - Ruta: /api/projects/ 
router.post('/', 
    body('projectName')  //Validacion
        .notEmpty().withMessage('Name of the project is mandatory'),
    body('clientName')
        .notEmpty().withMessage('Name of the client is mandatory'),
    body('description')
        .notEmpty().withMessage('Description is mandatory'),
    handleInputErrors,  //Midleware que se ejecuta antes de pasar a la siguiente funcion
    ProjectController.createProject //Controlador
)   

//Ruta obtener un proyecto junto al controlador - Ruta: /api/projects/ 
router.get('/', ProjectController.getAllProjects)   

//Ruta obtener todos los proyectos junto al controlador - Ruta: /api/projects/:id 
router.get('/:id', 
    param('id')  //Validacion
        .isMongoId().withMessage('Mongo ID is mandatory'),
    handleInputErrors,
    ProjectController.getProyectById
)   

//Ruta actualizar todos los proyectos junto al controlador - Ruta: /api/projects/:id
router.put('/:id', 
    param('id')  //Validacion
        .isMongoId().withMessage('Mongo ID is mandatory'),
    body('projectName')  //Validacion
        .notEmpty().withMessage('Name of the project is mandatory'),
    body('clientName')
        .notEmpty().withMessage('Name of the client is mandatory'),
    body('description')
        .notEmpty().withMessage('Description is mandatory'),
    handleInputErrors,
    ProjectController.updateProject
)  

//Ruta obtener todos los proyectos junto al controlador - Ruta: /api/projects/:id 
router.delete('/:id', 
    param('id')  //Validacion
        .isMongoId().withMessage('Mongo ID is mandatory'),
    handleInputErrors,
    ProjectController.deleteProject
)   

export default router