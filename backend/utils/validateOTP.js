import { body } from "express-validator";
import { validationResult } from "express-validator";

const validatedUserOtpData = [
   body('otp').isInt().isLength({
      min:7,
      max:7
   }),
   (req,res,next)=>{
      let errors = validationResult(validatedUserOtpData)
      if(!errors.isEmpty()){
         req.validatedUserOtpData = validatedUserOtpData
      }
      next()
   }
] 
export default validatedUserOtpData