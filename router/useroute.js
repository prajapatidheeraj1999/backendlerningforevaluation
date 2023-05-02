
const express=require("express")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { usemodel } = require("../model/user.model")
const {authoregister} =require("../middelware/usermiddelware")
const app=express()
const useroute=express.Router()

useroute.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body

    try{
        const finder=await usemodel.findOne({email})
        console.log(finder)
        if(finder)
        {
            return res.send({"mas":"user already exist"})

        }else{
            bcrypt.hash(password, 5, async(err, hash) =>{

                const user=new usemodel({name,email,gender,password:hash,age ,city,is_married})
                await user.save()
                res.status(200).send({"mag":"user has been add"})
                // Store hash in your password DB.
            });

        }
        

    }catch(error){
        res.status(400).send({"err":"something is wrong"})

    }
   
   


   
    
    console.log("you are register successfully")
})
//app.use(authoregister)
useroute.post("/login",async(req,res)=>{

    try{
        const {email,password}=req.body
        const logindata=await usemodel.findOne({email})
        if(logindata)
        {
            bcrypt.compare(password, logindata.password, function(err, result) {

                if(result)
                {
                    const token = jwt.sign({author_id:logindata._id}, 'dheeraj')
                    res.status(200).send({"mas":"user login is succefull",token})
                }else{
                    res.send({"mas":"check password pls"})

                }
                // result == true

            });

        }else{
            res.send({"mas":"check password pls"})


        }

    }catch(err){
        res.status(400).send({"err":"something is wrong"})

    }

    
})

module.exports={useroute}

