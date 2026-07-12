import express from 'express';
import { authUser } from '../middleware/authUser.js';
import { getCurrentUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.use(authUser);
userRouter.get('/', getCurrentUser);

export default userRouter;