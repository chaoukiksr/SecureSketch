import { generateJWT, verifyJWT } from '../utils/JWT.js'
import generateJwtSecret from '../utils/jwtSecretGen.js'
const authenticate = async (req, res, next) => {
   try {
      let accessTokenField = req.headers.authorization
      let refreshTokenField = req.headers.cookie

      if (!accessTokenField) {
         return res.status(401).json({
            status: "error",
            message: "access token or refrech token are not been provided"
         })
      }
      let accessToken = accessTokenField.split(' ')[1]
      let decodedData
      try {
         decodedData = verifyJWT(accessToken)
         if (decodedData) {
            req.user = {
               id: decodedData.userId,
               role: decodedData.role
            }
            return next()
         }
      } catch (error) {
         if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            const newAccessToken = generateJWT(decodedData)
            const newRefrechToken = generateJwtSecret(decodedData)
            req.refrechToken = newRefrechToken
            return {token:newAccessToken}
         } else {
            return res.status(401).json({
               status: "faild",
               message: `error in accessToken function: ${error}`
            })
         }
      }

      let refrechToken = refreshTokenField.split(' ')[1]
      try {
         decodedData = verifyJWT(refrechToken)
         if (decodedData) {
            req.user = {
               id: decodedData.userId,
               role: decodedData.role
            }
            return next()
         }
      } catch (error) {
         return res.status(401).json({
            status: "faild",
            message: `error in refreshToken function: ${error}`
         })
      }
   } catch (error) {
      return res.status(500).json({
         status: "faild",
         message: `internal server error: ${error}`
      })
   }
}


export default authenticate