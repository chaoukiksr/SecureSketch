import dotenv from 'dotenv'
dotenv.config()
import redisClient from '../server.js'
const storeRefreshToken = async (email,refreshToken) =>{
   let redisKey = `refreshToken:user:${email}`
   try {
      if (await redisClient.get(redisKey)) {
         await redisClient.del(redisKey)
      }
      return await redisClient.set(redisKey, refreshToken, 'EX', process.env.REFRESH_TIME)
   } catch (error) {
      console.log(`Error in redis: ${error}`)
      throw error
   }
}
export default storeRefreshToken