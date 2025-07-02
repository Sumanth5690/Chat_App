import express from 'express'
import authroute from './routes/auth.route.js'
import dotenv from  'dotenv'
import { connectdb } from './lib/db.js'
import cookieParser from 'cookie-parser'
import messageroute from './routes/message.route.js'


const app=express()
dotenv.config()


const port=process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser(   ))
app.use('/api/auth',authroute)
app.use('/api/message',messageroute)


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    connectdb()

})