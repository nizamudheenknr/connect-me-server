import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import adminRoute from './routes/admin_route.js'

const Server  = express()
dotenv.config()


Server.use(express.json())

Server.use("/api/admin",adminRoute)
// Server.use('/api',login)

const PORT = process.env.PORT

Server.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`);
})




mongoose
.connect(process.env.DB,{dbName:"social-media"})
.then(()=>console.log("Mongodb Connected"))
.catch((err)=>console.log(err))
