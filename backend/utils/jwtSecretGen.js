import crypto from 'crypto'
const generateJwtSecret = (length)=>{
   return crypto.randomBytes(length).toString('hex')
}
export default generateJwtSecret