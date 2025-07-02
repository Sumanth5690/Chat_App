import express from 'express'
const router=express.Router()
import { protectRoute } from '../middleware/auth.middleware.js'
import {getUserForSideBar,getMeassages} from '../controllers/message.controller.js'


router.get('/users',protectRoute,getUserForSideBar)

router.get("/:id",protectRoute,getMeassages)




export default router