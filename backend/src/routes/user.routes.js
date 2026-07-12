import express from 'express'
import { authUser } from '../middleware/authUser.js'
const app = express()
import { getCurrentUser } from '../controllers/user.controller.js'
const userRouter = express.Router()
userRouter.use(authUser)
userRouter.get('/api/users', getCurrentUser)




export default userRouter