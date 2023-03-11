import express from 'express';
import userController from '../controllers/userController';


const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.get('/', userController.list);
userRouter.put('/:userId', userController.edit);
userRouter.delete('/userId', userController.delete);

export default userRouter;