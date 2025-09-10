import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"


export const handleInputErrors = (req:Request, res:Response, next:NextFunction) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){  //Si existe un error
        return res.status(400).json({errors: errors.array()})   //Regresa un error 400 al POST
    }
    next()  //Permite continuar con la accion
}