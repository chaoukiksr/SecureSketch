import pool from '../config/dbconfig.js'

const createUsageTable = async ()=>{
   try {
      await pool.query(
         `
         create table if not exists usages (
         id int AUTO_INCREMENT primary key,
         requestNbr int not null
         )
         `
      )
      console.log('usage table is created or already exists')
   } catch (error) {
      console.error(`error when creating usage table: ${error}`)
   }
}
export default createUsageTable;