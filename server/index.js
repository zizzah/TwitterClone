import bodyParser from"body-parser";
import mongoose from "mongoose";
import express from 'express'
import dotenv from  'dotenv'
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
 const app = express();
// router

 // middleware
 app.use(bodyParser.json({limit:'30mb', extended: true}));
 app.use(bodyParser.urlencoded({limit:'30mb', extended: true}))

 dotenv.config()

 // connecting to mongo and starting server 
 mongoose.connect(process.env.MONGO_DB,
 {useNewUrlParser:true,useUnifiedTopology:true}).
 then(()=>app.listen(process.env.PORT,()=>console.log("Connected"))).catch(
  (err)=>console.log(err)
 )



 // usege of routes

 app.use('/auth',AuthRoute)
 app.use('/user',UserRoute)


