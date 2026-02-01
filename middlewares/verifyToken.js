const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const dotEnv=require('dotenv');
dotEnv.config();

const secretKey=process.env.WhatIsYourName;
const VerifyToken=async(req,res,next)=>{
  console.log("Headers:", req.headers);

    const token=req.headers.token;

    if(!token){
        return res.status(401).json({error:'token is required'});

    }
    try{

        const decoded=jwt.verify(token,secretKey);
        const vendor=await Vendor.findById(decoded.vendorId);
        if(!vendor){
            return res.status(404).json({error:'vendor not found'});
        }
        req.vendorId=vendor._id;

        next();
    }
    catch(error){
           console.log(error);
           return res.status(500).json({error:"Invalid token"});
    }
}

module.exports=VerifyToken