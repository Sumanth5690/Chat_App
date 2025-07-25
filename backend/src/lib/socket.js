import {Server} from "socket.io"
import http from "http"
import express from "express"

const app=express()
const server=http.createServer(app)

const io=new Server(
    server,{
        cors:{
            origin:["http://localhost:5173"],
        }
    }
)

export function getReciverSocketId(userId){
return userSocketMap[userId]
}
//online users
const userSocketMap={}

io.on("connection",(socket)=>{
   console.log("A user has connected ",socket.id)

   const userId=socket.handshake.query.userId
  if(userId)userSocketMap[userId]=socket.id

  io.emit("getOnlineUsers",Object.keys(userSocketMap))
   socket.on("disconnect",()=>{
    console.log("A user disconnected",socket.id)
    delete userSocketMap[userId]
   })
})

export {io,app,server}