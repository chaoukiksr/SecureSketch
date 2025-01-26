const validateReq = (req,res,next)=>{
   if (req.validatedData != null){
    return  res.status(400).json({message:"data validation error",
       error:req.validatedData})
   }
   next()
   console.log(req.email)
}
export default validateReq