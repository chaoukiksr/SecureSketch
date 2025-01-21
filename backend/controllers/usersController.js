import User from "../modles/userModel.js"
import generateOTP from "../utils/generateOTP.js"
import hashData from "../utils/hashData.js"
import mailService from "../utils/mailService.js"
import sendMail from "../utils/mailService.js"
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
      let response = await sendMail(newUser.email, otpCode)
      console.log(otpCode)
      console.log(response)
      return res.status(200).json({ message: `Success inserting the new User: ${newUser.id}, ${newUser.name}, ${newUser.email}` })

    } catch (error) {
      return res.status(500).json({ message: `An error occured when inserting the user` })

    }


  }
}


