import rateLimit from "express-rate-limit"
const limiter = rateLimit({
   windowMs:15*60*1000,
   max:30,
   message:"Too many request"
})
export default limiter