import {body} from "express-validator"
const validateData = ()=>{
   return [
      body('name').trim().escape().isLength({
         min:1
      }).withMessage('Unvalide user name'),
      body('email').trim().escape().isEmail().normalizeEmail()
      .withMessage('Invalide user email'),
      body('password').trim().escape().isLength({
         min:8
      }).isAlphanumeric().withMessage('Invalid user password')
   ]
}
export default validateData