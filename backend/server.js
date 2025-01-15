import express from 'express';
const app = express()
import 'dotenv/config';
const port = process.env.PORT


app.listen(port,(req,res)=>{
   console.log(`app is working on port ${port}`)
})