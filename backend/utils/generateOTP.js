const generateOTP = async ()=>{
   return Math.floor(Math.random() * 10000000)
}
export default generateOTP