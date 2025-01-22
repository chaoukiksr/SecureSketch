import 'dotenv/config'
export default {
   host: 'smtp.gmail.com', // Correct host for Gmail
   port: 587,              // Port for secure connection (STARTTLS)
   secure: false,
   auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
   }
}