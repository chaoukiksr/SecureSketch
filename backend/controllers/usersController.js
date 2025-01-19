import User from "../modles/userModel.js"
import hashData from "../utils/hashData.js"
export default {
   registreUser: async (req, res) => {

      const { name, email, password } = req.body
      const userExists = await User.findUserByEmail(email)
      console.log(userExists)

      if (userExists) {
        return res.status(400).json({ message: "email already exists" })
         
      }

      const newUser = new User({ name, email, password: await hashData(password)})
      try {
         await newUser.insertUser()
         console.log(`Success inserting the new User: ${newUser.id}`)
         res.status(200).json({ message: `Success inserting the new User: ${newUser.id}` })
         // return result
      } catch (error) {
        return res.status(500).json({ message: `An error occured when inserting the user` })
         
      }


   }
}