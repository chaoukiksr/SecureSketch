const validateReq = (req,res,next)=>{
   if (req.validatedData != null){
    return  res.status(400).json({message:"data validation error"})
   }
   next()
}
export default validateReq