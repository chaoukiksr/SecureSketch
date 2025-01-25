import jwt from 'jsonwebtoken'
import  dotenv from'dotenv'
dotenv.config()

const generateJWT = (payload) =>{
   return jwt.sign(payload, process.env.JWT_SECRET,{
      expiresIn:process.env.TIME_TO_EXPIRE
   })
}

const verifyJWT = (token)=>{
   return jwt.verify(token,process.env.JWT_SECRET)
}

export {generateJWT,verifyJWT}