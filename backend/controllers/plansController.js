import pool from '../config/dbconfig.js'
export const insertPlan = async () => {
   try {
      pool.query(`
         insert into plans (label,price) values ()
         `)
      console.log(`plan record is inserted`)
   } catch (error) {
      console.error(`error inserting plan record! ${error}`)

   }
}