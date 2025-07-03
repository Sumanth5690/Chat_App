import express from 'express'
const router=express.Router()
import { protectRoute } from '../middleware/auth.middleware.js'
import {getUserForSideBar,getMeassages,sendMeassage} from '../controllers/message.controller.js'


router.get('/users',protectRoute,getUserForSideBar)

router.get("/:id",protectRoute,getMeassages)

router.post("/send/:id",protectRoute,sendMeassage)




export default router