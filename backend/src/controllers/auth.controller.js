import { generateToken } from '../lib/utils.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const signup=async(req,res)=>{
    const {name,password,email}=req.body
try {
    //hashpassword
   if(!name || !email || !password){
    return res.status(400).json({message:"provide full credentials"})
   }

    if(password.length<0){
        return res.status(400).json({message:"pasword must be greater than 6 character"})
    }
    const user=await User.findOne({email})
    if(user) return res.status(400).json({message:"Email already exists"})
    
   const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);


    const newUser=new User({
        name,
        email,
        password:hashedPassword
    })

   if(newUser){
   generateToken(newUser._id,res)
   await newUser.save()
   res.status(201).json(newUser)
   }else{
   res.status(400).json({message:"Invalid user data"})
   }
} catch (error) {
    console.log(error   )
}
}

export const login=async(req,res)=>{
    const {email,password}=req.body
try {
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const isPasswordCorrect=await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
         return res.status(400).json({message:"Invalid credentials"})
    }
    generateToken(user._id,res)
    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        profilepic:user.profilepic
    })
} catch (error) {
    console.log(error)
}
}

export const logout=(req,res)=>{
try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"user logged out succesfully"})
} catch (error) {
    console.log(error)
}
}