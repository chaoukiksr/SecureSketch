import pool from '../config/dbconfig.js'

const createUserTable = async () => {
   try {
      //because user is a reserved keyword, i'm escaping it with the double backtick
      pool.query(
         `
      create table if not exists users(
      id int AUTO_INCREMENT primary key,
      name varchar(255) not null,
      email varchar(40) not null unique,
      password varchar(255) not null,
      isVerified boolean default false,
      isAdmin boolean default false,
      planId int ,
      usageId int ,
      foreign key (planId) references plans(id),
      foreign key (usageId) references usages(id)
      );
      
      `
      )
      console.log('user table is created or already exists')
   } catch (error) {
      console.error(`error when creating user table: ${error}`)
   }
}
export default createUserTable