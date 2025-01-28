import { body } from "express-validator";
import { validationResult } from "express-validator";

const validateData = [
   body('otp').isInt().isLength({
      min:7,
      max:7
   }),
   (req,res,next)=>{
      let errors = validationResult(validateData)
      if(!errors.isEmpty()){
         req.validateData = validateData
      }
      next()
   }
] 
export default validateData