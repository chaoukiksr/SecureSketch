import User from "../modles/userModel.js"
export default {
   registreUser: async (req, res) => {
      const { name, email, password } = req.body
      console.log(req.body)
      console.log({name,email,password})
      const newUser = new User({name, email, password})
      try {
         await newUser.insertUser()
         console.log(`Success inserting the new User: ${newUser.id}`)
         res.status(200).send(newUser)
         // return result
      } catch (error) {
         console.error(error)
         res.status(500).send(`error`)
      }
   }
}