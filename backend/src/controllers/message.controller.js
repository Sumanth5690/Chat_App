import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import cloudinary from '../lib/cloudinary.js'
import { getReciverSocketId ,io} from '../lib/socket.js'

export const getUserForSideBar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id
        const filteredUser=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUser)
    } catch (error) {
        console.log(error)
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myid = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: myid, reciverId: userToChatId },
                { senderId: userToChatId, reciverId: myid }
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: reciverId } = req.params
        const senderId = req.user._id

        let imageUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        const reciverSocketId = getReciverSocketId(reciverId)
        if (reciverSocketId) {
            io.to(reciverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error)
    }
}