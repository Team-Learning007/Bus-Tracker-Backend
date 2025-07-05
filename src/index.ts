import dbConnect from '#database/dbConnect.js';
import appRouter from '#routes/AppRouter.js';
import logger from '#utils/logger/winston-logger.js';
import express from 'express';

const app = express();
const PORT: string = process.env.PORT ?? '3000';

const startService = async () => {
  try {
    await dbConnect();

    app.use(appRouter);

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
