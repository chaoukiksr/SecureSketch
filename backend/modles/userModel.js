import pool from '../config/dbconfig.js'
import verifyCredintials from "../utils/verifyCredintials.js"
class User {
   constructor({id=null,name, email, password, isVerified=false, isAdmin=false, planId=0, usageId=null}){
      this.id = id
      this.name = name
      this.email = email
      this.password = password
      this.isVerified = isVerified
      this.isAdmin = isAdmin
      this.planId = planId
      this.usageId = usageId
      
   }
   static async createUsersTable (){
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
     try {
        const result = await pool.query(usersTableCreationQuery)
        console.log(`users table is created or already exists`)
        return result
      } catch (error) {
         console.error(`error creating users table ${error}
            `)
            // throw error
         
     }
   }

   async insertUser(){
      // console.log(user)
      // const { name, email, password, isVerified, isAdmin, planId, usageId} = user
      if (verifyCredintials(this)){
         const query = `
         insert into users (name,email,password,isVerified,isAdmin,planId,usageId) values (?,?,?,?,?,?,?)
         `
         try {
            const [result] = await pool.query(query,[this.name,this.email,this.password,this.isVerified,this.isAdmin,this.planId,this.usageId])
            this.id = result.insertId
            console.log(`successfully inserting user: `)
            return result
         } catch (error) {
            console.error(`Error while inserting user:`)
            throw error
         }
      }
      throw new Error ('Invalid data')
   }

}

export default User