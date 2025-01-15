import pool from '../config/dbconfig.js'
export const insertUser = async () => {
   try {
      pool.query(`
        insert into users (name,email,password,isVerified,isAdmin,planId,usageId) values ()
         `)
      console.log(`admin record is inserted`)

   } catch (error) {
      console.error(`error inserting admin record! ${error}`)

   }
}