import express from "express"
import chat from "../controllers/chats.js"
import authenticate from "../middlewares/authenticate.js"

const route = express.Router()
route.use(authenticate)

route.get('/chat', chat)

export default route
