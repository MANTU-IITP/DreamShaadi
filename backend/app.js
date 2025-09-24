import express from "express"
import mongoose from "mongoose";
// import User from "./models/User.js"
import Vendor from "./models/Vendor.js";
import bodyParser from "body-parser"
import cors from "cors"
let Port=3000;

const app=express();
app.use(bodyParser.json())
app.use(cors());


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wedplaner');
  console.log("db connected")

  
}

app.get("/",(req,res)=>{
    res.send("hii i am root")
})

app.post("/vendor/post/create",async (req,res)=>{
  try{
    const vendorData=new Vendor(req.body) 
    if(!vendorData){
      return res.status(404).json({msg:"vendor data not found"})
    }
    const savedata=await vendorData.save()
    res.status(200).json(savedata)
  }catch(error){
    res.status(500).json({error:error})
  }
  

})


app.get("/vendor/post/getone/:id",async(req,res)=>{
  try{
     let id= req.params.id;
  const vendorExist=await Vendor.findById(id);
  if(!vendorExist){
    return res.status(404).json({msg:"vendor not found"})

  }
  res.status(200).json(vendorExist)


  }catch(error){
    res.status(500).json({error:error})
  }
 

})


app.get("/vendor/post/getall",async (req,res) => {
  try{
    let allvendor=await Vendor.find()
  if(!allvendor){
    return res.status(404).json({msg:"vendor not found"})
  }
  res.status(200).json(allvendor)

  }catch(error){
    res.status(500).json({error:error})

  }
  
})

app.put("/vendor/post/update/:id",async (req,res) => {
try{
    let id=req.params.id;
    let vendorExist=await Vendor.findById(id)
    if(!vendorExist){
   return res.status(404).json({msg:"vendor not found"})
    }

    let updatevendordata=await Vendor.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({msg:"vendor data updated"})

}catch(error){
   res.status(500).json({error:error})

}

  
})


app.delete("/vendor/post/delete/:id",async (req,res) => {
 try{
   let id=req.params.id;
  let vendorExist=await Vendor.findById(id);
  if(!vendorExist){
    return res.status(404).json({ msg: "Vendor not exist" });
  }
  await Vendor.findByIdAndDelete(id);
      res.status(200).json({ msg: "Vendor deleted successfully" });
  

 }catch(error){
      res.status(500).json({ error: error });
  
 }
})

app.listen(Port,(req,res)=>{
    console.log(`server is listning on ${Port}`)
})

