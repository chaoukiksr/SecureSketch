import pool from '../config/dbconfig.js'

const dropDb = async ()=>{
  try {
    await pool.query(`
      delete from usages;
      delete from users;
      delete from plans;
      `)
      console.log('success deleting data')
   } catch (error) {
      
      console.error('error deleting data',error)
  }
}
export default dropDb