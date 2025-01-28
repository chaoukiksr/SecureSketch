import express from 'express';
const app = express()
import 'dotenv/config';
const port = process.env.PORT
import cors from 'cors'
import apis from './modles/apis.js';
import Usage from './modles/usageModel.js';
import User from './modles/userModel.js';
import Plan from './modles/planModel.js';
import userRoutes from './routes/userRoutes.js'
import killPort from 'kill-port';
import redis from 'redis'
import rateLimit from './utils/rateLimiter.js';
const redisClient = redis.createClient()
redisClient.connect()
redisClient.on('connect', () => {
   console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
   console.error('Redis error:', err);
});
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',userRoutes)
app.use(rateLimit)

const startApp = async ()=>{
   try {
      await Usage.createUsageTable()
      await Plan.createPlanTable()
      await User.createUsersTable()
      await apis.createApisTable()
      console.log(`database setup is complete`)
      await killPort(port)
      app.listen(port,(req,res)=>{
   console.log(`app is working on port ${port}, at http://localhost:${port}`)
})
   } catch (error) {
      console.error(`Error while setting up the database: ${error}`)
      // throw error
   }
}
startApp()
export default redisClient