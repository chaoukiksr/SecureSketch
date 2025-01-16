import pool from '../config/dbconfig.js'
class apis{
   constructor (id=null,key,created_at,expires_at,status="active",rate_limit=30,user_id){
      this.id = id
      this.key = key
      this.created_at = created_at
      this.expires_at = expires_at
      this.status = status
      this.rate_limit = rate_limit
      this.user_id = user_id
   }
   static async createApisTable(){
      const query = `
      CREATE TABLE api_keys (
   id INT AUTO_INCREMENT PRIMARY KEY,
   apiKey VARCHAR(30) NOT NULL UNIQUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   expires_at TIMESTAMP,
   apiStatus ENUM('active', 'inactive', 'revoked', 'expired') DEFAULT 'active',
   rateLimit INT DEFAULT 30,
   userId INT NOT NULL,
   FOREIGN KEY (userId) REFERENCES users(id)
);
      `
      try {
         const result = await pool.query(query)
         console.log(`apis tables is created or already exists`)
         return result
      } catch (error) {
         console.error(`error creating apis table: ${error}`)
         throw error
      }

   }
}
export default apis