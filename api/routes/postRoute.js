import express from 'express';
import postController from '../controllers/postController';

const postRouter = express.Router({ mergeParams: true });

postRouter.get('/', postController.list);
postRouter.get('/:postId', postController.find)
postRouter.post('/', postController.create);
postRouter.put('/:postId', postController.edit);
postRouter.delete('/:postId', postController.delete)

export default postRouter;