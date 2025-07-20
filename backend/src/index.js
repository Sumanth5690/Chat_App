import express from 'express'
import authroute from './routes/auth.route.js'
import dotenv from  'dotenv'
import { connectdb } from './lib/db.js'
import cookieParser from 'cookie-parser'
import messageroute from './routes/message.route.js'
import cors from 'cors'
import {app,server} from './lib/socket.js'



dotenv.config()


const port=process.env.PORT || 5000

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


server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    connectdb()

})