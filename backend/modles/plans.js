import pool from '../config/dbconfig.js'

const createPlanTable = async ()=>{
   try {
      await pool.query(
         `
         create table if not exists plans (
         id int AUTO_INCREMENT primary key,
         label varchar(20) not null unique,
         price float not null
         )
         `
      )
      console.log('plan table is created or already exists')
   } catch (error) {
      console.error(`error when creating plan table: ${error}`)
   }
}

export default createPlanTable;