import pool from '../config/dbconfig.js'
export const insertUser = async (name, email, password, isVerified, isAdmin, planId, usageId,api_key) => {
   try {
      pool.query(`
        insert into users (name,email,password,isVerified,isAdmin,planId,usageId,api_key) values (${name},${email},${password},${isVerified},${isAdmin},${planId},${usageId},${api_key})
         `)
      console.log(`user record is inserted`)

   } catch (error) {
      console.error(`error inserting user record! ${error}`)

   }
}