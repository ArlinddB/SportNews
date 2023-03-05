import express from 'express';
import postController from '../controllers/postController';

const postRouter = express.Router({ mergeParams: true });

postRouter.get('/', postController.list);
postRouter.get('/mostClicked', postController.mostClicked);
postRouter.get('/:postId/similarPosts', postController.similarPosts);
postRouter.get('/:postId', postController.find);
postRouter.get('/postByCategory/:category', postController.getByCategory);
postRouter.post('/', postController.create);
postRouter.put('/:postId', postController.edit);
postRouter.put('/:postId/incrementClicks', postController.incrementClicks);
postRouter.delete('/:postId', postController.delete)

export default postRouter;