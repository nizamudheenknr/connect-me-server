
import bcrypt from 'bcryptjs'
import { Admin } from "../model/admin.js"


export const login = async(req,res)=>{
  const {email,password}=req.body

  if(!email || !password){
    return res.status(400).json({message:"All field are required"})
  }
  
const admin = await Admin.findOne({email})
if(admin){
  const ispasswordcorrect = await bcrypt.compare(password,admin.password)
  if(!ispasswordcorrect){
    return res.status(401).json({message:"invalid credentials"})
  }

  return res.status(201).json({message:"login succussfully",admin})
}
}

