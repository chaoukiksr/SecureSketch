import User from "../modles/userModel.js"
import generateOTP from "../utils/generateOTP.js"
import hashData from "../utils/hashData.js"
import sendMail from "../utils/mailService.js"
import redisClient from "../server.js"
import bcrypt from 'bcrypt'
import generateJwtSecret from '../utils/jwtSecretGen.js'
import { generateJWT, verifyJWT } from '../utils/JWT.js'
import validateUser from "../utils/validateUser.js"
import storeRefreshToken from "../utils/storeRefrechToken.js"
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
      await redisClient.set(redisKey, hashedOtp, 'EX', 200)
      await sendMail(newUser.email, otpCode)
      return res.status(200).json({ message: `Success inserting the new user ${otpCode}` })

    } catch (error) {
      return res.status(500).json({ message: `An error occured when inserting the user: ${error}` })

    }


  },
  verifyUserOTP: async (req, res) => {
    let { email, otp } = req.body
    try {
      let redisKey = `otp:user:${email}`
      let storedHashedOtp = await redisClient.get(redisKey)
      if (!storedHashedOtp) {
        return res.status(404).json({ message: "OTP is expired or not found" })
      }

      if (await bcrypt.compare(otp.toString(), storedHashedOtp)) {
        redisClient.del(redisKey)
        const userVerificationState = true
        await User.updateUser('isVerified', userVerificationState, email)

        return res.status(200).json({ accountVerified: userVerificationState, message: 'otp is verified' })
      } else {
        return res.status(404).json({ accountVerified: true, message: 'wrong otp, check otp code or regenerate a new one' })

      }
    } catch (error) {
      return res.status(500).json({ message: `Error: ${error}` })
    }
  },
  login: async (req, res) => {
    let { email, password } = req.body
    try {
      let user = await validateUser(email, password)
      if (!user) {
        return res.status(401).json({
          status: "faild",
          message: "Invalid Credintials"
        })
      }

      const token = generateJWT({ userId: user.id, role: user.isAdmin})
      let refreshToken = generateJwtSecret(parseInt(process.env.LENGTH))
      console.log(refreshToken)
      storeRefreshToken(email,refreshToken)
      res.cookie('refrechToken',refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'Strict',
        maxAge: parseInt(process.env.REFRESH_TIME) * 1000
      })
      return res.status(200).json({
        message: "Successful login",
        userJWT: token
      })



    } catch (error) {
      return res.status(500).json({
        status: "faild",
        message: `internal server error while login in: ${error}`
      })
    }
  },
  showProfile: (req,res) =>{
   return res.status(200).json({
      message:"You are in the profile"
    })
  }
}


