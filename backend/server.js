import express from 'express';
const app = express()
import 'dotenv/config';
const port = process.env.PORT
import pool from './config/dbconfig.js'


import createPlanTable from './modles/plans.js';
import createUserTable from './modles/users.js';
import createUsageTable from './modles/usages.js';
// import dropDb from './modles/dropDb.js';

import { insertUser } from './controllers/usersController.js';
import { insertPlan } from './controllers/plansController.js';
import { insertUsage } from './controllers/usagesController.js';






const startApp = async ()=>{
   try {
      await createPlanTable()
      await createUsageTable()
      await createUserTable()
      console.log(`database setup is complete`)
      app.listen(port,(req,res)=>{
   console.log(`app is working on port ${port}, at http://localhost:${port}`)
})
   } catch (error) {
      console.error(`Error while setting up the database: ${error}`)
   }
}
startApp()
