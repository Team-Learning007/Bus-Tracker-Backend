import dbConnect from '#database/dbConnect.js';
import globalErrorHandlerMiddleware from '#middlewares/globalErrorHandler.middleware.js';
import appRouter from '#routes/appRouter.routes.js';
import logger from '#utils/logger/winston-logger.js';
import express, { json } from 'express';

const app = express();
const PORT: string = process.env.PORT ?? '3000';

app.use(json());
app.use('/', appRouter);
app.use(globalErrorHandlerMiddleware);

const startService = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      logger.info(`App listen on port ${PORT}`);
    });
  } catch (error) {
    logger.error(
      '❌ Failed to connect to MongoDB. Server not started.' + String(error),
    );
  }
};

await startService();

export default app;
