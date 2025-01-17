import pool from '../config/dbconfig.js'

class Plan {
   constructor({ id = null, label, volume, price }) {
      this.id = id
      this.label = label
      this.volume = volume
      this.price = price
   }
   static async createPlanTable() {
      const query = `
      create table if not exists plans (
         id int AUTO_INCREMENT primary key,
         label varchar(20) not null unique,
         volume int null,
         price float not null
         )
         `
         const connection = await pool.getConnection()
      try {
         connection.beginTransaction()
         const result = await connection.query(query)
         console.log('plan table is created or already exists')
         return result
      } catch (error) {
         connection.rollback()
         console.error(`error when creating plan table: ${error}`)
         throw error
      } finally {
         connection.release()
      }
   }
   async insertPlan(plan) {
      const { label, volume, price } = plan
      const query = `
      insert into plans (label,volume,price) values (?,?,?)
      `
      const connection =  await pool.getConnection()
      try {
         connection.beginTransaction()
         const [result] = await connection.query(query, [label, volume, price])
         this.id = result.insertId
         console.log(`plan record is inserted`)
         return result
      } catch (error) {
         connection.rollback()
         console.error(`error inserting plan record! ${error}`)
         throw error
      } finally {
         connection.release()

      }
   }
}

export default Plan;