import { verifyJWT } from '../utils/JWT.js'
const authenticate = async (req, res, next)=>{
   try {
      let token = req.headers.authorization?.split(' ')[1] || req.cookies.refreshToken
      console.log('token',token)
      let decodedData = verifyJWT(token)
      if (!decodedData) {
         return res.status(401).json({
            message: "Sorry, you are Unauthorized to access this route, please login"
         })
      }
      // req.user = decodedData
      next()
   } catch (error) {
      console.log(`Error in authenticate middelware: ${error}`)
      res.status(500).json({
         status: `faild`,
         message:`internal server error: ${error}`
      })
   }
}
export default authenticate