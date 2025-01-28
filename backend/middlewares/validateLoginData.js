import { body } from "express-validator";
import { validationResult } from "express-validator";

const validateData = [
   body('email').trim().escape().isEmail().normalizeEmail().withMessage({
      message:"validation Error",
      location:"email field"
   }),
   body('password').trim().escape().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).isLength({
      min:8
   }).withMessage({
      message:"validation Error",
      location:"password field"
   }),
   (req,res,next)=>{
      let errors = validationResult(validateData)
      if(!errors.isEmpty()){
         req.validateData = errors.array()
      }
      next()
   }
]

export default validateData