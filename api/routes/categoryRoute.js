import express from 'express';
import categoryController from '../controllers/CategoryController';

const categoryRouter = express.Router({ mergeParams: true });

categoryRouter.get('/', categoryController.list);
categoryRouter.get('/:categoryId', categoryController.find)
categoryRouter.post('/', categoryController.create);
categoryRouter.put('/:categoryId', categoryController.edit);
categoryRouter.delete('/:categoryId', categoryController.delete)

export default categoryRouter;