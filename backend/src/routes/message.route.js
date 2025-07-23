import express from 'express'
const router=express.Router()
import { protectRoute } from '../middleware/auth.middleware.js'
import {getUserForSideBar,getMessages, sendMessage} from '../controllers/message.controller.js'


router.get('/users',protectRoute,getUserForSideBar)


router.post("/send/:id",protectRoute,sendMessage)

router.get("/:id",protectRoute,getMessages)




export default router