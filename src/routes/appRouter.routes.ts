import availableBusRouter from '#routes/availableBusRouter/availableBus.routes.js';
import Router, { Request, Response } from 'express';

//import { userRouter } from './userRouter.js';

const appRouter = Router();

const getRootHandler = (_req: Request, res: Response) => {
  res.send('Welcome To Bus Tracker Application');
};

appRouter.get('/', getRootHandler);
appRouter.use('/available-bus', availableBusRouter);

//appRouter.use('/users', userRouter);

export default appRouter;
