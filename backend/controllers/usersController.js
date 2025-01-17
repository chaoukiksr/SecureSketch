import User from "../modles/userModel.js"
import validateData from "../utils/validateData.js"
import { validationResult } from "express-validator"
export default {
   registreUser: async (req, res) => {
      const errors = validationResult(req)
      
      if (!errors.isEmpty()){
         res.status(401).json({message:errors.array()})
         // throw new Error('Invalid data')
      }

      const { name, email, password } = req.body
      const newUser = new User({ name, email, password })
      try {
        await newUser.insertUser()
         console.log(`Success inserting the new User: ${newUser.id}`)
         res.status(200).send(newUser)
         // return result
      } catch (error) {
         console.error(error)
         res.status(500).send(`error`)
         throw error
      }


   }
}