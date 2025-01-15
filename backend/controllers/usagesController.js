import pool from '../config/dbconfig.js'
export const insertUsage = async () => {
   try {
      pool.query(`
         insert into usages (requestNbr) values ()
         `)
      console.log(`usages record is inserted`)

   } catch (error) {
      console.error(`error inserting usage record! ${error}`)

   }
}