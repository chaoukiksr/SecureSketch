import User from "../modles/userModel.js"
import bcrypt from 'bcrypt'
const validateUser = async (email,password) =>{
   let userData = await User.findUserByEmail(email) 
   if(!userData){
      return null
   }
   let user = new User(userData)
   if(!await bcrypt.compare(password,user.password)){
      return null
   }
   return user
}
export default validateUser