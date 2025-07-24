import express from 'express'
import authroute from './routes/auth.route.js'
import dotenv from  'dotenv'
import { connectdb } from './lib/db.js'
import cookieParser from 'cookie-parser'
import messageroute from './routes/message.route.js'
import cors from 'cors'
import {app,server} from './lib/socket.js'
import path from 'path'



dotenv.config()


const port=process.env.PORT || 5000

const __dirname=path.resolve()

app.use(express.json({ limit: '10mb' })); // or more if needed

app.use(cookieParser(   ))
app.use(cors(
   {
     origin:"http://localhost:5173",
     credentials:true
   }
))


app.use('/api/auth',authroute)
app.use('/api/messages',messageroute)

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

 app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}


server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    connectdb()

})