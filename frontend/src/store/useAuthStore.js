import { create } from "zustand";
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,   
    isCheckingAuth:true,
    onlineUsers:[],

    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check")
            set({authUser:res.data})
        } catch (error) {
           console.error("Auth Check Error:", error.response?.data || error.message);
    set({ authUser: null });
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data,navigate)=>{
set({isSigningUp:true})
        try {
            const res=axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success("account created succesfully")
            navigate('/');
    
} catch (error) {
    toast.error(error.response.data.message)
    console.log(error)
}finally{
    set({isLoggingIn:false})
}
    },
    login:async(data)=>{
        set({isLoggingIn:true})

     try {
        const res=await axiosInstance.post("/auth/login",data)
        set({authUser:res.data})
        toast.success("logged in sucesfully")
     } catch (error) {
        toast.error(error.response.data.message)
        
     }finally{
        set({isLoggingIn:false})
     }
    },

    logout:async()=>{
    try {
        await axiosInstance.post("/auth/logout")
        set({authUser:null})
        toast.success("logged out succesfully")

    } catch (error) {
        toast.error(error.response.data.message)
    }
    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("profile photo updated successfully")

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message     )
        }finally{
            set({isUpdatingProfile:false})
        }
    }

}))