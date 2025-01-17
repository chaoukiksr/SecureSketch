import pool from '../config/dbconfig.js'

class Usage {
   constructor (id=null, totalReqs=0){
      this.id = id
      this.totalReqs = totalReqs
   }
   static async createUsageTable(){
      const query = 
      `
      create table if not exists usages(
         id int AUTO_INCREMENT primary key,
            totalReqs int not null
            )
            `
            const connection = await pool.getConnection()
            try {
               await connection.beginTransaction()
               const result = connection.query(query)
               console.log('usage table is created or already exists')
               return result
               
            } catch (error) {
               connection.rollback()
               console.error(`error when creating usage table: ${error}`)
               throw error
            } finally{
               connection.release()
            }
         }
         async insertUsage (usage){
            const {totalReqs} = usage
            const query = `
         insert into usages (totalReqs) values (?)
         `
         const connection = await pool.getConnection()
         try {
            await connection.beginTransaction()
            const [result] = await connection.query(query,[totalReqs])
            this.id = result.insertId
            console.log(`usages record is inserted`)
         } catch (error) {
            connection.rollback()
            console.error(`error inserting usage record! ${error}`)
            throw error
         } finally{
            connection.release()
         }
         }
      }
export default Usage