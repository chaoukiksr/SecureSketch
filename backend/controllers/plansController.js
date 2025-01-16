import pool from '../config/dbconfig.js'
export const insertPlan = async (label, price) => {
   try {
      pool.query(`
         insert into plans (label,price) values (${label},${price})
         `)
      console.log(`plan record is inserted`)
   } catch (error) {
      console.error(`error inserting plan record! ${error}`)

   }
}