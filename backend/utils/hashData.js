import bcrypt from 'bcrypt'

const hashData = async (data) =>{
   const salt = 10
   const hashedData = await bcrypt.hash(data,salt)
   return hashedData
}
export default hashData