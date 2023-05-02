const express=require("express")

const {postmodel}=require("../model/postmodel")

const postrouter=express.Router()

postrouter.post("/add",async(req,res)=>{

    try{
        console.log(req.body)
        
        let postdata=new postmodel(req.body)
        await postdata.save()
        res.send("add post is successfully")

    }catch(err)
    {
        res.send("some is wrong")

    }


})
postrouter.get("/",async(req,res)=>{

    try{
        
        const data=await postmodel.find({author:req.body.author})
        res.status(200).send(data)

    }catch(err){
        res.status(400).send(err)

    }


})
postrouter.patch("/update/:id",async(req,res)=>{
    console.log("updata is working")
    const id=req.params.id
    try{
        const postdata=await postmodel.findOne({_id:id})
        console.log(postdata)
        if(postdata.author!==req.body.author)
        {
            res.send({"mas":"you are not authries person"})
        }else{
          const updatadata=await postmodel.findByIdAndUpdate({_id:id},req.body,{new:true})
          
          if(updatadata)
          {
            res.send({"mas":"data is updated"})

          }else{
            res.send({"err":"something is wrong"})

          }

        }
        
    }catch(err){
        res.send(err)
        console.log({"err":err})

    }


})
postrouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id

    try{
        console.log("it is come inside try block")
        const datadelete=await postmodel.findOne({_id:id})
        console.log(datadelete)
        console.log(id)
        if(datadelete.author!==req.body.author)
        {
            console.log("you are not authories person")
            res.send({"mas":"you are not authories person"})
        }else{
            console.log("you are authories person")
            const data=await postmodel.findByIdAndDelete({_id:id})
            if(data){
                res.send({"mag":"data has been deleted"})

            }else{
                res.send({"mas":"somethig is wrong"})

            }
        }

    }catch(err){
        console.log("something is wrong")
        res.send(err)

    }


})
postrouter.get("/top",async(req,res)=>{

    try{
        let data=await postmodel.find({author:req.body.author})
        data.sort((a,b)=>b.nuber_of_comment-a.nuber_of_comment)
        res.send(data)

    }catch(err)
    {
        res.send(err)

    }


})


module.exports={postrouter}