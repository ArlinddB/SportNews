import express from 'express';
import userController from '../controllers/userController';


const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/', userController.allUsers);
userRouter.get('/usersByClaim/:claim', userController.usersByClaim);
userRouter.get('/:id', userController.userById);
userRouter.post('/admin/:id', userController.addAdmin);
userRouter.put('/:id', userController.editUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;