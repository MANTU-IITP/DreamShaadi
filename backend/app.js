import express from "express"
import mongoose from "mongoose";
// import User from "./models/User.js"


import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import cors from "cors"
let Port=3000;

const app=express();
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // aapka frontend origin
  credentials: true
}));


import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/AuthRouter.js";
import vendorRouter from "./routes/vendor.routes.js";


app.use("/auth", authRouter);
app.use("/vendor/post", vendorRouter);



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wedplaner');
  console.log("db connected")

  
}

app.get("/",(req,res)=>{
    res.send("hii i am root")
})





app.listen(Port,(req,res)=>{
    console.log(`server is listning on ${Port}`)
})

