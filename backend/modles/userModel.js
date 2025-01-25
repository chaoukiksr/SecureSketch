import pool from '../config/dbconfig.js'
class User {
   constructor({ id = null, name, email, password, isVerified = false, isAdmin = false, planId = 0, usageId = null }) {
      this.id = id
      this.name = name
      this.email = email
      this.password = password
      this.isVerified = isVerified
      this.isAdmin = isAdmin
      this.planId = planId
      this.usageId = usageId

   }
   static async createUsersTable() {
      const usersTableCreationQuery = `
      create table if not exists users(
      id int AUTO_INCREMENT primary key,
      name varchar(255) not null,
      email varchar(40) not null unique,
      password varchar(255) not null,
      isVerified boolean default false,
      isAdmin boolean default false,
      planId int ,
      usageId int ,
      api_key int ,
      foreign key (planId) references plans(id),
      foreign key (usageId) references usages(id)
      );
      `
      let connection
      try {
         connection = await pool.getConnection()
         await connection.beginTransaction();
         const result = await connection.execute(usersTableCreationQuery)
         await connection.commit()
         console.log(`users table is created or already exists`)
         return result
      } catch (error) {
         if (connection) await connection.rollback()
         console.error(`error creating users table ${error}
            `)
         // throw error

      } finally {
         if (connection) connection.release()
      }
   }

   async insertUser() {
      const query = `
         insert into users (name,email,password,isVerified,isAdmin,planId,usageId) values (?,?,?,?,?,?,?)
         `
      let connection
      try {
         connection = await pool.getConnection()
         await connection.beginTransaction()
         const [result] = await connection.execute(query, [this.name, this.email, this.password, this.isVerified, this.isAdmin, this.planId, this.usageId])
         await connection.commit()
         this.id = result.insertId
         console.log(`successfully inserting user: ${this.id}, ${this.name}, ${this.email}`)
         return result
      } catch (error) {
         if (connection) await connection.rollback()
         console.error(`Error while inserting user:`)
         throw error
      } finally {
         if (connection) connection.release()
      }


   }
   static async findUserByEmail(email) {
      const query = `
      select * from users where email = ?
      `
      let connection
      try {
         connection = await pool.getConnection()
         await connection.beginTransaction()
         const [rows] = await connection.execute(query, [email])
         console.log(rows)
         await connection.commit()
         return rows.length > 0 ? rows[0] : null
      } catch (error) {
         if (connection) await connection.rollback()
         console.log(error)
         throw error
      } finally {
         if (connection) connection.release()
      }

   }
   static async updateUser(field, value, email){
      const query = `
      update users set ${field} = ? where email = ?
      `
      const connection = await pool.getConnection()
      try {
         await connection.beginTransaction()
       await connection.execute(query,[value,email])
         await connection.commit()
         return 
      } catch (error) {
        if(connection) connection.rollback()
         console.log(error)
      throw error
      } finally{
         if (connection) connection.release()
            console.log('connection is released')
      }

   }

}

export default User