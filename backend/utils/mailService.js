import nodemailer from "nodemailer";
import 'dotenv/config';
import mailConfig from "../config/mailConfig.js";

const transporter = nodemailer.createTransport(mailConfig)

transporter.verify((error,success)=>{
if(error){
   console.error(error)
}else{
   console.log(success)
}
})
const sendMail = async (userEmail,otpCode) => transporter.sendMail({
   from: `"${process.env.DISPLAY}" ${process.env.EMAIL}`,
   to: userEmail,
   subject: `Account's Email Confirmation`,
   html: `
            <h1>Welcome to SecureSketch!</h1>
            <p>Thank you for signing up. Please use the following verification code to confirm your email address:</p>
            <h2 style="color: #00af99; letter-spacing:3px;">${otpCode}</h2>
            <p>If you did not request this code, please ignore this email.</p>
            <p>Best regards,<br/>The SecureSketch Team</p>
        ` //
   
},(err,suc)=>{

   if(err){
      console.log(err)
   }else{
      console.log(suc)
   }
})
export default sendMail