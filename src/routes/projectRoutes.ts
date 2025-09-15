

import { Router } from "express";  //Importamos Router
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";

const router = Router()  //Creamos la instancia de router


//PROJECT ROUTES ------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------

//TASK ROUTES---------------------------------------------------------------------------

router.param('projectId', projectExists)  // MIDDLEWARE - Validamos que el proyecto exista cada que projectID sea llamado

//Ruta para crear tareas  Ruta: /api/projects/:projectId/tasks
router.post('/:projectId/tasks',
    body('name')  //Validacion
        .notEmpty().withMessage('Name of the task is mandatory'),
    body('description')
        .notEmpty().withMessage('Description is mandatory'),
    TaskController.createTask
)

//Ruta para mostrar todas las tareas  Ruta: /api/projects/:projectId/tasks
router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.param('taskId', taskExists)  //MIDDLEWARE - Llamamos el middleware para evitar tanto codigo en el controller sobre el task existing
router.param('taskId', taskBelongsToProject)  //MIDDLEWARE - Llamamos el middleware revisar que el task pertenezca al projecto

//Ruta para mostrar una tarea por id  Ruta: /api/projects/:projectId/tasks/:taskId
router.get('/:projectId/tasks/:taskId',
    param('taskId')  //Validacion
        .isMongoId().withMessage('Mongo ID is mandatory'),
        handleInputErrors,
    TaskController.getTaskById
)

//Ruta para actualizar una tarea por id  Ruta: /api/projects/:projectId/tasks/:taskId
router.put('/:projectId/tasks/:taskId',
    param('taskId')  //Validacion
        .isMongoId().withMessage('Mongo ID is mandatory'),
    body('name')  //Validacion
        .notEmpty().withMessage('Name of the task is mandatory'),
    body('description')
        .notEmpty().withMessage('Description is mandatory'),
    handleInputErrors,
    TaskController.updateTask
)

//Ruta para elminar una tarea por id  Ruta: /api/projects/:projectId/tasks/:taskId
router.delete('/:projectId/tasks/:taskId',
    param('taskId')  //Validacion
        .isMongoId().withMessage('Mongo ID is mandatory'),
    handleInputErrors,
    TaskController.deleteTask
)

//Ruta para cambiar el status de una tarea por id  Ruta: /api/projects/:projectId/tasks/:taskId/status
router.post('/:projectId/tasks/:taskId/status',
    param('taskId')  //Validacion
        .isMongoId().withMessage('Mongo ID is mandatory'),
    body('status')  //Validacion
        .notEmpty().withMessage('Status of the task is mandatory'),
    handleInputErrors,
    TaskController.updateStatus
)


//--------------------------------------------------------------------------------------

export default router