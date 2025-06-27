import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    email:{
     type:String,
     required:true,
     unique:true
    },
    fullname:{
     type:String,
     require:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    profilepic:{
        type:String,
        default:""
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)

export default User