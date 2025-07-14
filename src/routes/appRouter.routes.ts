import Router, { Request, Response } from 'express';

const appRouter = Router();

const getRootHandler = (_req: Request, res: Response) => {
  res.send('Welcome To Bus Tracker Application');
};

appRouter.get('/', getRootHandler);

export default appRouter;
