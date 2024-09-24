const express=require('express')
require('dotenv').config('../.env')
const router=express.Router()


router.post('/user',async (req,res,next)=>{
   try{
        const {username,password}=req.body;
        await  queries.addUser(username,password);
        return res.json({"success":true, "username":username, "password":password});
   }
   catch (error){
        next(error)
   }
   

})
module.exports=router;