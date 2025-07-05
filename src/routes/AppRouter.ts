import Router, { Request, Response } from 'express';

const appRouter = Router();

export const getRootHandler = (_req: Request, res: Response) => {
  res.send('Bus Tracker Application');
};

appRouter.get('/', getRootHandler);

export default appRouter;
