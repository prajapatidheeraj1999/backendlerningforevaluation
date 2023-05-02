const {usemodel}=require("../model/user.model")
const jwt =require("jsonwebtoken")
const authorization=(req,res,next)=>{
    console.log("authorization is working now")
    const token=req.headers?.authorization
    console.log(token)
    if(token)
    {
        const decoded = jwt.verify(token, 'dheeraj')
        if(decoded)
        {
            req.body.author=decoded.author_id
            next()
        }
    }else{
        res.send({"err":"please login frist"})
    }
    
}

const authoregister=async(req,res,next)=>{
    console.log("authoregister is working now",req.body.email)
    const email=req.body.email
    const userdata=await usemodel.findOne({email})
    console.log(userdata)
    if(userdata)
    {
        res.send("user already exist pleas login")
    }else{
        console.log("auth is working and i am checking that next is working or not")
        next()

    }
   

}
module.exports={authorization,authoregister}