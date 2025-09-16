import express from "express"
import mongoose from "mongoose";
import User from "./models/User.js"
let Port=3000;

const app=express();


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

