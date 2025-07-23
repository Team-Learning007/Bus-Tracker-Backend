import availableBusRouter from '#routes/availableBusRouter/availableBus.routes.js';
import Router, { Request, Response } from 'express';

const appRouter = Router();

const getRootHandler = (_req: Request, res: Response) => {
  res.send('Welcome To Bus Tracker Application');
};

appRouter.get('/', getRootHandler);
appRouter.use('/available-bus', availableBusRouter);

export default appRouter;
