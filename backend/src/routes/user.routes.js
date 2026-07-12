import express from 'express'
import { authUser } from '../middleware/authUser'
const app = express()
import { getCurrentUser } from '../controllers/user.controller'
const userRouter = express.Router()
userRouter.use(authUser)
userRouter.get('/api/users', getCurrentUser)




export default userRouter