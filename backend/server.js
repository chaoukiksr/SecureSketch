import express from 'express';
const app = express()
import 'dotenv/config';
const port = process.env.PORT

import apis from './modles/apis.js';
import Usage from './modles/usageModel.js';
import User from './modles/userModel.js';
import Plan from './modles/planModel.js';






const startApp = async ()=>{
   try {
      await Usage.createUsageTable()
      await Plan.createPlanTable()
      await User.createUsersTable()
      await apis.createApisTable()
      console.log(`database setup is complete`)
      app.listen(port,(req,res)=>{
   console.log(`app is working on port ${port}, at http://localhost:${port}`)
})
   } catch (error) {
      console.error(`Error while setting up the database: ${error}`)
      throw error
   }
}
startApp()
