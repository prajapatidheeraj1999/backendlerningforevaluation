
const express=require("express")
const {connection}=require("./db")
const {useroute}=require("./router/useroute")
const {authorization,authoregister}=require("./middelware/usermiddelware")
const {postrouter}=require("./router/postroute")
const cors=require("cors")
const app=express()
app.use(express.json())
//app.use(authoregister)
app.use(cors())
app.use("/users",useroute)
app.use(authorization)
app.use("/post",postrouter)

app.listen(8080,async()=>{

    try{
        await connection
        console.log("connectin is stablesh port nuber 8080")

    }catch(err)
    {
        console.log("something is wrong")
    }

   
})