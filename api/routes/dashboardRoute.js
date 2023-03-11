import express from 'express';
import dashboardController from '../controllers/dashboardController';

const dashboardRouter = express.Router( { mergeParams: true } );

dashboardRouter.get('/', dashboardController.index);

export default dashboardRouter;