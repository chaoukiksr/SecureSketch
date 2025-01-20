import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com', // Correct host for Gmail
   port: 587,              // Port for secure connection (STARTTLS)
   secure: false,
   auth:{
      user:"kessourichaouki@gmail.com",
      pass:"zeyw wlys ckgo xmlf"
   }
})

transporter.verify((error,success)=>{
if(error){
   console.error(error)
}else{
   console.log(success)
}
})
const sendMail = async (mailOpt) => transporter.sendMail(mailOpt,(err,suc)=>{
   if(err){
      console.log(err)
   }else{
      console.log(suc)
   }
})
export default sendMail