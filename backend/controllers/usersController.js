import User from "../modles/userModel.js"
import generateOTP from "../utils/generateOTP.js"
import hashData from "../utils/hashData.js"
import sendMail from "../utils/mailService.js"
import redisClient from "../server.js"
import bcrypt from 'bcrypt'
export default {
  
  registreUser: async (req, res) => {

    const { name, email, password } = req.body
    const userExists = await User.findUserByEmail(email)


    if (userExists) {
      return res.status(400).json({ message: "email already exists" })
    }

    const newUser = new User({ name, email, password: await hashData(password) })
    try {
      
      
      await newUser.insertUser()
      let otpCode = await generateOTP()
      let hashedOtp = await hashData(otpCode.toString())
      let redisKey = `otp:user:${newUser.email}`
     await redisClient.set(redisKey, hashedOtp,'EX',200)
     await redisClient.get(redisKey)
      await sendMail(newUser.email,otpCode)
      return res.status(200).json({ message: `Success inserting the new User: ${newUser.id}, ${newUser.name}, ${newUser.email}, ${otpCode}

        ` })

    } catch (error) {
      return res.status(500).json({ message: `An error occured when inserting the user: ${error}` })

    }


  },
  verifyUserOTP: async (req,res) =>{
    let {email,otp} = req.body
    try {
      let redisKey = `otp:user:${email}`
      let storedHashedOtp = await redisClient.get(`otp:user:${email}`)
      if(!storedHashedOtp){
       return res.status(404).json({message:"OTP is expired or not found"})
      }

      if ( await bcrypt.compare(otp.toString(), storedHashedOtp)) {
        redisClient.del(redisKey)
       return res.status(200).json({accountVerified:true,message:'otp is verified'})
      }else{
        return res.status(404).json({ accountVerified: true, message: 'wrong otp, check otp code or regenerate a new one' })
        
      }
    } catch (error) {
     return res.status(500).json({message:'Error'})
    }
  }
}


