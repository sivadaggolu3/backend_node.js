const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv');

dotEnv.config();

const secretKey=process.env.WhatIsYourName
const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body


 try{
     const vendorEmail=await Vendor.findOne({email});
     if(vendorEmail){
        return res.status(400).json("Email already registered")
     }
     const  hashedPassword=await bcrypt.hash(password,10);

     const newVendor=new Vendor({
        username,
        email,
        password: hashedPassword
     });

     await newVendor.save();
     res.status(201).json({message:"vendor registered sucessfully"});
     console.log('registered');
 }catch(error){
    console.log(error);
     res.status(500).json({error:"internal server"});

 }
 
};
const vendorLogin=async(req,res)=>{
     const{email,password}=req.body;
     try{
        const vendor=await Vendor.findOne({email});

        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"invalid username or password"})
        }

        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})
        res.status(200).json({sucess:"login sucessfully",token:token})
        console.log("token generated",token);
     }catch(error){
      console.log(error);
     }
}

const getAllVendors=async(req,res)=>{
   try{
      const vendors=await Vendor.find().populate('firm');
      res.json({vendors});
   }
   catch(error){
       console.error("DETAILED ERROR:", error && error.stack ? error.stack : error);
  res.status(500).json({ error: error.message || "Internal server  Error" });
   }
}

const getVendorById=async(req,res)=>{
   const vendorId=req.params.id
     try{
          const vendor=await Vendor.findById(vendorId);

          if(!vendor){
            return res.status(404).json({error:"vendor not found"})
          }
          res.status(200).json("vendor");
     }
     catch(error){
           console.log(error);
      res.status(500).json({error:"Internal Server Error"});
     }
}

 module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById};