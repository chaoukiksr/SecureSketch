import {body} from "express-validator"
import { validationResult } from "express-validator"
   const validateData =  [
      body('name').trim().escape().isLength({
         min:1
      }).withMessage('Unvalide user name'),
      body('email').trim().escape().isEmail().normalizeEmail()
      .withMessage('Invalide user email'),
      body('password').trim().escape().isLength({min:8}).isAlphanumeric().withMessage('Invalid user password'),
      (req,res,next)=>{
         const errors = validationResult(req)
         if(!errors.isEmpty()){
            req.validatedData = errors.array()
         }
         next()
      }
   ]

export default validateData
